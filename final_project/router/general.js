const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        if (!isValid(username)) { 
            users.push({"username":username,"password":password});
            return res.status(200).json({message: "Customer successfully registered. Now you can login"});
        }
        else {
            return res.status(404).json({message: "Customer already exists!"});    
        }
    } 
    return res.status(404).json({message: "Unable to register customer."});
    //return res.status(404).json(users);
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve(x = JSON.stringify({books},null,4))
        },3000)})
    ;
    myPromise.then((x) => {
        res.send(x)
    });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
            const isbn = req.params.isbn;
            let filtered_books = books[isbn];
            resolve(x = filtered_books)
        },3000)})
    ;
    myPromise.then((x) => {
        res.send(x)
    });
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
            const authorname = req.params.author;
            Object.keys(books).forEach((key) => Object.assign(books[key]['isbn'] = key , books[key] ));
            let isbn = Object.keys(books).filter(key => books[key].author === authorname)
            let booksbyauthor = []
            isbn.forEach((bookkey) => booksbyauthor.push({'isbn':books[bookkey]['isbn'], 'title':books[bookkey]['title'], 'reviews':books[bookkey]['reviews']}));
            resolve(x = JSON.stringify({booksbyauthor},null,4))
        },3000)})
    ;
    myPromise.then((x) => {
        res.send(x)
    });
    
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
            const titlename = req.params.title;
            Object.keys(books).forEach((key) => Object.assign(books[key]['isbn'] = key , books[key] ));
            let isbn = Object.keys(books).filter(key => books[key].title === titlename)
            let booksbytitle = []
            isbn.forEach((bookkey) => booksbytitle.push({'isbn':books[bookkey]['isbn'], 'author':books[bookkey]['author'], 'reviews':books[bookkey]['reviews']}));
            resolve(x = JSON.stringify({booksbytitle},null,4))
        },3000)})
    ;

    myPromise.then((x) => {
        res.send(x)
    });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    let filtered_books = books[isbn]['reviews'];
    res.send(filtered_books);
});

module.exports.general = public_users;
