const openNewUsername = () => {
    document.getElementById("updateUsername").style.display = "flex";
}

const updatedUsername = () => {
    const username = document.getElementById("inputUsername").value.toUpperCase().trim();
    let currentUser = sessionStorage.getItem('currentUser');
    let users = JSON.parse(localStorage.getItem('users')) || [];

    for (let i = 0; i < users.length; i++) {
        if (users[i].Username === currentUser) {
            console.log(users[i].Username)
                document.getElementById("logginOut").innerText = `Successfully Updated Username to ${username}`;
                users.splice(i, 1, {Username: username, Password: users[i].Password, user_Active: Date.now()});
                sessionStorage.setItem('currentUser', username);
                localStorage.setItem("users", JSON.stringify(users));
                localStorage.setItem('user_Active', JSON.stringify({[username]: Date.now()}));
             setTimeout( () => {
                closeUpdateUsername();
                window.location.reload();
            }, 5000);
            return;
        }  
    }
    localStorage.setItem("users", JSON.stringify(users));
    renderUserList();
}

const closeUpdateUsername = () => {
    document.getElementById("updateUsername").style.display = "none";
}