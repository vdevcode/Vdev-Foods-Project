/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { FaStar } from "react-icons/fa";
import imageTestimonials from "../../assets/images/home/testimonials/testimonials.png";

const Testimonials = () => {
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-4 sm:py-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2">
          <img src={imageTestimonials} alt="" />
        </div>
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle">Lời chứng thực</p>
            <h2 className="title">Khách hàng nói gì?</h2>
            <blockquote className="my-5 text-secondary leading-[30px]">
              “Shop rẻ, sale nhiều, giá thành hợp lí, khuyến khích thêm voucher sale nhé.”
            </blockquote>

            {/* avater */}

            <div className="flex items-center gap-4 flex-wrap">
              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                <div className="avatar">
                  <div className="w-12 cursor-pointer">
                    <img src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/hinh-nen-dien-thoai-anime-2.jpg" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12 cursor-pointer">
                    <img src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/Hinh-nen-anime-cute-8-1.jpg" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12 cursor-pointer">
                    <img src="https://cdn.pixabay.com/photo/2018/09/11/14/49/moe-3669736_640.png" />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <h5 className="text-lg font-semibold">
                  Phản hồi của khách hàng
                </h5>
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  <span className="font-medium">4.9</span>
                  <span className="text-[#807E7E]">(18.6k Lượt xem)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
