const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentSchema = new Schema({
  idTransaction: String,
  name: String,
  email: String,
  quantity: Number,
  status: String,
  cartItem: Array,
  menuItems: Array,
  itemName: Array,
  cartTotals: Number,
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
