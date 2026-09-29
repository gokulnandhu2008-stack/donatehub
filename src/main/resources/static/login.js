document.getElementById("loginForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const username =
            document.getElementById("username").value.trim();

        const password =
            document.getElementById("password").value;

        const message =
            document.getElementById("message");

        try {

            const response = await fetch("/api/auth/login", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username: username,
                    password: password
                })

            });

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
                    data.message || "Login failed";

            }

        } catch (error) {

            console.error("Login error:", error);

            message.textContent =
                "Unable to connect to the server.";

        }

    });