// Show sidebar
function showSidebar() {
    let sidebar = document.getElementById("sidebar");
    sidebar.style.display = (sidebar.style.display === "none" || sidebar.style.display === "") ? "block" : "none";
}

// change username

function addUser() {
    document.getElementById("addUser").style.display = "flex";
}

function addNewUser() {
    const username = document.getElementById("newUsername").value.toUpperCase().trim();
    const password = document.getElementById("newPassword").value;

    if (!username || !password) {
        alert("Please fill in all fields.");
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some(user => user.Username === username)) {
        alert("Username already exists. Please choose a different one.");
        return;
    }

    window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(password))
        .then(hashed => {
            const hashArray = Array.from(new Uint8Array(hashed));
            const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
            users.push({ Username: username, Password: hashHex, user_Active: Date.now() });
            localStorage.setItem("users", JSON.stringify(users));
            alert("User added successfully.");
            renderUserList();
            closeAddUser();
        })
        .catch(err => console.error("Error hashing password", err));
}

function closeAddUser() {
    document.getElementById("addUser").style.display = "none";
}

function renderUserList() {
    const userListEl = document.querySelector('.user-list');
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const current = localStorage.getItem("currentUser");
    const groups = JSON.parse(localStorage.getItem("groups")) || [];

    userListEl.innerHTML = '';

    users.forEach(user => {
        if (user.Username !== current) {
            const div = document.createElement('div');
            div.className = 'user';
            div.innerHTML = `
                <div>
                    <a href="#" class="chat-open">${user.Username}</a>
                    <small class="status">${getActiveUser().includes(user.Username) ? "online" : "offline"}</small>
                </div>
            `;
            div.querySelector('.chat-open').addEventListener('click', (event) => {
                event.preventDefault();
                openChatPopup(user.Username);
            });
            userListEl.appendChild(div);
        }
    });

    groups.forEach(group => {
        const div = document.createElement('div');
        div.className = 'user group';
        div.innerHTML = `
            <div>
                <a href="#" class="chat-open-group">${group.name} (Group)</a>
            </div>
        `;
        div.querySelector('.chat-open-group').addEventListener('click', (e) => {
            e.preventDefault();
            openGroupChat(group.name);
        });
        userListEl.appendChild(div);
    });
}


// Initial page load
window.onload = function () {
    renderUserList();
    const currentUser = localStorage.getItem('currentUser');
    markAsActive(currentUser);
    setInterval(() => {
        markAsActive(currentUser);
        renderUserList();
    }, 600000);
    // chaning to 10 for testing
    document.getElementById("username").innerHTML = currentUser;
}

function markAsActive(username) {
    const activeUser = JSON.parse(localStorage.getItem('user_Active')) || {};
    activeUser[username] = Date.now();
    localStorage.setItem('user_Active', JSON.stringify(activeUser));
}

function getActiveUser() {
    const activeUsers = JSON.parse(localStorage.getItem('user_Active')) || {};
    const now = Date.now();
    // Note changing to 10 for testing
    const fiveMinutes = 10 * 60 * 1000;
    return Object.keys(activeUsers).filter(user => now - activeUsers[user] < fiveMinutes);
}

function getChatKey(user1, user2) {
    return 'chat_' + [user1, user2].sort().join('_');
}

function sendMessage(toUser, messageText) {
    const fromUser = localStorage.getItem('currentUser');
    const chatKey = getChatKey(fromUser, toUser);
    const chatMessages = JSON.parse(localStorage.getItem(chatKey)) || [];
    chatMessages.push({ sender: fromUser, message: messageText, timestamp: Date.now() });
    localStorage.setItem(chatKey, JSON.stringify(chatMessages));
    refreshChat(toUser);
}

function loadChatHistory(withUser) {
    const fromUser = localStorage.getItem('currentUser');
    const chatKey = getChatKey(fromUser, withUser);
    return JSON.parse(localStorage.getItem(chatKey)) || [];
}

function openChatPopup(username) {
    const chatPopup = document.getElementById("chatPopup");
    const chatHistory = document.getElementById("chatHistory");
    const chatInput = document.getElementById("chatInput");
    const sendBtn = document.getElementById("send-btn");

    chatPopup.style.display = "flex";
    chatPopup.setAttribute("data-chat-with", username);
    chatPopup.removeAttribute("data-group");

    chatPopup.querySelector(".chat-header > div").textContent = username;
    document.getElementById("status").textContent = getActiveUser().includes(Username) ? "online" : "offline";

    function populateChat() {
        chatHistory.innerHTML = "";
        const history = loadChatHistory(username);
        history.forEach(msg => {
            const msgEl = document.createElement("div");
            msgEl.className = msg.sender === localStorage.getItem('currentUser') ? "chat-message-sent" : "chat-message-received";
            msgEl.textContent = `${msg.sender}: ${msg.message}  ${new Date(msg.timestamp).toLocaleTimeString()}`;
            chatHistory.appendChild(msgEl);
        });
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    populateChat();

    sendBtn.onclick = null;
    sendBtn.onclick = () => {
        const text = chatInput.value.trim();
        if (text) {
            sendMessage(username, text);
            chatInput.value = "";
            populateChat();
        }
    };
}

function openGroupPopup() {
    const groupPopup = document.getElementById("groupPopup");
    const groupUsers = document.getElementById("groupUsers");
    groupPopup.style.display = "block";
    groupUsers.innerHTML = "";

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = localStorage.getItem("currentUser");

    users.forEach(user => {
        if (user.Username !== currentUser) {
            const label = document.createElement("label");
            label.className = "checkbox-label";
            label.innerHTML = `
                <input type="checkbox" value="${user.Username}" class="group-user-checkbox">
                ${user.Username}
            `;
            groupUsers.appendChild(label);
        }
    });
}

function createGroupChat() {
  const groupName = document.getElementById("groupName").value.trim();
  const selectedUsers = Array.from(document.querySelectorAll('input[name="groupUsers"]:checked')).map(cb => cb.value);

  if (!groupName || selectedUsers.length === 0) {
    alert("Please provide a group name and select at least one user.");
    return;
  }

  const group = {
    name: groupName,
    members: selectedUsers,
    messages: []
  };

  // Save to localStorage
  const groups = JSON.parse(localStorage.getItem("groups") || "[]");
  groups.push(group);
  localStorage.setItem("groups", JSON.stringify(groups));

  alert(`Group "${groupName}" created with users: ${selectedUsers.join(", ")}`);
  closeGroupPopup();
}


function createGroupChat() {
    const groupName = document.getElementById("groupName").value.trim();
    const checkboxes = document.querySelectorAll(".group-user-checkbox:checked");
    const selectedUsers = Array.from(checkboxes).map(cb => cb.value);
    const currentUser = localStorage.getItem("currentUser");

    if (!groupName) {
        alert("Group name is required.");
        return;
    }

    if (selectedUsers.length === 0) {
        alert("Select at least one user to create a group.");
        return;
    }

    const newGroup = {
        name: groupName,
        members: [currentUser, ...selectedUsers]
    };

    let groups = JSON.parse(localStorage.getItem("groups")) || [];

    if (groups.some(g => g.name === groupName)) {
        alert("A group with that name already exists.");
        return;
    }

    groups.push(newGroup);
    localStorage.setItem("groups", JSON.stringify(groups));
    closeGroupPopup();
    renderUserList();
    alert("Group created successfully!");
}


function openGroupChat(groupName) {
    const chatPopup = document.getElementById("chatPopup");
    const chatHistory = document.getElementById("chatHistory");
    const chatInput = document.getElementById("chatInput");
    const sendBtn = document.getElementById("send-btn");

    chatPopup.style.display = "flex";
    chatPopup.setAttribute("data-group", groupName);
    chatPopup.removeAttribute("data-chat-with");

    chatPopup.querySelector(".chat-header > div").textContent = groupName + " (Group)";
    document.getElementById("status").textContent = "group chat";

    function populateChat() {
        chatHistory.innerHTML = "";
        const history = JSON.parse(localStorage.getItem("group_" + groupName)) || [];
        history.forEach(msg => {
            const msgEl = document.createElement("div");
            msgEl.className = msg.sender === localStorage.getItem('currentUser') ? "chat-message-sent" : "chat-message-received";
            msgEl.textContent = `${msg.sender}: ${msg.message}  ${new Date(msg.timestamp).toLocaleTimeString()}`;
            chatHistory.appendChild(msgEl);
        });
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    populateChat();

    sendBtn.onclick = null;
    sendBtn.onclick = () => {
        const text = chatInput.value.trim();
        if (text) {
            const groupMessages = JSON.parse(localStorage.getItem("group_" + groupName)) || [];
            groupMessages.push({ sender: localStorage.getItem("currentUser"), message: text, timestamp: Date.now() });
            localStorage.setItem("group_" + groupName, JSON.stringify(groupMessages));
            chatInput.value = "";
            populateChat();
        }
    };
}

function closeGroupPopup() {
    document.getElementById("groupPopup").style.display = "none";
    document.getElementById("groupName").value = "";
}

// Storage event listener for live updates
window.addEventListener("storage", function (event) {
    if (event.key && (event.key.startsWith("chat_") || event.key.startsWith("group_"))) {
        const chatPopup = document.getElementById("chatPopup");
        if (chatPopup && chatPopup.style.display === "flex") {
            const groupName = chatPopup.getAttribute("data-group");
            const username = chatPopup.getAttribute("data-chat-with");
            if (groupName) openGroupChat(groupName);
            if (username) refreshChat(username);
        }
    }
});

// Refresh one-to-one chat
function refreshChat(username) {
    const chatPopup = document.getElementById("chatPopup");
    if (chatPopup && chatPopup.style.display === "flex" && chatPopup.getAttribute("data-chat-with") === username) {
        const chatHistory = document.getElementById("chatHistory");
        const messages = loadChatHistory(username);
        chatHistory.innerHTML = "";
        messages.forEach(msg => {
            const msgEl = document.createElement("div");
            msgEl.className = msg.sender === localStorage.getItem('currentUser') ? "chat-message-sent" : "chat-message-received";
            msgEl.textContent = `${msg.sender}: ${msg.message}  ${new Date(msg.timestamp).toLocaleTimeString()}`;
            chatHistory.appendChild(msgEl);
        });
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }
}

// Logout
function logOut() {
    localStorage.removeItem('user_Active');
    alert("You have been logged out.");
    window.location.href = "./pages/login.html";
}
