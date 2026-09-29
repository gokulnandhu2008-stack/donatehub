// ========================================
// SHOW LOGIN FORM
// ========================================

function showLogin() {

    document.getElementById("loginSection")
        .classList.add("active");

    document.getElementById("registerSection")
        .classList.remove("active");

    document.getElementById("loginMessage")
        .textContent = "";

    document.getElementById("registerMessage")
        .textContent = "";
}


// ========================================
// SHOW REGISTER FORM
// ========================================

function showRegister() {

    document.getElementById("registerSection")
        .classList.add("active");

    document.getElementById("loginSection")
        .classList.remove("active");

    document.getElementById("loginMessage")
        .textContent = "";

    document.getElementById("registerMessage")
        .textContent = "";
}


// ========================================
// LOGIN
// ========================================

document.getElementById("loginForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const username =
            document.getElementById("loginUsername")
                .value.trim();

        const password =
            document.getElementById("loginPassword")
                .value;

        const message =
            document.getElementById("loginMessage");

        message.textContent = "";

        try {

            const response = await fetch(
                "/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                }
            );


            const data = await response.json();


            if (response.ok && data.success) {

                localStorage.setItem(
                    "donatehubLoggedIn",
                    "true"
                );

                localStorage.setItem(
                    "donatehubUsername",
                    username
                );

                window.location.href = "/";

            } else {

                message.textContent =
                    data.message ||
                    "Invalid username or password.";

            }

        } catch (error) {

            console.error(
                "Login error:",
                error
            );

            message.textContent =
                "Unable to connect to the server.";

        }

    });


// ========================================
// REGISTER / CREATE ACCOUNT
// ========================================

document.getElementById("registerForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const username =
            document.getElementById("registerUsername")
                .value.trim();

        const password =
            document.getElementById("registerPassword")
                .value;

        const confirmPassword =
            document.getElementById("confirmPassword")
                .value;

        const message =
            document.getElementById("registerMessage");

        message.textContent = "";


        // Check password match

        if (password !== confirmPassword) {

            message.textContent =
                "Passwords do not match.";

            return;

        }


        // Basic validation

        if (username.length < 3) {

            message.textContent =
                "Username must contain at least 3 characters.";

            return;

        }


        if (password.length < 4) {

            message.textContent =
                "Password must contain at least 4 characters.";

            return;

        }


        try {

            const response = await fetch(
                "/api/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                }
            );


            const data = await response.json();


            if (response.ok) {

                message.textContent =
                    "Account created successfully!";

                document.getElementById(
                    "registerUsername"
                ).value = "";

                document.getElementById(
                    "registerPassword"
                ).value = "";

                document.getElementById(
                    "confirmPassword"
                ).value = "";


                setTimeout(function() {

                    showLogin();

                    document.getElementById(
                        "loginUsername"
                    ).value = username;

                }, 1000);

            } else {

                message.textContent =
                    data.message ||
                    "Unable to create account.";

            }

        } catch (error) {

            console.error(
                "Registration error:",
                error
            );

            message.textContent =
                "Unable to connect to the server.";

        }

    });