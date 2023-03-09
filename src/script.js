import {generateLoginForm, generateLogoutForm, getTime} from "./script/userForm";
const userList = document.getElementById("userList");
const saveUserBtn = document.getElementById("saveUserBtn");
const newUser = document.getElementById("newUser");
const newUserPassword = document.getElementById("newUserPassword");
let loggedInUser = localStorage.getItem("username");

let publishedBaseUrl = "https://crypto-js-login-qq2wj.ondigitalocean.app/"
// let localBaseUrl = "http://localhost:3000/"

getTime();

const init = () => {
    if(loggedInUser) {
        userGreeting.innerText += ` ${loggedInUser}`;
        generateLogoutForm();
    } else {
        generateLoginForm();
    }
}
init();

fetch(`${publishedBaseUrl}users`)
.then(res => res.json())
.then(data => {
    printUsers(data);
})

function printUsers(users) {
    console.log(users);

    userList.innerHTML = "";

    users.map(user => {
        let liName = document.createElement("li")
        //lines that are commented out should be removed for security reasons but are here for demonstration.
        // liName.id = user.id; 
        liName.innerText = `User name : ${user.userName}`;
        // let liId = document.createElement("li")
        // liId.innerText = `Generated uuid : ${user.id}`;
        // let liPassword = document.createElement("li")
        // liPassword.innerText = `Encrypted password : ${user.userPassword}`;
        
        let br = document.createElement("br");

        userList.appendChild(br);
        userList.appendChild(liName);
        // userList.appendChild(liId);
        // userList.appendChild(liPassword);
    })

}

//Create new user
saveUserBtn.addEventListener("click", () => {
   
    let user = {
        userName: newUser.value, 
        userPassword: newUserPassword.value 
    };

   console.log(user);

   fetch(`${publishedBaseUrl}users`, {
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
