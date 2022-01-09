// Register the models
require("./server/models/Blog");
require("./server/models/User");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Import models
const Blog = mongoose.model("Blog");
const User = mongoose.model("User");

const app = express();

// Middleware parses the request body data
app.use(bodyParser.json());

// Static render the HTML
app.use("/", express.static(__dirname + "/dist/blog"));
app.use("/new", express.static(__dirname + "/dist/blog"));

// Get all blogs of a user
app.get("/user/blogs/:userId", (req, res) => {
    User.findById(req.params.userId, { blogs: 1 }).populate({ path: 'blogs' }).exec((error, userObj) => {
        if (error)
            res.status(500).json({ message: "Error while fetching user data", error });
        else
            res.status(200).json(userObj);
    });
});

// Create a blog
app.post("/blog", async (req, res) => {
    try {
        const newBlog = await Blog.create(req.body);
        await User.findByIdAndUpdate(req.body._user, { $addToSet: { blogs: newBlog._id } });

        res.status(200).json(newBlog);
    }
    catch (e) {
        res.status(500).json({ message: "Error while creating a blog", e });
    }
});

// Get a blog
app.get("/blog/:blogId", (req, res) => {
    Blog.findById(req.params.blogId).exec((error, blogObj) => {
        if (error)
            res.status(500).json({ message: "Error while fetching blog data", error });
        else
            res.status(200).json(blogObj);
    });
});

// Update a blog
app.patch("/blog", (req, res) => {
    Blog.findByIdAndUpdate(req.body._id, { $set: req.body }, { new: true }).exec((error, blogObj) => {
        if (error)
            res.status(500).json({ message: "Error while updating blog data", error });
        else
            res.status(200).json(blogObj);
    });
});

// Delete a blog
app.delete("/blog/:blogId", (req, res) => {
    Blog.findByIdAndDelete(req.params.blogId)
        .then(blogObj => res.status(200).json(blogObj))
        .catch(error => res.status(500).json({ message: "Error while deleting blog", error }));
});

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/practice", (error) => {
    if (!error)
        console.log("Connected to DB!");
});

// Start the server
app.listen(4500, () => console.log("Running!"));