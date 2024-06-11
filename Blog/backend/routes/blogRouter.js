const { Router } = require("express");
const { getBlog, getBlogById, saveBlog, deleteBlog, updateBlog } = require("../controllers/blogControllers");

const router = Router();

router.get("/getBlogs", getBlog); // Change from POST to GET for fetching all blogs
router.get("/getBlog/:id", getBlogById); // New route for fetching a single blog by ID
router.post("/save", saveBlog);
router.put("/update/:id", updateBlog); // New route for updating a blog
router.delete("/delete/:id", deleteBlog);

module.exports = router;
