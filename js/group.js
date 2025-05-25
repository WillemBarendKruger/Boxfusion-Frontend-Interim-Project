const openGroupPopup = () => {
    const groupUsers = document.getElementById("groupUsers");
    document.getElementById("groupPopup").style.display = "block";
    document.getElementById("groupAlert").innerText = ""
    groupUsers.innerHTML = "";

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = sessionStorage.getItem("currentUser");

    users.forEach(user => {
        if (user.Username !== currentUser) {
            const div = document.createElement("div");
            div.className = "userSelect"
            div.innerHTML = `
                <label class="checkbox-label">${user.Username}</label>
                <input type="checkbox" value="${user.Username}" class="group-user-checkbox">
            `;
            groupUsers.appendChild(div);
        }
    });
}

const createGroupChat = () => {
    const groupName = document.getElementById("groupName").value.trim();
    const checkboxes = document.querySelectorAll(".group-user-checkbox:checked");
    const selectedUsers = Array.from(checkboxes).map(ceckb => ceckb.value);
    const currentUser = sessionStorage.getItem("currentUser");
    const groupAlert = document.getElementById("groupAlert");

    if (!groupName) {
        groupAlert.innerText = "Please enter a group name";
        groupAlert.style = "color: red;";
        return;
    }

    if (selectedUsers.length === 0) {
        groupAlert.innerText = "Select at least one user to create a group";
        groupAlert.style = "color: yellow;";
        return;
    }

    const newGroup = {
        name: groupName,
        members: [currentUser, ...selectedUsers]
    };

    let groups = JSON.parse(localStorage.getItem("groups")) || [];

    if (groups.some(group => group.name === groupName)) {
        groupAlert.innerText = "Group name already in use";
        groupAlert.style = "color: red;"
        return;
    }

    groups.push(newGroup);
    localStorage.setItem("groups", JSON.stringify(groups));
    closeGroupPopup();
    renderUserList();
}

const openGroupChat = (groupName) => {
    const chatPopup = document.getElementById("chatPopup");
    const chatHistory = document.getElementById("chatHistory");
    const chatInput = document.getElementById("chatInput");
    const sendBtn = document.getElementById("send-btn");

    chatPopup.style.display = "flex";
    chatPopup.setAttribute("data-group", groupName);
    chatPopup.removeAttribute("data-chat-with");

    chatPopup.querySelector(".chat-header > div").textContent = groupName + " (Group)";
    const groups = JSON.parse(localStorage.getItem("groups")) || [];
    const group = groups.find(g => g.name === groupName);
    const status = document.getElementById("status");
     status.textContent = (group && group.members) ? `Members: ${group.members.join(", ")}`: "Group members unavailable";

    const populateChat = () => {
        chatHistory.innerHTML = "";
        const history = JSON.parse(localStorage.getItem("group_" + groupName)) || [];
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
        if (text) {
            const groupMessages = JSON.parse(localStorage.getItem("group_" + groupName)) || [];
            groupMessages.push({ sender: sessionStorage.getItem("currentUser"), message: text, timestamp: Date.now() });
            localStorage.setItem("group_" + groupName, JSON.stringify(groupMessages));
            localStorage.removeItem(`typing_status_group_${groupName}_${sessionStorage.getItem("currentUser")}`);
            populateChat();
            document.getElementById("typing").style.display = "none";
            chatInput.value = "";
        }
    };

    // Handle typing status on input
    chatInput.oninput = () => {
        const currentUser = sessionStorage.getItem("currentUser");
        const key = `typing_status_group_${groupName}_${currentUser}`;
        localStorage.setItem(key, JSON.stringify({ typing: true, timestamp: Date.now() }));
    };

    const indicator = document.getElementById("typing");
    const currentUser = sessionStorage.getItem("currentUser");
    let typingTimeout;

    const updateTypingIndicator = () => {
        const groups = JSON.parse(localStorage.getItem("groups")) || [];
        const group = groups.find(g => g.name === groupName);
        if (!group) return;

        let typers = [];
        group.members.forEach(member => {
            if (member !== currentUser) {
                const key = `typing_status_group_${groupName}_${member}`;
                const status = JSON.parse(localStorage.getItem(key));
                if (status && status.typing && Date.now() - status.timestamp < 1500) typers.push(member);
            }
        });

        if (typers.length > 0) {
            indicator.innerHTML = `<i class="fa-brands fa-rocketchat"></i> ${typers.join(', ')}  is typing...`;
            indicator.style.display = "inline";
        } else {
            indicator.style.display = "none";
        }
    }

    window.addEventListener("storage", (e) => {
        if (e.key && e.key.startsWith(`typing_status_group_${groupName}_`)) updateTypingIndicator();
    });

    chatInput.onblur = () => {
        const key = `typing_status_group_${groupName}_${currentUser}`;
        localStorage.setItem(key, JSON.stringify({ typing: false, timestamp: Date.now() }));
    };

    chatInput.oninput = () => {
        const key = `typing_status_group_${groupName}_${currentUser}`;
        localStorage.setItem(key, JSON.stringify({ typing: true, timestamp: Date.now() }));
        if (typingTimeout) clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
            localStorage.setItem(key, JSON.stringify({ typing: false, timestamp: Date.now() }));
        }, 1500);
    };
}

const closeGroupPopup = () => {
    document.getElementById("groupPopup").style.display = "none";
    document.getElementById("groupName").value = "";
}