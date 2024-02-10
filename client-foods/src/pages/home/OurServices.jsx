import React from "react";

const serviceLists = [
    {id:1, title: "Dịch vụ", des: "Đem đến sự hài lòng cho mọi người", img: "/images/home/services/icon1.png"},
    {id:2, title: "Chuyển phát nhanh", des: "Chúng tôi giao hàng nhanh chóng đến tận nhà bạn", img: "/images/home/services/icon2.png"},
    {id:3, title: "Đặt hàng trực tuyến", des: "Khám phá thực đơn và đặt hàng một cách dễ dàng bằng cách sử dụng Đặt hàng trực tuyến của chúng tôi", img: "/images/home/services/icon3.png"},
    {id:4, title: "Thẻ quà tặng", des: "Tặng quà ẩm thực đặc sắc với Thẻ quà tặng Vdevfood", img: "/images/home/services/icon4.png"},
]

const OurServices = () => {
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-16 py-4 sm:py-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="text-green uppercase tracking-wide">Câu chuyện & Dịch vụ của chúng tôi</p>
            <h2 className="text-[1rem] lg:text-l mt-2  md:leading-snug leading-snug">Xây dựng lên thương hiệu Vdev Foods</h2>
            <p className="my-5 text-secondary leading-[30px]">
            Bắt nguồn từ niềm đam mê, chày cối code thâu đêm và ra mắt shop, đơn giản thế thôi.
            </p>

            <button className="bg-green font-semibold btn text-white px-8 py-3">
            Khám phá
            </button>
          </div>
        </div>
        <div className="md:w-1/2">
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 items-center">
                {
                    serviceLists.map((service) => (
                        <div key={service.id} className="shadow-md rounded-sm py-5 px-4 text-center space-y-2 text-green cursor-pointer hover:border hover:border-black transition-all duration-200">
                            <img src={service.img} alt="" className=" mx-auto"/>
                            <h5 className="pt-3 font-semibold"> {service.title}</h5>
                            <p className="text-black">{service.des}</p>
                        </div>
                    ))
                }
            </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;