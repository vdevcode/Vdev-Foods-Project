import React from "react";
import logoBanner from "../assets/images/home/banner.png";
import logoBanner2 from "../assets/images/home/foods-1.png"
import logoBanner1 from "../assets/images/home/foods-2.png"



const Banner = () => {
  return (
    <div className="max-w-screen-2xl container mx-auto px-4 lg:px-24 bg-gradient-to-r from-[#FAFAFA] to-100%">
      <div className="py-24 flex flex-col md:flex-row-reverse justify-between items-center gap-8">
        {/* right */}
        <div className="md:w-1/2">
          {/* banner img */}
          <div className="">
            <img src={logoBanner} alt="" />
          </div>
          <div className="flex flex-col md:flex-row justify-around items-center gap-3 -mt-9">
            {/* product 1 */}
            <div className="flex bg-white py-2 px-3 rounded items-center gap-3 shadow-sm md:w-64 w-full cursor-pointer">
              <div className="space-y-1 flex items-center gap-3">
                <div className="">
                  <img className="w-[50px] h-[50px] rounded-md" src={logoBanner1} alt="" />
                </div>
                {/* ten */}
                <div className="">
                  <h5>Hộp quà Tết bánh kẹo Kinh Đô</h5>
                  {/* rating */}
                  <div className="rating rating-sm">
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-orange-400"
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-orange-400"
                      readOnly
                      
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-orange-400"
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-orange-400"
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-orange-400"
                      readOnly
                    />
                  </div>
                  {/* price */}
                  <p className="text-red">253.000vnđ</p>
                </div>
              </div>
            </div>
            {/* product 2 */}
            <div className="flex bg-white py-2 px-3 rounded items-center gap-3 shadow-sm md:w-64 w-full cursor-pointer">
              <div className="space-y-1 flex items-center gap-3">
                <div className="">
                  <img className="w-[50px] h-[50px] rounded-md" src={logoBanner2} alt="" />
                </div>
                {/* ten */}
                <div>
                  <h6 className="text-justify">Kẹo đậu phộng</h6>
                  {/* rating */}
                  <div className="rating rating-sm">
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-orange-400"
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-orange-400"
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-orange-400"
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-orange-400"
                      readOnly
                    />
                   
                  </div>
                  {/* price */}
                  <p className="text-red">89.000vnđ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* left */}
        <div className="md:w-1/2">
          <h2 className="md:text-5xl text-2xl font-bold md:leading-snug leading-snug">
            Đặt hàng tại<span className="text-green"> VdevFood</span>
          </h2>
          <p className="text-[#4A4A4A] mt-[10px] text-[1rem] md:text-xl">
            Giao hàng nhanh chóng, tiện lợi, mọi thắc mắc của khách hàng đều
            được giải quyết trong thời gian sớm nhất.
          </p>
          <button className="bg-green font-primary btn mt-[8px] text-white px-6">
            Bắt đầu
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
