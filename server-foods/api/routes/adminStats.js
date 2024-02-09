const express = require("express");
const router = express.Router();

//call middleware
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");

const User = require("../models/User");
const Menu = require("../models/Menu");
const Payment = require("../models/Payments");

router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.countDocuments();
    const menus = await Menu.countDocuments();
    const orders = await Payment.countDocuments();

    const result = await Payment.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$cartTotals",
          },
        },
      },
    ]);

    const revenue = result.length > 0 ? result[0].totalRevenue : 0;
    res.status(200).json({ users, menus, orders, revenue });
  } catch (error) {
    res.status(500).send("error server:" + error.message);
  }
});

module.exports = router;
