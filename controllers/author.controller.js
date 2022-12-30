const authorModel = require('../models/authors');
const {AddBookValidationMW,UpdateBookValidationMW} = require("../validators/book.validator");
function getAllAuthor(req, res){
        authorModel.find()
        .then(author => {
            res.send(author)
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        });
}

function getAuthorByID(req, res){
        const id = req.params.id
        authorModel.findById(id)
            .then(author => {
                res.status(200).send(author)
            }).catch(err => {
                console.log(err)
                res.status(404).send(err)
            });
}


function addAuthor(req, res){
    const author = req.body;
    author.lastUpdateAt = new Date(); // set the lastUpdateAt to the current date
    authorModel.create(author)
        .then(author => {
            res.status(201).send(author);
        }).catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
}

function updateAuthor(){
        const id = req.params.id
        const author = req.body
        author.lastUpdateAt = new Date() // set the lastUpdateAt to the current date
        authorModel.findByIdAndUpdate(id, author, { new: true })
            .then(newAuthor => {
                res.status(200).send(newAuthor)
            }).catch(err => {
                console.log(err)
                res.status(500).send(err)
            });
}


function deleteAuthorByID(req, res){
    const id = req.params.id
    authorModel.findByIdAndRemove(id)
        .then(author => {
            res.status(200).send(author)
        }).catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
}


module.exports = {
    getAllAuthor,
    getAuthorByID,
    addAuthor,
    updateAuthor,
    deleteAuthorByID
}