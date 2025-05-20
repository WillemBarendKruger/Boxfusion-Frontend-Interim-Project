// // Show sidebar
// function showSidebar() {
//     let sidebar = document.getElementById("sidebar");
//     sidebar.style.display = (sidebar.style.display === "none" || sidebar.style.display === "") ? "block" : "none";
// }

// function addUser() {
//     document.getElementById("addUser").style.display = "flex";
// }

// function addNewUser() {
//     const username = document.getElementById("newUsername").value.trim();
//     const password = document.getElementById("newPassword").value;

//     if (!username || !password) {
//         alert("Please fill in all fields.");
//         return;
//     }

//     let users = JSON.parse(localStorage.getItem('users')) || [];

//     if (users.some(user => user.Username === username)) {
//         alert("Username already exists. Please choose a different one.");
//         return;
//     }

//     // Hash password
//     window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(password))
//         .then(hashed => {
//             const hashArray = Array.from(new Uint8Array(hashed));
//             const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
//             users.push({ Username: username, Password: hashHex, user_Active: Date.now() });
//             localStorage.setItem("users", JSON.stringify(users));
//             alert("User added successfully.");
//             renderUserList();
//             closeAddUser();
//         })
//         .catch(err => console.error("Error hashing password", err));
// }

// function closeAddUser() {
//     document.getElementById("addUser").style.display = "none";
// }

// function renderUserList() {
//     const userListEl = document.querySelector('.user-list');
//     const users = JSON.parse(localStorage.getItem("users")) || [];
//     const current = localStorage.getItem("currentUser");

//     userListEl.innerHTML = '';
//     users.forEach(user => {
//         if (user.Username !== current) {
//             const div = document.createElement('div');
//             div.className = 'user';
//             div.innerHTML = `
//                 <div>
//                     <a href="#" class="chat-open" title="chat ${user.username}"><div>${user.Username}</div></a>
//                     <small class="status">${getActiveUser().includes(user.Username) ? "online" : "offline"}</small>
//                 </div>
//                 <a href="#" class="" title="">
//                   <i class="fa-solid fa-ellipsis-vertical"></i>
//                 </a>
//             `;

//             div.querySelector('a.chat-open').addEventListener('click', (event) => {
//                 event.preventDefault(); 
//                 openChatPopup(user.Username);
//             });

//             userListEl.appendChild(div);
//         }
//     });
// }

// // Create a group chat



// // Initial page load
// window.onload = function () {
//     renderUserList();
//     const currentUser = localStorage.getItem('currentUser');
//     markAsActive(currentUser);
//     setInterval(() => {
//         markAsActive(currentUser);
//         renderUserList();
//     }, 300000); // every 5 minutes
//     document.getElementById("username").innerHTML = currentUser;
// }

// // Mark user as active
// function markAsActive(username) {
//     const activeUser = JSON.parse(localStorage.getItem('user_Active')) || {};
//     activeUser[username] = Date.now();
//     localStorage.setItem('user_Active', JSON.stringify(activeUser));
// }

// // Get list of users active in the last 5 minutes
// function getActiveUser() {
//     const activeUsers = JSON.parse(localStorage.getItem('user_Active')) || {};
//     const now = Date.now();
//     const fiveMinutes = 5 * 60 * 1000;
//     return Object.keys(activeUsers).filter(user => now - activeUsers[user] < fiveMinutes);
// }

// // Generate chat key
// function getChatKey(user1, user2) {
//     return 'chat_' + [user1, user2].sort().join('_');
// }

// // Save message
// function sendMessage(toUser, messageText) {
//     const fromUser = localStorage.getItem('currentUser');
//     const chatKey = getChatKey(fromUser, toUser);
//     const chatMessages = JSON.parse(localStorage.getItem(chatKey)) || [];
//     chatMessages.push({ sender: fromUser, message: messageText, timestamp: Date.now() });
//     localStorage.setItem(chatKey, JSON.stringify(chatMessages));
//     refreshChat(toUser);
// }


// // Load chat history
// function loadChatHistory(withUser) {
//     const fromUser = localStorage.getItem('currentUser');
//     const chatKey = getChatKey(fromUser, withUser);
//     return JSON.parse(localStorage.getItem(chatKey)) || [];
// }

// // Open chat popup with a specific user
// function openChatPopup(username) {
//     const chatPopup = document.getElementById("chatPopup");
//     const chatHistory = document.getElementById("chatHistory");
//     const chatInput = document.getElementById("chatInput");
//     const sendBtn = document.getElementById("send-btn");

//     chatPopup.style.display = "flex";
//     chatPopup.setAttribute("data-chat-with", username);

//     // Update chat header username
//     chatPopup.querySelector(".chat-header > div").textContent = username;
//     document.getElementById("status").textContent = getActiveUser().includes(username) ? "online" : "offline";

//     // Load chat messages
//     function populateChat() {
//         chatHistory.innerHTML = "";
//         const history = loadChatHistory(username);
//         history.forEach(msg => {
//             const msgEl = document.createElement("div");
//             msgEl.className = msg.sender === localStorage.getItem('currentUser') ? "chat-message-sent" : "chat-message-received";
//             msgEl.textContent = `${msg.sender} : ${msg.message}  ${new Date(msg.timestamp).toLocaleTimeString()}`;
//             chatHistory.appendChild(msgEl);
//         });
//         chatHistory.scrollTop = chatHistory.scrollHeight;
//     }

//     populateChat();

//     sendBtn.onclick = null;

//     sendBtn.onclick = () => {
//         const text = chatInput.value.trim();
//         if (text) {
//             sendMessage(username, text);
//             chatInput.value = "";
//             populateChat();
//         }
//     };
// }


// // storage event for live chat
// window.addEventListener("storage", function (event) {
//     if (event.key && event.key.startsWith("chat_")) {
//         const chatPopup = document.getElementById("chatPopup");
//         if (chatPopup && chatPopup.style.display === "flex") {
//             const username = chatPopup.getAttribute("data-chat-with");
//             refreshChat(username);
//         }
//     }
// });

// // Refresh chat
// function refreshChat(username) {
//     const chatPopup = document.getElementById("chatPopup");
//     if (chatPopup && chatPopup.style.display === "flex" && chatPopup.getAttribute("data-chat-with") === username) {
//         const chatHistory = document.getElementById("chatHistory");
//         const messages = loadChatHistory(username);
//         chatHistory.innerHTML = "";
//         messages.forEach(msg => {
//             const msgEl = document.createElement("div");
//             msgEl.className = msg.sender === localStorage.getItem('currentUser') ? "chat-message-sent" : "chat-message-received";
//             msgEl.textContent = `${msg.sender} : ${msg.message}  ${new Date(msg.timestamp).toLocaleTimeString()}`;
//             chatHistory.appendChild(msgEl);
//         });
//         chatHistory.scrollTop = chatHistory.scrollHeight;
//     }
// }

// // Logout function
// function logOut() {
//     localStorage.removeItem('user_Active');
//     alert("You have been logged out.");
//     window.location.href = "./pages/login.html";
// }

// Show sidebar
function showSidebar() {
    let sidebar = document.getElementById("sidebar");
    sidebar.style.display = (sidebar.style.display === "none" || sidebar.style.display === "") ? "block" : "none";
}

function addUser() {
    document.getElementById("addUser").style.display = "flex";
}

function addNewUser() {
    const username = document.getElementById("newUsername").value.trim();
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

    userListEl.innerHTML = '';

    // Render individual users
    users.forEach(user => {
        if (user.Username !== current) {
            const div = document.createElement('div');
            div.className = 'user';
            div.innerHTML = `
                <div>
                    <a href="#" class="chat-open" title="chat ${user.Username}"><div>${user.Username}</div></a>
                    <small class="status">${getActiveUser().includes(user.Username) ? "online" : "offline"}</small>
                </div>
                <a href="#" class="" title="">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </a>
            `;

            div.querySelector('a.chat-open').addEventListener('click', (event) => {
                event.preventDefault();
                openChatPopup(user.Username);
            });

            userListEl.appendChild(div);
        }
    });

    // Render group chats
    const groups = JSON.parse(localStorage.getItem("groups")) || [];
    groups.forEach(group => {
        const div = document.createElement('div');
        div.className = 'user group';
        div.innerHTML = `
            <div>
                <a href="#" class="chat-open-group" title="Group Chat: ${group.name}">
                    <div>${group.name} (Group)</div>
                </a>
            </div>
        `;
        div.querySelector('.chat-open-group').addEventListener('click', (event) => {
            event.preventDefault();
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
    }, 300000);
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
    const fiveMinutes = 5 * 60 * 1000;
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
    document.getElementById("status").textContent = getActiveUser().includes(username) ? "online" : "offline";

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

// GROUP CHAT FUNCTIONS
function openGroupPopup() {
  const modal = document.getElementById("groupPopup");
  const groupUsersContainer = document.getElementById("groupUsers");

  // Clear any previously rendered checkboxes
  groupUsersContainer.innerHTML = "";

  // Get all users from localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Get the current logged-in user (to exclude from list if needed)
  const currentUser = localStorage.getItem("currentUser");

  // Create checkboxes for each user
  users.forEach(user => {
    if (user.username !== currentUser) { // Optional: exclude current user
      const label = document.createElement("label");
      label.style.display = "block";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = user.username;
      checkbox.name = "groupUsers";

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(" " + user.username));
      groupUsersContainer.appendChild(label);
    }
  });

  modal.style.display = "block";
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
    if (!groupName) {
        alert("Group name cannot be empty.");
        return;
    }

    let groups = JSON.parse(localStorage.getItem("groups")) || [];
    if (groups.some(group => group.name === groupName)) {
        alert("Group name already exists.");
        return;
    }

    const currentUser = localStorage.getItem("currentUser");
    groups.push({ name: groupName, members: [currentUser] });
    localStorage.setItem("groups", JSON.stringify(groups));
    alert("Group created successfully.");
    renderUserList();
    closeGroupPopup();
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
