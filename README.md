# blogger 
<h1>A simple 1 user blog MEAN stack application</h1>
<h2>Deployment instructions<h2>

<h2>Pre -requisites</h2>
<h3>Mongo DB - Download Link: https://www.mongodb.com/download-center#enterprise</h3>
<h5>A full mongo configuration involves setting up directories and path</h5>
<h6>mkdir c:data/log/</h6>
<h6>mkdir c:data/db</h6>
<h6>add your mongo installation folder to the environment path</h6>
<h3>NodeJS - Download Link:https://nodejs.org/en/download/</h3>

<h2>Deploying App<h2>
<h4>1 - Pull or Clone the git repository</h4>
<h4>2 - Deploy DB:  mongorestore --db blogdb  '[path to your cloned git directory]/DbToImport/'</h4>
 <h4> 2.1 - Verify DB :</h4>
 <h5>                   - lauch mongo : cmd -> 'mongod'</h5>
 <h5>                   - access mongo : cmd -> 'mongo' -> on mongo console : show dbs (check for blogdb)</h5>
 <h5>                   - verify collections : mongo console -> use blogdb -> show collections (check for Posts collection)</h5>
<h4>3 - Install dependencies : on the webapp root (/blogger) run 'npm install'</h4>
<h4>4 - Launch App : run 'node server.js'</h4>
<h4>5 - Access page : on your browser Go to : 'http://127.0.0.1:8080/'</h4>
