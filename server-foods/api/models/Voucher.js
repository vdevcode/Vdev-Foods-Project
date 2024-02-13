const mongoose = require("mongoose");
const { Schema } = mongoose;

const voucherSchema = new Schema({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Voucher = mongoose.model("Voucher", voucherSchema);

module.exports = Voucher;
