// change username
function openNewUsername(){
    document.getElementById("updateUsername").style.display = "flex";
}


function updatedUsername(){
    const username = document.getElementById("inputUsername").value.toUpperCase().trim();
    let currentUser = sessionStorage.getItem('currentUser');
    let users = JSON.parse(localStorage.getItem('users')) || [];

    for (let i = 0; i < users.length; i++) {
        if (users[i].Username === currentUser) {
            console.log(users[i].Username)
            if (confirm("Confirm username change to " + username)) {
                users.splice(i, 1, {Username: username, Password: users[i].Password, user_Active: Date.now()});
                sessionStorage.setItem('currentUser', username);
                localStorage.setItem("users", JSON.stringify(users));
                localStorage.setItem('user_Active', JSON.stringify({[username]: Date.now()}));
                window.location.reload();
                alert("Username updated successfully.");
            }
            closeUpdateUsername();
            return;
        }
    }
    localStorage.setItem("users", JSON.stringify(users));
    renderUserList();
}

function closeUpdateUsername(){
    document.getElementById("updateUsername").style.display = "none";
}