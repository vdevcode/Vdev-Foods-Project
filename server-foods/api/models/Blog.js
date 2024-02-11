const mongoose = require("mongoose")
const {Schema} = mongoose


//tao schema cho blogs
const blogSchema = new Schema({
    image: String,
    title: String,
    author: String,
    createdAt: { type: Date, default: Date.now },
    content: String,
    likes: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
})


const Blog = mongoose.model("Blog", blogSchema)

module.exports = Blog