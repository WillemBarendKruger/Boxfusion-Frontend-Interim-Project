
//NOTES
// This JavaScript function, checkUserActivity() , checks the time difference between the current time and the last active time. If the time difference is greater than 30 seconds (indicating inactivity), it sets user_active to false and logs "User is inactive" to the console.

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
// logout user
function logOut() {
    localStorage.removeItem('lastActiveTime');
    localStorage.removeItem('user_active');
    alert("You have been logged out.");
    window.location.href = "./pages/login.html";
}