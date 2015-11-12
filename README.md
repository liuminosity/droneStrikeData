# droneStrikeData

##Running this locally:
- Clone this repo
- From the root folder, run ```npm install```, ```gulp```, and in a separate tab, ```node server/server.js``` in your console
- That's it! 

##Features:
- Shows location of all of the drone strikes
- Links to twitter/article for more details of each drone strike
- Basic data about nearby strikes

##Navigating the files:
```
- /client
  - /src
    - /components <- all the sub components here
    - app.jsx <- Parent component here
  - index.html <- what the server serves as a static file. Starting point for client viles
  - main.js <- consolidated file of all client code, is served by index.html. don't open
  - style.css <- styling
- server
  - server.js <- starts the local server
```

##Component structure:
```
- App (app.jsx)
  - LoadingView (/components/LoadingView)
  - HomeView (/components/HomeView)
    - Map (/components/Map)
    - MapModal (/components/MapModal)
```
