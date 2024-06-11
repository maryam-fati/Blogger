const { Router } = require("express");
const { getBlog, getBlogById, saveBlog, deleteBlog, updateBlog } = require("../controllers/blogControllers");

const router = Router();

router.get("/getBlogs", getBlog);
router.get("/getBlog/:id", getBlogById);
router.post("/save", saveBlog);
router.put("/update/:id", updateBlog);
router.delete("/delete/:id", deleteBlog);

module.exports = router;
