# chattyApp

## App Summary

This app will allow users to communicate with each other without having to register accounts. A real-time chatroom. It uses React, Webpack and Babel, and Websockets. 

This app was produced during participation in Lighthouse Labs curriculum.

## Explore chattyApp:

!['Chatroom in Action'](https://github.com/jo-wood/chattyApp/blob/master/docs/chatroom_example.png)

## Getting Started

*Usage*

This application relies on running two node instances. Please clone the chattyServer application running the necessary WebSocket connection here:

**Backend Server:**
[chattyServer](https://github.com/jo-wood/chattyApp-server)

(Upon completion of chattyServer local deployment)

Install the dependencies and start the chattyApp client server.

```
npm install
npm start
open http://localhost:3000
```

## Dev Dependencies

Frontend (chattyApp):

* React - Webpack - babel-loader webpack-dev-server

Backend (chattyServer):

* Express - WebSocket - uuid

**please see package.json for further dependencies**

### Features

* if a user does not wish to enter a name, they will display as 'Anonymous'
  * W.I.P - no name change notification upon removing a session username

* a user can change their name at any time by hitting `Enter` within the name input field

* if the user changes their name without hitting `Enter` on the name input, if this name has changed per their session, the name change notification will properly render upon a message submit

* number of users currently in chatroom display on top right of the screen

* each username associated with a message changes in hardwired color options

### Linting

This boilerplate project includes React ESLint configuration.

```
npm run lint
```
