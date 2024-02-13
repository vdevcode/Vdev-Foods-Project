const express = require("express");
const router = express.Router();

const voucherController = require("../controller/voucherController");
const verifyAdmin = require("../middleware/verifyAdmin");
const verifyToken = require("../middleware/verifyToken");

router.get("/", voucherController.getAllVoucher);
router.post("/", verifyToken, verifyAdmin,  voucherController.postVoucher);

module.exports = router;
