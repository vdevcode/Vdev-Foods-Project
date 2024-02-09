const Carts = require("../models/Carts");

const getCartByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    const query = { email: email };
    const result = await Carts.find(query).exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add to cart
const addToCart = async (req, res) => {
  const { menuItemId, name, recipe, image, price, email, quantity } = req.body;
  try {
    const existingCartItem = await Carts.findOne({ email, menuItemId });
    if (existingCartItem) {
      return res
        .status(500)
        .json({ message: "Sản phẩm này đã có trong giỏ hàng của bạn rồi." });
    }

    const cartItem = Carts.create({
      menuItemId,
      name,
      recipe,
      image,
      price,
      email,
      quantity,
    });

    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete cart
const deleteCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    const deletedCart = await Carts.findByIdAndDelete(cartId);
    if (!deletedCart) {
      return res
        .status(401)
        .json({ message: "Không tìm thấy sản phẩm để xoá" });
    }

    res.status(200).json({ message: "Xoá sản phẩm này thành công!" });
  } catch (error) {
    res.status(5000).json({ message: error.message });
  }
};

//update cart
const updateCart = async (req, res) => {
  const cartId = req.params.id;
  const { menuItemId, name, recipe, image, price, email, quantity } = req.body;
  try {
    const updatedCart = await Carts.findByIdAndUpdate(
      cartId,
      { menuItemId, name, recipe, image, price, email, quantity },
      { new: true, runValidators: true }
    );

    if (!updatedCart) {
      res.status(404).json({ message: "Không tìm thấy sản phẩm để sửa" });
    }
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get single product
const singleCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    const cartItem = await Carts.findById(cartId);
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCartByEmail,
  addToCart,
  deleteCart,
  updateCart,
  singleCart,
};
