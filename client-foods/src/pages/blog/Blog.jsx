import React from "react";
import { MdOutlineComment } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { GrUserAdmin } from "react-icons/gr";
import { FaRegClock } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiNote } from "react-icons/pi";
import useAuth from "../../hooks/useAuth";
import useBlog from "../../hooks/useBlog";
import { Link } from "react-router-dom";
const Blog = () => {
  const { user } = useAuth();
  const [refetch, blog] = useBlog();

  const formatTime = (createdAt) => {
    const date = new Date(createdAt);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `lúc ${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 pb-16 px-4">
      {/* banner  */}
      <div className="pt-24 pb-8 sm:py-24 flex flex-col  justify-center items-center gap-8">
        <div className="text-center">
          <h2 className="md:text-5xl text-2xl font-bold md:leading-snug leading-snug">
            Blog<span className="text-green"> Vdev Foods</span>
          </h2>
          <p className="text-[#4A4A4A] mt-[10px] text-[1rem] md:text-xl">
            Đọc blogs để hiểu thêm về chúng tôi
          </p>
        </div>
      </div>

      {/* Blogs */}
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {blog?.map((items, index) => (
            <div className="p-2 bg-base-200 rounded-sm " key={index}>
              <Link to={`/blog/${items._id}`}>
                <div className="relative w-full cursor-pointer">
                  <img
                    className="w-full rounded-sm h-[200px]"
                    src={items.image}
                    alt=""
                  />
                  <div className="absolute top-0 right-0 bg-green text-white ">
                    <button
                      className="p-2"
                      onClick={() =>
                        document.getElementById("my_modal_2").showModal()
                      }
                    >
                      <PiNote />
                    </button>
                    <dialog id="my_modal_2" className="modal">
                      <div className="modal-box bg-black">
                        <h3 className="font-bold text-lg flex items-center gap-1">
                          Xin chào{" "}
                          <p className="text-green">{user?.displayName}!!!</p>
                        </h3>
                        <p className="py-4">
                          Nếu thấy blog hay thì cho admin 1 like hoặc bình luận
                          nha.
                        </p>
                      </div>
                      <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                      </form>
                    </dialog>
                  </div>
                </div>
              </Link>
              <div className="p-2 border-b border-b-gray-300">
                <p className="font-medium text1">{items.title}</p>
                <div className="flex items-center gap-2 text-red">
                  <GrUserAdmin />
                  <p className="my-2">Đăng bởi: {items.author}</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaRegClock />
                  <p className="font-light">
                    Thời gian: {formatTime(items.createdAt)}
                  </p>
                </div>

                <div className="flex items-center ">
                  <IoDocumentTextOutline />
                  <p className="font-light text mt-2">
                    Nội dung: <i>{items.content}</i>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between my-2">
                <div className="flex items-center gap-2 hover:text-red cursor-pointer">
                  <AiFillLike />
                  {items.likes}
                </div>
                <div className="flex items-center gap-2 hover:text-red cursor-pointer">
                  <MdOutlineComment />
                  {items.comments}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
