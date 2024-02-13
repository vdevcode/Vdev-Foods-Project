/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Cards from "../../components/Cards";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";

const SpecialsDishes = () => {
  const [recipes, setRecipes] = useState([]);
  const slider = useRef(null);

  useEffect(() => {
    fetch("https://be-vdev-foods-project.vercel.app/menu")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Kiểm tra network có vấn đề: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        const specials = data.filter((item) => item.category === "Món ăn vặt");
        setRecipes(specials);
      })
      .catch((error) => console.error("Fetch lỗi:", error));
  }, []);

  //button next and prev
  const SimpleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      >
        next
      </div>
    );
  };

  const SimplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      >
        prev
      </div>
    );
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],

    nextArrow: <SimpleNextArrow />,
    prevArrow: <SimplePrevArrow />,
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-4 sm:py-16">
      {/* left */}
      <div className="text-center">
        <p className="text-green uppercase tracking-wide font-bold md:text-2xl text-[.8rem]">
            Phổ biến và tin dùng nhiều nhất
        </p>
        <h2 className=" md:text-[1rem] lg:text-l mt-2  md:leading-snug leading-snug md:w-[520px] text-[.8rem]">
      Sản phẩm dùng nhiều và đa dạng
        </h2>
      </div>
      {/* right */}
      <div className="mt-4">
        <div className="my-4 md:absolute right-3 top-8 mb-10 md:mr-24">
          <button
            onClick={() => slider?.current?.slickPrev()}
            className="p-1 md:p-2 border border-black rounded"
          >
            <GrFormPrevious />
          </button>
          <button
            onClick={() => slider?.current?.slickNext()}
            className="p-1 md:p-2 border border-black  rounded ml-5"
          >
            <GrFormNext />
          </button>
        </div>
        <Slider ref={slider} {...settings} className="overflow-hidden mt-10">
          {recipes.map((item, index) => (
            // truyen props
            <Cards key={index} item={item} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SpecialsDishes;
