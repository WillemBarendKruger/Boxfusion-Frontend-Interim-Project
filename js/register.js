const registerUser = () => {
    const username = document.getElementById("userName").value.toUpperCase().trim();
    const password = document.getElementById("passWord").value;

    // Check if the username already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    for (let i = 0; i < users.length; i++) {
        if (users[i].Username === username) {
            const wrong = document.getElementById("heading");
            wrong.innerHTML = "Username already taken";
            document.getElementById("userName").value = "";
            document.getElementById("passWord").value = "";
            return;
        }
    }

    const login = document.getElementById("login").style.display = "none";;
    const sucess = document.getElementById("successRegister").style.display = "flex";
    document.getElementById("userName").value = "";
    document.getElementById("passWord").value = "";

    // Hash the password using Web Crypto API
    window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(password))
        .then((hashedPassword) => {
            let hashArray = Array.from(new Uint8Array(hashedPassword));
            let hashHex = hashArray.map(passw => ('00' + passw.toString(16)).slice(-2)).join('');

            // Store the user data in local storage
            let userData = { Username: username, Password: hashHex, user_Active: Date.now() };
            users.push(userData);
            localStorage.setItem('users', JSON.stringify(users));
        })
        .catch((error) => {
            console.error("Error hashing password: ", error);
        });
}