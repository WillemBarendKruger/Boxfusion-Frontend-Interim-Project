// Show sidebar
function showSidebar() {
    let sidebar = document.getElementById("sidebar");
    sidebar.style.display = (sidebar.style.display === "none" || sidebar.style.display === "") ? "block" : "none";
}

// Show the add user form
function addUser() {
    document.getElementById("addUser").style.display = "flex";
}

// Add new user to localStorage
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

    // Hash password
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

// Hide the add user div
function closeAddUser() {
    document.getElementById("addUser").style.display = "none";
}

// Render the user list
function renderUserList() {
    const userListEl = document.querySelector('.user-list');
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const current = localStorage.getItem("currentUser");

    userListEl.innerHTML = '';
    users.forEach(u => {
        if (u.Username !== current) {
            const div = document.createElement('div');
            div.className = 'user';
            div.innerHTML = `
                <div>
                    <a href="#" class="chat-open" title="chat ${u.username}"><div>${u.Username}</div></a>
                    <small class="status">${getActiveUser().includes(u.Username) ? "online" : "offline"}</small>
                </div>
                <a href="#" class="" title="">
                  <i class="fa-solid fa-ellipsis-vertical"></i>
                </a>
            `;

            // Add click handler on the anchor tag only (not whole div)
            div.querySelector('a.chat-open').addEventListener('click', (e) => {
                e.preventDefault();  // prevent default anchor behavior
                openChatPopup(u.Username);
            });

            userListEl.appendChild(div);
        }
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
    }, 300000); // every 5 minutes
    document.getElementById("username").innerHTML = currentUser;
}

// Mark user as active
function markAsActive(username) {
    const activeUser = JSON.parse(localStorage.getItem('user_Active')) || {};
    activeUser[username] = Date.now();
    localStorage.setItem('user_Active', JSON.stringify(activeUser));
}

// Get list of users active in the last 5 minutes
function getActiveUser() {
    const activeUsers = JSON.parse(localStorage.getItem('user_Active')) || {};
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;
    return Object.keys(activeUsers).filter(user => now - activeUsers[user] < fiveMinutes);
}

// Generate chat key
function getChatKey(user1, user2) {
    return 'chat_' + [user1, user2].sort().join('_');
}

// Save message
function sendMessage(toUser, messageText) {
    const fromUser = localStorage.getItem('currentUser');
    const chatKey = getChatKey(fromUser, toUser);
    const chatMessages = JSON.parse(localStorage.getItem(chatKey)) || [];
    chatMessages.push({ sender: fromUser, message: messageText, timestamp: Date.now() });
    localStorage.setItem(chatKey, JSON.stringify(chatMessages));
    refreshChat(toUser);
}


// Load chat history
function loadChatHistory(withUser) {
    const fromUser = localStorage.getItem('currentUser');
    const chatKey = getChatKey(fromUser, withUser);
    return JSON.parse(localStorage.getItem(chatKey)) || [];
}

// Open chat popup with a specific user
function openChatPopup(username) {
    const chatPopup = document.getElementById("chatPopup");
    const chatHistory = document.getElementById("chatHistory");
    const chatInput = document.getElementById("chatInput");
    const sendBtn = document.getElementById("send-btn");

    chatPopup.style.display = "flex";
    chatPopup.setAttribute("data-chat-with", username);

    // Update chat header username
    chatPopup.querySelector(".chat-header > div").textContent = username;
    document.getElementById("status").textContent = getActiveUser().includes(username) ? "online" : "offline";

    // Load chat messages
    function populateChat() {
        chatHistory.innerHTML = "";
        const history = loadChatHistory(username);
        history.forEach(msg => {
            const msgEl = document.createElement("div");
            msgEl.className = msg.sender === localStorage.getItem('currentUser') ? "chat-message-sent" : "chat-message-received";
            msgEl.textContent = `${msg.sender} : ${msg.message}  ${new Date(msg.timestamp).toLocaleTimeString()}`;
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


// storage event for live chat
window.addEventListener("storage", function (event) {
    if (event.key && event.key.startsWith("chat_")) {
        const chatPopup = document.getElementById("chatPopup");
        if (chatPopup && chatPopup.style.display === "flex") {
            const username = chatPopup.getAttribute("data-chat-with");
            refreshChat(username);
        }
    }
});

// Refresh chat
function refreshChat(username) {
    const chatPopup = document.getElementById("chatPopup");
    if (chatPopup && chatPopup.style.display === "flex" && chatPopup.getAttribute("data-chat-with") === username) {
        const chatHistory = document.getElementById("chatHistory");
        const messages = loadChatHistory(username);
        chatHistory.innerHTML = "";
        messages.forEach(msg => {
            const msgEl = document.createElement("div");
            msgEl.className = msg.sender === localStorage.getItem('currentUser') ? "chat-message-sent" : "chat-message-received";
            msgEl.textContent = `${msg.sender} : ${msg.message}  ${new Date(msg.timestamp).toLocaleTimeString()}`;
            chatHistory.appendChild(msgEl);
        });
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }
}

// Logout function
function logOut() {
    localStorage.removeItem('user_Active');
    alert("You have been logged out.");
    window.location.href = "./pages/login.html";
}