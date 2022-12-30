const mongoose = require('mongoose');
const CONFIG = require("../config/config");
const logger = require("../loging/logger");

// const MONGODB_URI = process.env.MONGODB_URI;

function connectToDb(){
  
    mongoose.connect(CONFIG.MONGODB_URL);

    mongoose.connection.on('connected', () => {
        logger.info('Connected to MongoDB successfully');
    });

    mongoose.connection.on('error', (err) => {
        logger.error(err);
    });
}

module.exports = connectToDb;