# blogger 

//A simple 1 user blog MEAN stack application

//Deployment instructions

// Pre -requisites
//Mongo DB - Download Link: https://www.mongodb.com/download-center#enterprise
//NodeJS - Download Link:https://nodejs.org/en/download/

// Deploying App
//1 - Pull or Clone the git repository
//2 - Deploy DB:  mongorestore --db blogdb  [path to your mongo data directory]
 // 2.1 - Verify DB : - lauch mongo : cmd -> 'mongod'
 //                   - access mongo : cmd -> 'mongo' -> on mongo console : show dbs (check for blogdb)
 //                   - verify collections : mongo console -> use blogdb -> show collections (check for Posts collection)
//3 - Install dependencies : on the webapp root (/blogger) run 'npm install'
//4 - Launch App : run 'node server.js'
//5 - Access page : on your browser Go to : 'http://127.0.0.1:8080/'
