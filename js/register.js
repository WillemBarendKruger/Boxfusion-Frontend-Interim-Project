// register a user
function registerUser() {
    const username = document.getElementById("userName").value;
    const password = document.getElementById("passWord").value;

    // Check if the username already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    for (let i = 0; i < users.length; i++) {
        if (users[i].Username === username) {
            alert("Username already exists. Please choose a different one.");
            window.location.href = "./register.html";
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
            localStorage.setItem('users', JSON.stringify(users));
            alert("User registered successfully!");
            window.location.href = "./login.html";
        })
        .catch(function (error) {
            console.error("Error hashing password: ", error);
        });
}