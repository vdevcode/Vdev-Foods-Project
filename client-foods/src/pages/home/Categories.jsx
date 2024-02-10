import React from "react";
import img1 from "../../assets/images/home/categories/img1.png";
import img2 from "../../assets/images/home/categories/img2.png";
import img3 from "../../assets/images/home/categories/img3.png";
const categoryItems = [
  {
    id: 1,
    title: "Món ăn kiêng",
    despriction: "(12 món)",
    image: img1,
  },
  {
    id: 2,
    title: "Món ăn tết",
    despriction: "(9 món)",
    image: img3,
  },
  {
    id: 4,
    title: "Món ăn vặt",
    despriction: "(7 món)",
    image: img2,
  },
];

const Categories = () => {
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-2 sm:py-16">
      <div className="text-center">
        <p className="text-green uppercase tracking-wide">
          Thể loại được nhiều lượt thích
        </p>
        <h2 className=" text-[1rem] lg:text-lg mt-2 md:leading-snug leading-snug ">
          Danh mục phổ biến
        </h2>
      </div>

      {/* show product  */}
      <div className="grid grid-cols-2 sm:grid-cols-2  gap-8 justify-around items-center mt-12 ">
        {categoryItems.map((item, i) => (
          <div
            key={i}
            className="shadow-lg rounded-md bg-white py-3 px-4 w-full sm:w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 transition-all duration-300 z-10"
          >
            <div className="w-fullrounded-md mx-auto  flex items-center justify-center">
              <img
                src={item.image}
                alt=""
                className=" w-full rounded-md h-[100px]"
              />
            </div>
            <div className="mt-5 space-y-1">
              <h5 className="text-[#1E1E1E] font-semibold h-[40px]">{item.title}</h5>
              <p className="text-secondary text-sm mt-2">{item.despriction}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
