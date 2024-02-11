import React from "react";
import { FaRegClock } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useLoaderData } from "react-router-dom";

const SingleBlog = () => {
  const { _id, image, title, author, createdAt, content, likes, comments } =
    useLoaderData();

  const formatTime = new Date(createdAt);
  const day = formatTime.getDay();
  const month = formatTime.getMonth() + 1;
  const year = formatTime.getFullYear();
  const hours = formatTime.getHours();
  const minutes = formatTime.getMinutes();
  const seconds = formatTime.getSeconds();

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 pb-16 px-4">
      {/* banner */}
      <div className="pt-24 pb-8 sm:py-24 flex flex-col  justify-center items-center gap-8">
        <div className="text-center">
          <h2 className="md:text-5xl text-2xl font-bold md:leading-snug leading-snug">
            Xem nội dung<span className="text-green"> Blogs</span>
          </h2>
          <p className="text-[#4A4A4A] mt-[10px] text-[1rem] md:text-xl">
            Bạn đang đọc <span className="text-green">{title}</span>
          </p>
        </div>
      </div>

      {/* blog */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* left */}
        <div className="">
          <div className="w-full h-[200px] md:w-[400px]">
            <img className="rounded-sm w-full h-[200px]" src={image} alt="" />
          </div>
          <div className="font-medium mt-2">
            <p>{title}</p>
            <div className="flex items-center gap-2 text-red">
              <GrUserAdmin />
              <p className="my-2">Đăng bởi: {author}</p>
            </div>
            <div className="flex items-center gap-2">
              <FaRegClock />
              <p className="font-light">
                Thời gian:{" "}
                {`lúc ${hours}:${minutes}:${seconds} ngày ${day}/${month}/${year}`}
              </p>
            </div>
            <div className="flex items-center border mt-2 border-gray-300 rounded-sm p-2">
                  <IoDocumentTextOutline />
                  <p className="font-light mt-2">
                    Nội dung: <i>{content}</i>
                  </p>
                </div>
          </div>
        </div>
        {/* right */}
        <div className="">Đang xây dựng.....</div>
      </div>
    </div>
  );
};

export default SingleBlog;
