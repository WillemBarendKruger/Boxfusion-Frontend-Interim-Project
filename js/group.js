function openGroupPopup() {
    const groupPopup = document.getElementById("groupPopup");
    const groupUsers = document.getElementById("groupUsers");
    groupPopup.style.display = "block";
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

function createGroupChat() {
    const groupName = document.getElementById("groupName").value.trim();
    const checkboxes = document.querySelectorAll(".group-user-checkbox:checked");
    const selectedUsers = Array.from(checkboxes).map(ceckb => ceckb.value);
    const currentUser = sessionStorage.getItem("currentUser");

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

    if (groups.some(group => group.name === groupName)) {
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

    // Check typing status from other users
    let typingInterval;
    clearInterval(typingInterval);
    typingInterval = setInterval(() => {
        const currentUser = sessionStorage.getItem("currentUser");
        const group = JSON.parse(localStorage.getItem("groups")).find(g => g.name === groupName);
        const indicator = document.getElementById("typing");

        let typers = [];

        group.members.forEach(member => {
            if (member !== currentUser) {
                const key = `typing_status_group_${groupName}_${member}`;
                const status = JSON.parse(localStorage.getItem(key));
                if (status && status.typing && Date.now() - status.timestamp < 1500) {
                    typers.push(member);
                }
            }
        });

        if (typers.length > 0) {
            indicator.textContent = typers.join(', ') + " is typing...";
            indicator.style.display = "inline";
        } else {
            indicator.style.display = "none";
        }
    }, 1000);
}

function closeGroupPopup() {
    document.getElementById("groupPopup").style.display = "none";
    document.getElementById("groupName").value = "";
}