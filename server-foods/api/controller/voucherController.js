const Voucher = require("../models/Voucher");

const getAllVoucher = async (req, res) => {
  try {
    const vouchers = await Voucher.find({}).sort({ createAt: -1 });
    if (!vouchers || vouchers.length === 0) { // Kiểm tra nếu không có voucher nào
      return res.status(404).json({ message: "Không tìm thấy voucher nào." });
    }
    res.status(200).json(vouchers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postVoucher = async (req, res) => {
  const { code, discount, expirationDate } = req.body;
  try {
    // Kiểm tra xem mã voucher đã tồn tại chưa
    const existingVoucher = await Voucher.findOne({ code });
    if (existingVoucher) {
      return res.status(400).json({ message: "Mã voucher đã tồn tại." });
    }

    // Kiểm tra xem ngày hết hạn có hợp lệ không
    const currentDate = new Date();
    if (expirationDate <= currentDate) {
      return res.status(400).json({ message: "Ngày hết hạn không hợp lệ." });
    }

    // Tạo mới voucher
    const createVoucher = await Voucher.create({ code, discount, expirationDate });
    res.status(201).json(createVoucher); // Trả về status 201 Created
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllVoucher,
  postVoucher,
};
