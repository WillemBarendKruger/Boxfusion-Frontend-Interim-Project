const renderUserList = () => {
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

     for(let i = 0 ; i < users.length; i++){
            let status = document.querySelectorAll(".status");
            if( status[i].innerHTML === "online"){
                status[i].style = "color: greenyellow;";
            }
            else if(status[i].innerHTML === "offline"){
                status[i].style = "color: red;";
            }
        }

    groups.forEach(group => {
    if (group.members && group.members.includes(current)) { 
        const div = document.createElement('div');
        div.className = 'user group';
        div.innerHTML = `
            <div>
                <a href="#" class="chat-open-group">${group.name} (Group)</a>
            </div>
        `;
        div.querySelector('.chat-open-group').addEventListener('click', (event) => {
            event.preventDefault();
            openGroupChat(group.name);
        });
        userListEl.appendChild(div);
    }
});
}

window.addEventListener("storage", (event) => {
    if (event.key === "users" || event.key === "groups" || event.key === "user_Active") renderUserList();
});

window.onload = () => {
    renderUserList();
    const currentUser = sessionStorage.getItem('currentUser');
    markAsActive(currentUser);
    markAsActive(currentUser);

    // Refresh active status to check for inactivity
    document.addEventListener('mousemove', () => markAsActive(currentUser));
    document.addEventListener('keydown', () => markAsActive(currentUser));

    document.getElementById("username").innerHTML = currentUser;
}

const markAsActive = (username) => {
    const activeUser = JSON.parse(localStorage.getItem('user_Active')) || {};
    activeUser[username] = Date.now();
    localStorage.setItem('user_Active', JSON.stringify(activeUser));
}

const getActiveUser = () => {
    const activeUsers = JSON.parse(localStorage.getItem('user_Active')) || {};
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;
    return Object.keys(activeUsers).filter(user => now - activeUsers[user] < fiveMinutes);
}

const getChatKey = (user1, user2) => {
    return 'chat_' + [user1, user2].sort().join('_');
}

const sendMessage = (toUser, messageText) => {
    const fromUser = sessionStorage.getItem('currentUser');
    const chatKey = getChatKey(fromUser, toUser);
    const chatMessages = JSON.parse(localStorage.getItem(chatKey)) || [];
    chatMessages.push({ sender: fromUser, message: messageText, timestamp: Date.now() });
    localStorage.setItem(chatKey, JSON.stringify(chatMessages));
    refreshChat(toUser);
}

const loadChatHistory = (withUser) => {
    const fromUser = sessionStorage.getItem('currentUser');
    const chatKey = getChatKey(fromUser, withUser);
    return JSON.parse(localStorage.getItem(chatKey)) || [];
}

const openChatPopup = (username) => {
    const chatPopup = document.getElementById("chatPopup");
    const chatHistory = document.getElementById("chatHistory");
    const chatInput = document.getElementById("chatInput");
    const sendBtn = document.getElementById("send-btn");
    const users = JSON.parse(localStorage.getItem("users")) || [];

    chatPopup.style.display = "flex";
    chatPopup.setAttribute("data-chat-with", username);
    chatPopup.removeAttribute("data-group");

    chatPopup.querySelector(".chat-header > div").textContent = username;
    document.getElementById("status").textContent = getActiveUser().includes(username) ? "online" : "offline";

    for(let i = 0 ; i < users.length; i++){
            let status = document.querySelectorAll(".status");
            if( status[i].innerHTML === "online"){
                status[i].style = "color: greenyellow;";
            }
            else if(status[i].innerHTML === "offline"){
                status[i].style = "color: red;";
            }
        }

    const populateChat = () => {
        chatHistory.innerHTML = "";
        const history = loadChatHistory(username);
        history.forEach(msg => {
            const msgEl = document.createElement("div");
            msgEl.className = msg.sender === sessionStorage.getItem('currentUser') ? "chat-message-sent" : "chat-message-received";
            msgEl.innerHTML = `
            <div class="messagediv">
                <span class="sender">${msg.sender}:</span>
                    <p class="message">${msg.message}</p>  
                <span class="time">${new Date(msg.timestamp).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                    })}
                </span>
            </div>
            `;
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

    const checkTyping = () => {
        const fromUser = sessionStorage.getItem('currentUser');
        const reverseKey = `typing_status_${username}_${fromUser}`;
        const status = JSON.parse(localStorage.getItem(reverseKey));

        const indicator = document.getElementById("typing");

        if (status && status.typing && Date.now() - status.timestamp < 1500) {
            indicator.innerHTML = `<i class="fa-brands fa-rocketchat"></i> ${username} is typing...`;
            indicator.style.display = "inline";
        } else {
            indicator.style.display = "none";
        }
    }

    window.addEventListener("storage", (event) => {
        if (event.key === `typing_status_${username}_${sessionStorage.getItem('currentUser')}`) checkTyping();
    });
    checkTyping();

    let typingTimeout;
    chatInput.oninput = () => {
        const from = sessionStorage.getItem('currentUser');
        const key = `typing_status_${from}_${username}`;
        localStorage.setItem(key, JSON.stringify({ typing: true, timestamp: Date.now() }));
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
            localStorage.setItem(key, JSON.stringify({ typing: false, timestamp: Date.now() }));
        }, 1200);
        checkTyping();
    };

}

// Storage event listener for live updates
window.addEventListener("storage", (event) => {
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

const refreshChat = (username) => {
    const chatPopup = document.getElementById("chatPopup");
    if (chatPopup && chatPopup.style.display === "flex" && chatPopup.getAttribute("data-chat-with") === username) {
        const chatHistory = document.getElementById("chatHistory");
        const messages = loadChatHistory(username);
        chatHistory.innerHTML = "";
        messages.forEach(msg => {
            const msgEl = document.createElement("div");
            msgEl.className = msg.sender === sessionStorage.getItem('currentUser') ? "chat-message-sent" : "chat-message-received";
            msgEl.innerHTML = `
            <div class="messagediv">
                <span class="sender">${msg.sender}:</span>
                    <p class="message">${msg.message}</p>  
                <span class="time">${new Date(msg.timestamp).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                    })}
                </span>
            </div>
            `;
            chatHistory.appendChild(msgEl);
        });
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }
}

const handleUserListVisibility = () => {
    const userList = document.getElementById("main-chat");;
    userList.style.display = (window.innerWidth <= 500) ? "none" : "flex" ;
}

window.addEventListener('resize', handleUserListVisibility);
window.addEventListener('DOMContentLoaded', handleUserListVisibility);