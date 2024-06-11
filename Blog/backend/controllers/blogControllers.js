const BlogModel = require("../models/blogModel");

module.exports.getBlog = async (req, res) => {
    try {
        const blogs = await BlogModel.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching blogs", error });
    }
};

module.exports.getBlogById = async (req, res) => {
    try {
        const blog = await BlogModel.findById(req.params.id);
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: "Error fetching blog", error });
    }
};

module.exports.saveBlog = (req, res) => {
    const { Blog, Paragraph, Image } = req.body;
    BlogModel.create({ Blog, Paragraph, Image })
        .then((data) => {
            console.log("saved...");
            res.status(201).send(data);
        })
        .catch((err) => {
            console.log(err);
            res.send({ error: err, msg: "something went wrong" });
        });
};

module.exports.updateBlog = (req, res) => {
    const { Blog, Paragraph, Image } = req.body;
    BlogModel.findByIdAndUpdate(req.params.id, { Blog, Paragraph, Image }, { new: true })
        .then((data) => {
            console.log("updated...");
            res.status(200).send(data);
        })
        .catch((err) => {
            console.log(err);
            res.send({ error: err, msg: "something went wrong" });
        });
};

module.exports.deleteBlog = (req, res) => {
    const { id } = req.params;
    BlogModel.findByIdAndDelete(id)
        .then(() => {
            console.log("deleted");
            res.send("deleted");
        })
        .catch((err) => {
            console.log(err);
            res.send({ error: err, msg: "something went wrong" });
        });
};
