const dotenv = require('dotenv').config();

const express = require('express');
const app = express();

const routes = require('./routes');

const connectDB = require('./config/db');

const path = require('path')

const port = process.env.PORT || 8000;

connectDB()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/', routes);

if(process.env.NODE_ENV === 'production') { 
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../','frontend', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => res.send('Please set to production'))
}

app.listen(port, "0.0.0.0", () => { 
    console.log(`Server listening on port ${port}`)
});


