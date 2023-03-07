const greeting = document.getElementById("userGreeting");
const userList = document.getElementById("userList");
const saveUserBtn = document.getElementById("saveUserBtn");
const newUser = document.getElementById("newUser");
const newUserPassword = document.getElementById("newUserPassword");
const loginUserBtn = document.getElementById("loginUserBtn");
const logoutUserBtn = document.getElementById("logoutUserBtn");

const getTime = () => {

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

let loggedInUser = localStorage.getItem("username");
if(loggedInUser) {
    userGreeting.innerText += ` ${loggedInUser}`;
}

fetch("http://localhost:3000/users/data")
.then(res => res.json())
.then(data => {
    printUsers(data);
})

function printUsers(users) {
    console.log(users);

    userList.innerHTML = "";

    users.map(user => {
        let liName = document.createElement("li")
        liName.id = user.userid;
        liName.innerText = `User name : ${user.userName}`;

        let liId = document.createElement("li")
        liId.innerText = `Generated uuid : ${user.id}`;

        let liPassword = document.createElement("li")
        liPassword.innerText = `Encrypted password : ${user.userPassword}`;
        
        let br = document.createElement("br");

        userList.appendChild(br);
        userList.appendChild(liName);
        userList.appendChild(liId);
        userList.appendChild(liPassword);
    })

}

//Create new user
saveUserBtn.addEventListener("click", () => {
   
    let user = {
        userName: newUser.value, 
        userPassword: newUserPassword.value 
    };

   console.log(user);

   fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    }, 
    body: JSON.stringify(user)
   })
   .then(res => res.json())
   .then(data => {
        printUsers(data);
   });
   newUser.value = "";
   newUserPassword.value = "";
});

//Login new user
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
            greeting.innerText += ` ${data.userName}`;
            localStorage.setItem("username", data.userName);
        } else {
            greeting.innerText = "failed to login, please check your username or password";
        }
    });
    
    loginUsername.value = "";
    loginPassword.value = "";
});

logoutUserBtn.addEventListener("click", () => {
    localStorage.removeItem("username");
    greeting.innerText = "Du har blivit utloggad."
});