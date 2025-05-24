const loginUser = () => {
    const username = document.getElementById("userName").value.toUpperCase().trim();
    const password = document.getElementById("passWord").value;

    window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(password))
        .then((hashedPassword) => {
            let hashArray = Array.from(new Uint8Array(hashedPassword));
            let hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');

            // Check if the user exists and the password matches
            let users = JSON.parse(localStorage.getItem('users')) || [];
            for (let i = 0; i < users.length; i++) {
                if (users[i].Username === username && users[i].Password === hashHex) {

                    sessionStorage.setItem('currentUser', username);
                    let userActive = JSON.parse(localStorage.getItem("user_Active")) || {}
                    ;
                    userActive[username] = Date.now();
                    document.getElementById("loggingIn").style.display = "none";
                    document.getElementById("loggedIn").style.display = "flex";
                    renderUserList()
                    return;
                }
                else{
                    document.getElementById("heading").innerText = "Wrong credentials";
                    document.getElementById("passWord").value = "";
                }
            }
        })
        .catch((error) => {
            console.error("Error hashing password: ", error);
        });

}

const logOutPopup = () => {
    const popup = document.getElementById("logOutPopup").style.display = "flex";
}

const logOut = () => {
    localStorage.removeItem('user_Active');
    window.location.href = "./login.html";
}

const closeLogOutPopup = () => {
    document.getElementById("logOutPopup").style.display = "none";
}