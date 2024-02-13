const express = require("express");
const router = express.Router();
const Payment = require("../models/Payments");
// const Voucher = require("../models/Voucher");
const mongoose = require("mongoose");

const verifyToken = require("../middleware/verifyToken");
const Cart = require("../models/Carts");

const ObjectId = mongoose.Types.ObjectId;

// K dung voucher
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

//dung voucher
// router.post("/", verifyToken, async (req, res) => {
//   const { payment, voucherCode } = req.body;

//   try {
//     if (!voucherCode) {
//       // Nếu không có mã voucher, tiếp tục tạo thanh toán mà không áp dụng giảm giá
//       const paymentRequest = await Payment.create(payment);
//       const cartId = payment.cartItem.map((id) => new ObjectId(id));
//       const deletedCartRequest = await Cart.deleteMany({ id: { $in: cartId } });
//       return res.status(200).json({ paymentRequest, deletedCartRequest });
//     }

//     // Kiểm tra mã voucher
//     const voucher = await Voucher.findOne({ code: voucherCode });
//     console.log(voucher)
//     if (!voucher) {
//       return res.status(404).json({ message: "Mã voucher không hợp lệ" });
//     }

//     // Kiểm tra xem ngày hết hạn của voucher có hợp lệ không
//     const currentDate = new Date();
//     if (voucher.expirationDate <= currentDate) {
//       return res.status(400).json({ message: "Mã voucher đã hết hạn" });
//     }

//     // Áp dụng giảm giá từ voucher vào tổng số tiền thanh toán
//     const discountedTotal =
//       payment.cartTotals - (payment.cartTotals * voucher.discount) / 100;
//     payment.cartTotals = discountedTotal;

//     // Tạo thanh toán mới
//     const paymentRequest = await Payment.create(payment);

//     // Xóa giỏ hàng sau khi thanh toán
//     const cartId = payment.cartItem.map((id) => new ObjectId(id));
//     const deletedCartRequest = await Cart.deleteMany({ id: { $in: cartId } });

//     res.status(200).json({ paymentRequest, deletedCartRequest });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


router.get("/", verifyToken, async (req, res) => {
  const email = req.query.email;
  const query = { email: email };
  try {
    const decodedEmail = req.decoded.email;
    if (email != decodedEmail) {
      return res
        .status(404)
        .json({ message: "Email không đúng với tài khoản" });
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

    if (!updatedStatus) {
      return res.status(404).json({ message: "Không thấy đơn hàng để duyệt" });
    }

    res.status(200).json(updatedStatus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//deleted payment
router.delete("/:id", async (req, res) => {
  const payId = req.params.id;
  try {
    deletedPay = await Payment.findByIdAndDelete(payId);
    if (!deletedPay) {
      {
        return res
          .status(401)
          .json({ message: "Không tìm thấy đơn hàng để xoá" });
      }
    }

    res.status(200).json({ message: "Xoá sản phẩm này thành công!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
