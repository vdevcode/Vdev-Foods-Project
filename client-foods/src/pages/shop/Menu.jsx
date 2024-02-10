import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards";
import { FaFilter } from "react-icons/fa";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCaregory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage] = useState(8);

  //dung async await
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://be-vdev-foods-project.vercel.app/menu");
        const data = await response.json();
        setMenu(data);
        setFilteredItems(data);
      } catch (error) {
        console.log("Fetch lỗi:", error);
      }
    };
    fetchData();
  }, []);

  //filter cho product
  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);
    setFilteredItems(filtered);
    setSelectedCaregory(category);
    setCurrentPage(1);
  };

  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCaregory("all");
    setCurrentPage(1);
  };

  const handleSortChange = (option) => {
    setSortOption(option);

    let sortedItems = [...filteredItems];

    switch (option) {
      case "a-z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "z-a":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  //pagination
  const indexOfLastItems = currentPage * itemsPerPage;
  const indexOfFristItems = indexOfLastItems - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFristItems, indexOfLastItems);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="max-w-screen-2xl container mx-auto px-4 lg:px-24 bg-gradient-to-r from-[#FAFAFA] to-100%">
      {/* text */}
      <div className="pt-24 pb-8 sm:py-24 flex flex-col  justify-center items-center gap-8">
        {/* menu  */}
        <div className="text-center">
          <h2 className="md:text-5xl text-2xl font-bold md:leading-snug leading-snug">
            Sản phẩm tại<span className="text-green"> VdevFood</span>
          </h2>
          <p className="text-[#4A4A4A] mt-[10px] text-[1rem] md:text-xl">
            Đa dạng các loại sản phẩm đồ ăn, thức uống với giá hot sale
          </p>
          <button className="bg-green font-primary btn mt-[8px] text-white px-6">
             Mua hàng tại đây
          </button>
        </div>
      </div>

      {/* menu shop */}
      <div className="max-w-screen-2xl container mx-auto xl:px-24 pb-16">
        {/* <div className="mb-2">Lọc và sắp xếp</div> */}
        <div className="flex items-center flex-wrap justify-between">
          {/* sorting product */}
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4  flex-wrap">
            <button
              onClick={showAll}
              className={selectedCategory === "all" ? "active" : ""}
            >
              Tất cả
            </button>
            <button
              onClick={() => filterItems("Món ăn kiêng")}
              className={selectedCategory === "Món ăn kiêng" ? "active" : ""}
            >
              Món ăn kiêng
            </button>
            <button
              onClick={() => filterItems("Món ăn sáng")}
              className={selectedCategory === "Món ăn sáng" ? "active" : ""}
            >
              Món ăn sáng
            </button>
            <button
              onClick={() => filterItems("Món ăn vặt")}
              className={selectedCategory === "Món ăn vặt" ? "active" : ""}
            >
              Món ăn vặt
            </button>
            <button
              onClick={() => filterItems("món tráng miệng")}
              className={selectedCategory === "món tráng miệng" ? "active" : ""}
            >
              Món tráng miệng
            </button>
            <button
              onClick={() => filterItems("Đồ uống")}
              className={selectedCategory === "Đồ uống" ? "active" : ""}
            >
              Đồ uống
            </button>
          </div>

          {/* filter product */}
          <div className="p-2 flex items-center gap-2">
            <div className="">
              <FaFilter />
            </div>
            <select
              name="sort"
              id="sort"
              className="bg-none p-2 cursor-pointer"
              onChange={(e) => handleSortChange(e.target.value)}
              value={sortOption}
            >
              <option value="default">Mặc định</option>
              <option value="a-z">a-z</option>
              <option value="z-a">z-a</option>
              <option value="low-to-high">Thấp đến cao</option>
              <option value="high-to-low">Cao đến thấp</option>
            </select>
          </div>
        </div>

        {/* product */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {currentItems.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>

        {/* pagination */}
        <div className="flex justify-center px-4 flex-wrap">
          {Array.from({
            length: Math.ceil(filteredItems.length / itemsPerPage),
          }).map((_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`mx-1 my-5  items-center justify-between px-3 py-1 rounded-full ${
                currentPage === index + 1
                  ? "bg-green text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
