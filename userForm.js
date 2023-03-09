let userForm = document.getElementById("userForm");
let loginForm = document.getElementById("loginForm");
const greeting = document.getElementById("userGreeting");

export const getTime = () => {

    const today = new Date();
    const hour = today.getHours();

    if (hour < 11) {
        greeting.innerText = 'Good morning ';
    } else if (hour < 14) {
        greeting.innerText = 'Good day ';
    } else if (hour < 18) {
        greeting.innerText = 'Good afternoon ';
    } else {
        greeting.innerText = 'Good evening ';
    }
}
getTime();

export const generateLogoutForm = () =>{
    localStorage.removeItem("username");
    loginForm.innerHTML= /*html*/`
        <h2>You are now logged in</h2>
        <button id="logoutUserBtn">Logout</button>
    `
    logoutUserBtn.addEventListener("click", () => {
        localStorage.removeItem("username");
        greeting.innerText = "You have been logged out."
        generateLoginForm();
    });
}
export const generateLoginForm = () =>{
        loginForm.innerHTML= /*html*/`
        <h2>Login here:</h2>
        <input type="text" id="loginUsername" placeholder="Användarnamn" />
        <input type="password" id="loginPassword" placeholder="Lösenord" />
        <button id="loginUserBtn">Login</button>
        `;

        loginUserBtn.addEventListener("click", () => {
    
            let loginUser = {
                userName: loginUsername.value,
                userPassword: loginPassword.value
            }
            console.log(loginUser);
            fetch("http://localhost:3000/users/login", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginUser)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.userName) {
                    greeting.innerText = "";
                    getTime();
                    greeting.innerHTML += /*html*/` 
                        <p>Here you can see the registered user and their info; obviously, displaying passwords is an extremely bad practice, and this is only for demonstration.</p>
                        <p>You are logged in as ${data.userName}<p>
                        <p>Your unique id given to you is : ${data.id}</p>
                        <p>Your password is : ${data.decryptedUserPassword}</p>
                        <p>Your encrypted password (that is stored on the server) : ${data.encryptedUserPassword}</p>
                    `;
                    localStorage.setItem("username", data.userName);
                    generateLogoutForm(); 
                } else {
                    greeting.innerText = "failed to login, please check your username or password";
                }
            });
            
            loginUsername.value = "";
            loginPassword.value = "";
        });
}
