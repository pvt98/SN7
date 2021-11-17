// import
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const app = express();

const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const commentRoutes = require('./routes/comment');

// securité avec helmet
app.use(helmet());

// cors de l'url
app.use(cors({origin: 'http://localhost:8081'}));

//Header pour requetes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Header', 'Origin, X-Request-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// bodyparser pour JS et JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// multer pour les images
app.use('/images', express.static(path.join(__dirname, 'images')));

// routes
app.use('/api/user', userRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/message', commentRoutes);

module.exports = app;