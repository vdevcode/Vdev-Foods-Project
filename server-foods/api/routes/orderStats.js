const express = require("express");
const router = express.Router();
const Payment = require("../models/Payments");


router.get("/", async (req, res) => {
  try {
    const result = await Payment.aggregate([
      {
        $unwind: "$menuItems",
      },
      {
        $lookup: {
          from: "menus",
          localField: "menuItems",
          foreignField: "_id",
          as: "menuItemDetails",
        },
      },
      {
        $unwind: "$menuItemDetails",
      },
      {
        $group: {
          _id: "$menuItemDetails.category",
          quantity: { $sum: "$quantity" },
          revenue: { $sum: "$price" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          quantity: "$quantity",
          revenue: "$revenue",
        },
      },
    ]);

    // Debug log: Kiểm tra kết quả từ truy vấn $lookup
    console.log("Debug: Result after $lookup", result);

    if (result.length === 0) {
      throw new Error("Không tìm thấy dữ liệu trong orderstats");
    }

    res.json(result);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});



//test debug menuItems
router.get("/debug", async (req, res) => {
  try {
    const payments = await Payment.find(); // Lấy tất cả các bản ghi từ bảng Payments
    payments.forEach((payment) => {
      res.send(payment.menuItems); // In ra giá trị của trường menuItems trong từng bản ghi
    });

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

router.get("/debug1", async (req, res) => {
  try {
    const result = await Payment.aggregate([
      {
        $unwind: "$menuItems",
      },
      {
        $lookup: {
          from: "menus",
          localField: "menuItems", // Kiểm tra trường localField ở đây
          foreignField: "_id", // Kiểm tra trường foreignField ở đây
          as: "menuItemDetails",
        },

        // $group: {
        //   _id: "$menuItemDetails.category",
        //   quantity: { $sum: "$quantity" },
        //   revenue: { $sum: "$price" },
        // },
        // $project: {
        //   _id: 0,
        //   category: "$_id",
        //   quantity: "$quantity",
        //   revenue: "$revenue",
        // },
      },
    ]);

    console.log("Debug: Result from aggregation", result); // Debug log

    if (result.length === 0) {
      throw new Error("No data found in orderstats");
    }

    res.json(result);
  } catch (error) {
    console.error("Error:", error.message); // Error log
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
