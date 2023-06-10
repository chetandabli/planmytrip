const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: String,
    email: String,
    destination: String,
    no_of_travellers: Number,
    budget_per_person: Number
})

const PostModel = mongoose.model("post", schema);

module.exports = {
    PostModel
}