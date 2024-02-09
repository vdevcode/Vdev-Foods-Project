const express = require("express");
const Menu = require("../models/Menu");
const router = express.Router();

const menuController = require("../controller/menuController");
// const verifyAdmin = require("../middleware/verifyAdmin")

//get all menu
router.get("/", menuController.getAllMenuItems);
router.post("/", menuController.postItemMenu);
router.delete("/:id", menuController.deletedMenuItem);
router.get("/:id", menuController.singleMenuItem);
router.patch("/:id", menuController.updateMenuItem);

module.exports = router;
