
// access the user data example
// let users = JSON.parse(localStorage.getItem('Users')) || [];
// for (let i = 0; i < users.length; i++) {
//     let user = users[i];
//     console.log("Username: " + user.Username);
//     console.log("Password: " + user.Password);
// }

// login a user
function loginUser(){
    let username = document.getElementById("userName").value;
    let password = document.getElementById("passWord").value;

    // Hash the password using Web Crypto API
    window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(password))
        .then(function (hashedPassword) {
            let hashArray = Array.from(new Uint8Array(hashedPassword));
            let hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
            console.log("Hashed Password: " + hashHex);

            // Check if the user exists and the password matches
            let users = JSON.parse(localStorage.getItem('Users')) || [];
            for (let i = 0; i < users.length; i++) {
                if (users[i].Username === username && users[i].Password === hashHex) {
                    alert("Login successful!");
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
