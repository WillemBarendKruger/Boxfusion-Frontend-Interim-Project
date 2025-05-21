function registerUser() {
    const username = document.getElementById("userName").value.toUpperCase().trim();
    const password = document.getElementById("passWord").value;

    // Check if the username already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    for (let i = 0; i < users.length; i++) {
        if (users[i].Username === username) {
            alert("Username already exists. Please choose a different one.");
            // override default action of the form
            
            return;
        }
    }

    // Hash the password using Web Crypto API
    window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(password))
        .then(function (hashedPassword) {
            let hashArray = Array.from(new Uint8Array(hashedPassword));
            let hashHex = hashArray.map(passw => ('00' + passw.toString(16)).slice(-2)).join('');

            // Store the user data in local storage
            let userData = { Username: username, Password: hashHex, user_Active: Date.now() };
            users.push(userData);
            localStorage.setItem('users', JSON.stringify(users));
            alert("User registered successfully!");
            window.location.href = "./login.html";
        })
        .catch(function (error) {
            console.error("Error hashing password: ", error);
        });
}