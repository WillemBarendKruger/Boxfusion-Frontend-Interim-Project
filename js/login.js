// login a user
function loginUser(){
    const username = document.getElementById("userName").value.toUpperCase().trim();
    const password = document.getElementById("passWord").value;

    // Hash the password to see if it matches the stored hash
    window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(password))
        .then(function (hashedPassword) {
            let hashArray = Array.from(new Uint8Array(hashedPassword));
            let hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');

            // Check if the user exists and the password matches
            let users = JSON.parse(localStorage.getItem('users')) || [];
            for (let i = 0; i < users.length; i++) {
                if (users[i].Username === username && users[i].Password === hashHex) {
                    // set the current logged in user
                    sessionStorage.setItem('currentUser', username);
                    // update the last activetime of user
                    let userActive = JSON.parse(localStorage.getItem("user_Active")) || {};
                    userActive[username] = Date.now();
                    document.getElementById("loggingIn").style.display = "none";
                    document.getElementById("loggedIn").style.display = "flex";
                    renderUserList()
                    return;
                }
                else{
                    // window.location.href = "./login.html";
                    document.getElementById("heading").innerText = "Wrong credentials";
                    document.getElementById("passWord").value = "";
                }
            }
        })
        .catch(function (error) {
            console.error("Error hashing password: ", error);
        });

}

let showOriginal = () => {
    document.getElementById
}

function logOut() {
    localStorage.removeItem('user_Active');
    window.location.href = "./login.html";
}