# User Login & Registration
This is the front-end part of this project.
The back-end repo can be found here https://github.com/existenztim/Encrypt-password-create-uuid-Back-End.

The project allows users to create and log in to an account. The project is written in JavaScript and uses the Express framework, UUID library, and Crypto-JS for encryption.

Upon registration, users will receive a unique UUID which will be stored on the server. The user's password is encrypted and stored on the server for safety.

When the user attempts to log in, the server will decrypt the user's password and compare it to the input provided. If there is a match, the user will gain access to the account.

![demo](https://github.com/existenztim/Encrypt-password-create-uuid-Front-End/blob/development/demonstration/DEMO.png)
