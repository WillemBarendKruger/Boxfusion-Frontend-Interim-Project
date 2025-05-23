// Show sidebar
function showSidebar() {
    let sidebar = document.getElementById("sidebar");
    sidebar.style.display = (sidebar.style.display === "none" || sidebar.style.display === "") ? "block" : "none";
}

function renderUserList() {
    const userListEl = document.querySelector('.user-list');
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const current = sessionStorage.getItem("currentUser");
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


// event listener for redering users and there status
window.addEventListener("storage", function (event) {
    if (event.key === "users") {
        renderUserList();
    }
});

window.onload = function () {
    renderUserList();
    const currentUser = sessionStorage.getItem('currentUser');
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
    const fromUser = sessionStorage.getItem('currentUser');
    const chatKey = getChatKey(fromUser, toUser);
    const chatMessages = JSON.parse(localStorage.getItem(chatKey)) || [];
    chatMessages.push({ sender: fromUser, message: messageText, timestamp: Date.now() });
    localStorage.setItem(chatKey, JSON.stringify(chatMessages));
    refreshChat(toUser);
}

function loadChatHistory(withUser) {
    const fromUser = sessionStorage.getItem('currentUser');
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
            msgEl.className = msg.sender === sessionStorage.getItem('currentUser') ? "chat-message-sent" : "chat-message-received";
            msgEl.textContent = `${msg.sender}: ${msg.message}  ${new Date(msg.timestamp).toLocaleTimeString()}`;
            chatHistory.appendChild(msgEl);
        });
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    populateChat();

    sendBtn.onclick = null;
    sendBtn.onclick = () => {
        const text = chatInput.value.trim();
        localStorage.removeItem(`typing_status_${sessionStorage.getItem('currentUser')}_${username}`);

        if (text) {
            sendMessage(username, text);
            chatInput.value = "";
            populateChat();
        }
    };

    // event handler for typing status
    chatInput.oninput = () => {
    const fromUser = sessionStorage.getItem('currentUser');
    const typingKey = `typing_status_${fromUser}_${username}`;
    localStorage.setItem(typingKey, JSON.stringify({ typing: true, timestamp: Date.now() }));
    };

    let typingInterval;

    function checkTyping() {
        const fromUser = sessionStorage.getItem('currentUser');
        const reverseKey = `typing_status_${username}_${fromUser}`;
        const status = JSON.parse(localStorage.getItem(reverseKey));

        const indicator = document.getElementById("typing");

        if (status && status.typing && Date.now() - status.timestamp < 1500) {
            indicator.textContent = `${username} is typing...`;
            indicator.style.display = "inline";
        } else {
            indicator.style.display = "none";
        }
    }

     // prevent multiple intervals
    clearInterval(typingInterval);
    typingInterval = setInterval(checkTyping, 1000);

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

// Refresh chat
function refreshChat(username) {
    const chatPopup = document.getElementById("chatPopup");
    if (chatPopup && chatPopup.style.display === "flex" && chatPopup.getAttribute("data-chat-with") === username) {
        const chatHistory = document.getElementById("chatHistory");
        const messages = loadChatHistory(username);
        chatHistory.innerHTML = "";
        messages.forEach(msg => {
            const msgEl = document.createElement("div");
            msgEl.className = msg.sender === sessionStorage.getItem('currentUser') ? "chat-message-sent" : "chat-message-received";
            msgEl.textContent = `${msg.sender}: ${msg.message}  ${new Date(msg.timestamp).toLocaleTimeString()}`;
            chatHistory.appendChild(msgEl);
        });
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }
}


