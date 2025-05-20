// Show sidebar
function showSidebar() {
    let sidebar = document.getElementById("sidebar");
    if (sidebar.style.display === "none" || sidebar.style.display === "") {;
        sidebar.style.display = "block";
    } else {
        sidebar.style.display = "none";
    }
}

// get username from local storage
document.getElementById("username").innerHTML = localStorage.getItem('currentUser');

// check user activity
function markAsActive(username){
    const activeUser = JSON.parse(localStorage.getItem('user_active')) || {};
    activeUser[username] = Date.now();
    localStorage.setItem('user_active', JSON.stringify(activeUser));
}

function getActiveUser() {
    const activeUsers = JSON.parse(localStorage.getItem('user_active')) || {};
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;
     return Object.keys(activeUsers).filter(user => {now - activeUsers[user] < fiveMinutes});
}

//Messaging
function getChatKey(user1, user2)
{
    return 'chat_' + [user1, user2].sort().join('_');
}

function sendMessage(toUser, messageText){
    const fromUser = localStorage.getItem('currentUser');
    const chatKey = getChatKey(fromUser, toUser);
    const chatMessages = JSON.parse(localStorage.getItem(chatKey)) || [];
    chatMessages.push({sender: fromUser, message: messageText, timestamp: Date.now()});

    localStorage.setItem(chatKey, JSON.stringify(chatMessages));
}

function loadChatHistory(withUser){
    const fromUser = localStorage.getItem('currentUser');
    const chatKey = getChatKey(fromUser, withUser);

    return JSON.parse(localStorage.getItem(chatKey)) || [];
}

// live chat
window.addEventListener("storage", function (event) {
    if(event.chatKey.startsWith("chat_")){
        refreshChat();
    }
})

function addUser(){
    document.getElementById("addUser").style.display = "flex";
}

function addNewUser(){
    const username = document.getElementById("newUsername").value.trim();
    const password = document.getElementById("newPassword").value;

    if(!username || !password){
        alert("Please fill in all fields.");
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if(users.some(user => user.Username === username)){
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

function closeAddUser(){
    document.getElementById("addUser").style.display = "none";
}

// refresh user list
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
                    <div>${u.Username}</div>
                    <small class="status">${getActiveUser().includes(u.Username) ? "online" : "offline"}</small>
                </div>
                <span class="gear-icon"><i class="fa-solid fa-ellipsis-vertical"></i></span>
            `;
            div.addEventListener('click', () => {
                loadChat(u.Username);
            });
            userListEl.appendChild(div);
        }
    });
}
window.onload = function() {
    renderUserList();
    const currentUser = localStorage.getItem('currentUser');
    markAsActive(currentUser);
    setInterval(() => {
        markAsActive(currentUser);
        renderUserList();
    }, 300000); // every 5 minutes
}


// logout user
function logOut() {
    localStorage.removeItem('lastActiveTime');
    localStorage.removeItem('user_active');
    alert("You have been logged out.");
    window.location.href = "./pages/login.html";
}