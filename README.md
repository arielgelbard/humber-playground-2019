# About
###### 3 different examples of a chat app in vanilla JavaScript, JQuery, and React's create-react-app cli created react web app.

###### It also includes a folder for any themes you may want to customize from colorlib's free template website.

# Pre requisites
- Node.js, VS Code
- Mac: sudo npm install -g firebase-tools live-server
- Windows: npm install firebase-tools live-server --global

# Start a Regular Website
`live-server`

# Setup React App
`npm install`

# Start the React App
`npm start`

# Firebase

- To login into firebase from the command line, execute `firebase login`.

- To initialize and connect your app, execute `firebase init`. With the arrow keys, change the arrow to hosting, hit the space bar, then hit enter. 
For the following: 
- ? What do you want to use as your public directory?: type `vanilla`.
- ? Configure as a single-page app (rewrite all urls to /index.html)? (y/N): type `y`, hit enter.
- ? File vanilla/index.html already exists. Overwrite? (y/N): `N`, hit enter.

- To change which folder to upload, go into `.firebaserc` and change the `public` value to the folder name (location).

- To deploy your website/app to firebase, all you have to do is execute: `firebase deploy --only hosting`

- To logout, execute `firebase logout`.