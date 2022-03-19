<p align="center">
<img src="https://logosmarcas.net/wp-content/uploads/2020/04/Netflix-Logo.png" alt="netflix's logo" width='50%' align="center"/>
</p>
<h1 align="center">Netflix Clone</h1>
<p>&nbsp</p>
<p align="center"> An app that uses <a href='https://www.themoviedb.org/'>TMDB API</a> to display movies and a REST API to handle user registration, login and profiles lists. Click the <strong>website</strong> shield to access it on heroku!</p>
<p>&nbsp</p>
<div align="center">

<a href='https://bernardo-netflix-clone.herokuapp.com/'>

<img src='https://img.shields.io/badge/website-000000?style=for-the-badge&logo=About.me&logoColor=white'/>

</a>
<img src='https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white'/>
<img src='https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white'/>
<img src='https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white'/>
<img src='https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black'/>
<img src='https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E'/>

</div>

<div align='center'>
<img src='https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB'/>
<img src='	https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white'/>
<img src='https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white'/>
<img src='https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white'/>
<img src='https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white'/>
<img src='https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white'/>
<img src='https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white'/>

</div>

<p>&nbsp</p>

<h2></h2>
<h3 align='center'>What does this app do?</h3>
<p>This app uses the <a href='https://www.themoviedb.org/'>TMDB API</a> to get movies and display then and their information to users. The user's accountes are hosted in a NOSQL mongoDB. In this data based is secured the users profiles, with name, email, and a hashed password (using JWT). Each user has his own profiles list, that it cans make full CRUD opperations.
The entire webdesign is fully modular by using react to re-utilise and dynamically update the front end interface. Futhermore, the application interface was made using multiple css styles to be as close as possible from the <a href='http://www.netflix.com.br'>netflix's original page.</a></p>

<h2></h2>
<h3 align='center'>How is the application build?</h3>
<p>Besides the already stated React and MongoDB, this app uses Mongoose and Axios, to create a more human friendly code, as well as React Router and Redux.</p>
<p>The server is constructed using Express, so the whole application is developted in JavaScrip, making the app maintenance easier.</p>
<p>For security measures the database only stores the hashed password, with is provided by JsonWebToken and validated using BCryptJS, and the sensitive content, such as the mongo atlas URI, is stored in a safe .env file, handled by the dotenv npm package.</p>
<h2></h2>
<h3 align='center'>How to run in your PC</h3>

<p align='center'>Before anything you must have a mongo DB atlas cluster. That's where the user data base will be hosted. To get more information in how to use mongoDB atlas, you can access <a href='https://docs.atlas.mongodb.com/tutorial/create-new-cluster/'>this link</a> and to learn how to connect your cluster with the application follow <a href='https://docs.atlas.mongodb.com/compass-connection/'>this tutorial</a>, but don't put the URI in the compass desktop app, select connect to application, and use the provide URI in the .env file to connect it to the netflix clone app</p>

<ol>
<li>Download the .zip file and extract it</li>
<li>Go to the terminal, navigate to the extracted folder and run</li>

```
npm i
```
<li>Next, in the root folder (not the backend or the frontend folder) create a file with the name '.env' and put the following values inside it:</li>

```js
PORT = 8000
JWT_SECRET = #place a key, it'll be used to hash the user's passwords to save in the database
MONGO_URI = #obtained in the mongo DB atlas
NODE_ENV = production
```

<li>Then run the following code in the terminal</li>

```
npm run build
```

<p>PS: Don't change directories, the code above must be used while still in the frontend folder</p>

<li>Go to the root folder by running this code in the terminal

```
cd ../
```
<li>Then start the app by using the following command in the terminal</li>

```
npm start
```

<li>To access the app go to your browser and type in the following url</li>

```
localhost:8000
```
</ol>

<h2></h2>
<h3 align='center'>Disclaimer</h3>
<p align='center'>The netflix name and all images related are owned by <a href='http://www.netflix.com'>Netflix.Inc</a>, all rights reserved</p>
