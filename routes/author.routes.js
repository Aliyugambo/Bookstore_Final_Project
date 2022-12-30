const express = require('express');
const authorController = require('../controllers/author.controller');
const {AddAuthorValidationMW,UpdateAuthorValidationMW} = require("../validators/author.validator");
const authorRouter = express.Router();


// GET ALL BOOKS FROM DATABASE
authorRouter.get('/', authorController.getAllAuthor);

// GET BOOKS BY ID
authorRouter.get('/:id', authorController.getAuthorByID);


// CREATE BOOK TO THE DATABASE
authorRouter.post('/',AddAuthorValidationMW, authorController.addAuthor);


// UPDATE BOOKS FROM DATABASE
authorRouter.put('/:id',UpdateAuthorValidationMW,authorController.updateAuthor);

// DELETE BOOKS FROM DATABASE
authorRouter.delete('/:id', authorController.deleteAuthorByID);

module.exports = authorRouter;


