// register user example
// var users = JSON.parse(localStorage.getItem('Users')) || [];
// var userData = [{Username:document.getElementById("UserName").value},
// {Password:document.getElementById("PassWord").value}];

// users.push(userData);
// localStorage.setItem('Users', JSON.stringify(users));

// register a user
function registerUser() {
    let username = document.getElementById("userName").value;
    let password = document.getElementById("passWord").value;

    // Check if the username already exists
    let users = JSON.parse(localStorage.getItem('Users')) || [];
    for (let i = 0; i < users.length; i++) {
        if (users[i].Username === username) {
            alert("Username already exists. Please choose a different one.");
            return;
        }
    }

    // Hash the password using Web Crypto API
    window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(password))
        .then(function (hashedPassword) {
            let hashArray = Array.from(new Uint8Array(hashedPassword));
            let hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
            console.log("Hashed Password: " + hashHex);

            // Store the user data in local storage
            let userData = { Username: username, Password: hashHex };
            users.push(userData);
            localStorage.setItem('Users', JSON.stringify(users));
            alert("User registered successfully!");
            window.location.href = "./login.html";
        })
        .catch(function (error) {
            console.error("Error hashing password: ", error);
        });
}