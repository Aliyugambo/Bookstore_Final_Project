const express = require('express');
const bookController = require('../controllers/book.controller');
const {AddBookValidationMW,UpdateBookValidationMW} = require("../validators/book.validator");
const bookRouter = express.Router();


// GET ALL BOOKS FROM DATABASE
bookRouter.get('/', bookController.getAllBooks);

// GET BOOKS BY ID
bookRouter.get('/:id', bookController.getBookByID);


// CREATE BOOK TO THE DATABASE
bookRouter.post('/',AddBookValidationMW, bookController.addBook);


// UPDATE BOOKS FROM DATABASE
bookRouter.put('/:id',UpdateBookValidationMW,bookController.updateBook);

// DELETE BOOKS FROM DATABASE
bookRouter.delete('/:id', bookController.deleteBookByID);

module.exports = bookRouter;


