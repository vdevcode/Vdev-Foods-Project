const express = require("express")
const router = express.Router()

const blogController = require("../controller/blogController")

router.get("/", blogController.getAllBlog)
router.post("/", blogController.postBlogs)
router.get("/:id", blogController.singleBlogs)
router.delete("/:id", blogController.deletedBlogs)

module.exports = router