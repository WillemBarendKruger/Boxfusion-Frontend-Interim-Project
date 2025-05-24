const registerUser = () => {
    const username = document.getElementById("userName").value.toUpperCase().trim();
    const password = document.getElementById("passWord").value;
    const login = document.getElementById("login");
    const formSwitch = document.getElementById("successRegister")

    const users = JSON.parse(localStorage.getItem('users')) || [];
    for (let i = 0; i < users.length; i++) {
        if (users[i].Username === username) {
            const wrong = document.getElementById("heading");
            wrong.innerHTML = "Username already taken";
            username.value = "";
            password.value = "";
            return;
        }
    }

    if (!username || !password) {
        document.getElementById("successMessage").innerText = "Please fill all the fields";
        document.querySelector("#retry").setAttribute("href", "./register.html");
        login.style.display = "none";
        formSwitch.style.display = "flex";
        return;
    }

    login.style.display = "none";
    formSwitch.style.display = "flex";

    window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(password))
        .then((hashedPassword) => {
            let hashArray = Array.from(new Uint8Array(hashedPassword));
            let hashHex = hashArray.map(passw => ('00' + passw.toString(16)).slice(-2)).join('');

            let userData = { Username: username, Password: hashHex, user_Active: Date.now() };
            users.push(userData);
            localStorage.setItem('users', JSON.stringify(users));
            username.value = "";
            password.value = "";
        })
        .catch((error) => {
            console.error("Error hashing password: ", error);
        });
}