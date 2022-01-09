const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    firstName: { type: String, required: true },
    blogs: [{ type: Schema.Types.ObjectId, ref: "Blog" }]   // All blog ids created by this user
});

module.exports = mongoose.model("User", UserSchema);