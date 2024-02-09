const Menu = require("../models/Menu");

//get all menu
const getAllMenuItems = async (req, res) => {
  try {
    const menus = await Menu.find({}).sort({ createAt: -1 });
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//post menu
const postItemMenu = async (req, res) => {
  const newItem = req.body;
  try {
    const result = await Menu.create(newItem);
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//deleted menu
const deletedMenuItem = async (req, res) => {
  const menuId = req.params.id;
  try {
    const deledtedItem = await Menu.findByIdAndDelete(menuId);
    if (!deledtedItem) {
      return res.status(404).json({ message: "không tìm thấy items" });
    }
    res.status(200).json({ message: "xoá items thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//single item in menu
const singleMenuItem = async (req, res) => {
  const menuId = req.params.id;
  try {
    const menu = await Menu.findById(menuId);
    if (!menu) {
      return res.status(404).json({ message: "không tìm thấy items" });
    }
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update items in menu
const updateMenuItem = async (req, res) => {
  const menuId = req.params.id;
  const { _id, name, recipe, price, category, image, createAt } = req.body;
  try {
    const updateMenu = await Menu.findByIdAndUpdate(
      menuId,
      { _id, name, recipe, price, category, image, createAt },
      { new: true, runValidators: true }
    );
    if (!updateMenu) {
      return res.status(404).json({ message: "không tìm thấy items" });
    }
    res.status(200).json(updateMenu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllMenuItems,
  postItemMenu,
  deletedMenuItem,
  singleMenuItem,
  updateMenuItem,
};
