const loginEndpoint = 'http://192.168.29.161:3000/login';
const registerEndpoint = 'http://192.168.29.161:3000/register';

function openLogin() {
    window.location.href = 'login.html';
}

function openRegister() {
    window.location.href = 'register.html';
}

async function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const loginData = {
        username: username,
        password: password,
    };

    try {
        const response = await fetch(loginEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        const data = await response.json();

        if (response.status === 200) {
            // Redirect to a new page (e.g., dashboard.html) for a successful login
            window.location.href = `dashboard.html?username=${username}`;

            // Show a success message with the username
            document.getElementById("login-message").textContent = `Dear ${username}, you have logged in successfully.`;
        } else {
            document.getElementById("login-message").textContent = data.message;
        }
    } catch (error) {
        console.error('Error during login:', error);
        document.getElementById("login-message").textContent = 'Login failed';
    }
}

async function register() {
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;
    const confirmPassword = document.getElementById("register-confirm-password").value;

    if (password !== confirmPassword) {
        document.getElementById("register-message").textContent = "Passwords do not match.";
        return;
    }

    const registerData = {
        username: username,
        password: password,
    };

    try {
        const response = await fetch(registerEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerData),
        });

        const data = await response.json();

        if (response.status === 200) {
            document.getElementById("register-message").textContent = `Registration successful for ${username}.`;
            // Redirect to a login page for successful registration
            window.location.href = 'login.html';
        } else {
            document.getElementById("register-message").textContent = data.message;
        }
    } catch (error) {
        console.error('Error during registration:', error);
        document.getElementById("register-message").textContent = 'Registration failed';
    }
}

