import React, { useContext } from "react";
import logoBanner from "../assets/images/home/banner.png";
import logoBanner2 from "../assets/images/home/foods-1.png";
import logoBanner1 from "../assets/images/home/foods-2.png";
import logoFoods from "../assets/images/banner-foods.png";
import List1 from "../assets/images/list/1.png";
import List2 from "../assets/images/list/2.png";
import List3 from "../assets/images/list/3.png";
import List4 from "../assets/images/list/4.png";
import List5 from "../assets/images/list/5.png";
import List6 from "../assets/images/list/6.png";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

const Banner = () => {
  const { user } = useAuth();
  return (
    <div className="max-w-screen-2xl container mx-auto px-4 lg:px-24 bg-gradient-to-r from-[#FAFAFA] to-100%">
      <div className="pt-24 md:py-24 py-4 flex flex-col md:flex-row-reverse justify-between items-center gap-8">
        {/* right */}
        <div className="md:w-1/2">
          {/* banner img */}
          <div className="">
            <div className="md:block hidden ">
              <img src={logoBanner} alt="" className="rounded-sm" />
            </div>
            <div className="md:hidden block">
              <img src={logoFoods} alt="" className="rounded-sm w-full" />
            </div>
          </div>
          <div className="md:flex hidden flex-col md:flex-row justify-around items-center gap-3 md:-mt-9 mt-2">
            {/* product 1 */}
            <div className=" bg-green py-2 px-3 rounded items-center gap-3 shadow-sm md:w-64 w-full cursor-pointer">
              <div className="space-y-1 flex items-center gap-3">
                <div className="p-2 bg-white rounded-sm">
                  <img
                    className="w-[40px] h-[40px] rounded-md"
                    src={logoBanner1}
                    alt=""
                  />
                </div>
                {/* ten */}
                <div className="">
                  <h5 className="text1">Hộp quà Tết bánh kẹo Kinh Đô</h5>
                  {/* rating */}
                  <div className="rating rating-sm">
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-white"
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-white"
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-white"
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-white"
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-white"
                      readOnly
                    />
                  </div>
                  {/* price */}
                  <p className="text-white">253.000vnđ</p>
                </div>
              </div>
            </div>
            {/* product 2 */}
            <div className="flex bg-green py-2 px-3 rounded items-center gap-3 shadow-sm md:w-64 w-full cursor-pointer">
              <div className="space-y-1 flex items-center gap-3">
                <div className="p-2 bg-white rounded-sm">
                  <img
                    className="w-[40px] h-[40px] rounded-md"
                    src={logoBanner2}
                    alt=""
                  />
                </div>
                {/* ten */}
                <div>
                  <h6 className="text-justify">Kẹo đậu phộng</h6>
                  {/* rating */}
                  <div className="rating rating-sm">
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-white"
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-white"
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-white"
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-white"
                      readOnly
                    />
                  </div>
                  {/* price */}
                  <p className="text-white">89.000vnđ</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:hidden mt-3 grid grid-cols-3  justify-around items-center gap-5">
            {/* product 1 */}
            <div className="text-center flex flex-wrap justify-center cursor-pointer hover:text-green hover:font-medium">
              <img src={List1} alt="" className="w-[40px] h-full" />
              <p className="font-light text-[.7rem] text-center mt-1 text1">
                Voucher đặc biệt
              </p>
            </div>
            {/* product 2 */}
            <div className="text-center flex flex-wrap justify-center cursor-pointer hover:text-green hover:font-medium">
              <img src={List2} alt="" className="w-[40px] h-full" />
              <p className="font-light text-[.7rem] text-center mt-1 text1">
                Voucher free ship
              </p>
            </div>

            {/* product 3 */}
            <div className="text-center flex flex-wrap justify-center cursor-pointer hover:text-green hover:font-medium">
              <img src={List3} alt="" className="w-[40px] h-full" />
              <p className="font-light text-[.7rem] text-center mt-1 text1">
                Voucher giảm giá
              </p>
            </div>

            {/* product 4 */}
            <Link to="/wheel">
              <div
                // onClick={() => document.getElementById("my_modal_2").showModal()}
                className="text-center flex flex-wrap justify-center cursor-pointer hover:text-green hover:font-medium"
              >
                <img src={List4} alt="" className="w-[40px] h-full" />
                <p className="font-light text-[.7rem] text-center mt-1 text1">
                  Quay số may mắn
                </p>
              </div>
            </Link>

            {/* spinning wheel modal2 */}
            {/* <dialog id="my_modal_2" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-[.8rem] md:text-lg">chào {user?.displayName}</h3>
                <p className="py-4 text-[.8rem]">Thử vận may nào.</p>
                <SpinningWheel/>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>Đóng</button>
              </form>
            </dialog> */}

            {/* product 5 */}
            <div className="text-center flex flex-wrap justify-center cursor-pointer hover:text-green hover:font-medium">
              <img src={List5} alt="" className="w-[40px] h-full" />
              <p className="font-light text-[.7rem] text-center mt-1 text1">
                Hot sale hời
              </p>
            </div>

            {/* product 6 */}
            <div className="text-center flex flex-wrap justify-center cursor-pointer hover:text-green hover:font-medium">
              <img src={List6} alt="" className="w-[40px] h-full" />
              <p className="font-light text-[.7rem] text-center mt-1 text1">
                Sản phẩm quốc tế
              </p>
            </div>
          </div>
        </div>
        {/* left */}
        <div className="md:w-1/2 md:block hidden">
          <h2 className="md:text-5xl text-xl font-bold md:leading-snug leading-snug">
            Đặt hàng tại<span className="text-green"> VdevFood</span>
          </h2>
          <p className="text-[#4A4A4A] mt-[10px] text-[.8rem] md:text-xl font-light">
            Giao hàng nhanh chóng, tiện lợi, mọi thắc mắc của khách hàng đều
            được giải quyết trong thời gian sớm nhất.
          </p>
          <button className="bg-green w-full sm:w-[200px] font-primary btn mt-[8px] text-white px-6">
            Bắt đầu
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
