const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let BlogSchema = new Schema({
    _user: { type: Schema.Types.ObjectId, ref: "User", required: true },    // User who has created this blog
    title: { type: String, required: true },
    story: { type: String, required: true },
    url: { type: String, required: true }
});

module.exports = mongoose.model("Blog", BlogSchema);