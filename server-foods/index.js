const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.port || 6001;
require("dotenv").config();
var jwt = require("jsonwebtoken");

const stripe = require("stripe")(process.env.STRIPE_SECRECT_KEY);
const mongoose = require("mongoose");

//middle ware
app.use(cors());

app.use(express.json());

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@vdev-foods.dizzeor.mongodb.net/vdev-foods?retryWrites=true&w=majority`
);

mongoose.connection.on("connected", () => {
  console.log("Kết nối MongoDB thành công.");
});

mongoose.connection.on("error", (error) => {
  console.log("error server:" + error);
});

//jwt authentications
app.post("/jwt", async (req, res) => {
  const user = req.body;
  const secretKey = process.env.ACCESS_TOKEN_SECRET; // Lấy secret key từ biến môi trường

  if (!secretKey) {
    return res.status(500).send("Missing secret key");
  }

  try {
    var token = jwt.sign(user, secretKey, { expiresIn: "1hr" });
    res.send({ token });
  } catch (error) {
    console.error("Lỗi tạo mã thông báo token:", error);
    res.status(500).send("Lỗi tạo mã thông báo token");
  }
});

//dung thah toan stripe
app.post("/create-payment-intent", async (req, res) => {
  //lay ra price nhe
  const { cartTotals } = req.body;
  //do cent la 1000 con dolar 100 nen phai *100 ra dolar
  const amount = cartTotals * 100;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

const menuRoutes = require("./api/routes/MenuRoutes");
const cartRoutes = require("./api/routes/cartRoutes");
const userRouter = require("./api/routes/userRouter");
const paymentRoutes = require("./api/routes/paymentRoutes");
const adminStats = require("./api/routes/adminStats")
const orderStats = require("./api/routes/orderStats")
 

app.use("/menu", menuRoutes);
app.use("/cart", cartRoutes);
app.use("/users", userRouter);
app.use("/payments", paymentRoutes);
app.use("/adminstats", adminStats)
app.use("/orderstats", orderStats)

app.get("/", async (req, res) => {
  res.send("hello worlds");
});

app.listen(port, () => {
  console.log(`Đang chạy port: ${port}`);
});
