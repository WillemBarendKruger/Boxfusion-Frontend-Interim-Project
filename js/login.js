// login a user
function loginUser(){
    const username = document.getElementById("userName").value;
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
                    alert("Login successful!");
                    // set the current logged in user
                    localStorage.setItem('currentUser', username);
                    // update the last activetime of user
                    let userActive = JSON.parse(localStorage.getItem("user_Active")) || {};
                    userActive[username] = Date.now();
                    
                    window.location.href = "../index.html";
                    return;
                }
            }
            alert("Invalid username or password.");
        })
        .catch(function (error) {
            console.error("Error hashing password: ", error);
        });

}
