const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyAdmin = async (req, res, next) => {
  // Check if req.decoded is defined
  if (!req.decoded) {
    return res
      .status(401)
      .send({
        message:
          "Trái phép - Mã thông báo không được cung cấp hoặc không hợp lệ",
      });
  }

  const email = req.decoded.email;
  const query = { email: email };

  try {
    const user = await User.findOne(query);
    const isAdmin = user?.role == "admin";

    if (!isAdmin) {
      return res.status(403).send({ message: "Cấm truy cập!" });
    }

    next();
  } catch (error) {
    console.error("Lỗi trong phần mềm trung gian verifyAdmin:", error);
    console.log(error);
    return res.status(500).send({ message: "Lỗi máy chủ nội bộ" });
  }
};

module.exports = verifyAdmin;
