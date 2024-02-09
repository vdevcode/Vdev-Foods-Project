const express = require("express");
const router = express.Router();
const Payment = require("../models/Payments");
const mongoose = require("mongoose");

const verifyToken = require("../middleware/verifyToken");
const Cart = require("../models/Carts");

const ObjectId = mongoose.Types.ObjectId;

router.post("/", verifyToken, async (req, res) => {
  const payment = req.body;

  try {
    const paymentRequest = await Payment.create(payment);
    //deleted cart after payment
    const cartId = payment.cartItem.map((id) => new ObjectId(id));
    const deletedCartRequest = await Cart.deleteMany({ id: { $in: cartId } });

    res.status(200).json({ paymentRequest, deletedCartRequest });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/", verifyToken, async (req, res) => {
  const email = req.query.email;
  const query = { email: email };
  try {
    const decodedEmail = req.decoded.email;
    if (email != decodedEmail) {
      return res.status(404).json({ message: "Email không đúng với tài khoản" });
    }

    const result = await Payment.find(query).sort({ createAt: -1 }).exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//get all payment from admin
router.get("/all", async (req, res) => {
  try {
    const payments = await Payment.find({}).sort({ createAt: -1 }).exec();
    res.status(200).json(payments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//patch payment
router.patch("/:id", async (req, res) => {
  const payId = req.params.id;
  const { status } = req.body;
  try {
    const updatedStatus = await Payment.findByIdAndUpdate(
      payId,
      { status: "Đã được duyệt" },
      { new: true, runValidators: true }
    );

    if(!updatedStatus){
      return res.status(404).json({message: "Không thấy đơn hàng để duyệt"})
    }

    res.status(200).json(updatedStatus)
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
