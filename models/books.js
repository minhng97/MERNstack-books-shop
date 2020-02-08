const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;
const BookSchema = new Schema({
    title: String,
    pageCount: Number,
    publishedDate: Date,
    thumbnailUrl: String,
    shortDescription: String,
    longDescription: String,
    author: Array,
    category: Array
})

// Model
const Books = mongoose.model('Books', BookSchema)

module.exports = Books;