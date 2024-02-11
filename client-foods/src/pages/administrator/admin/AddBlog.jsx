import React from "react";
import { useForm } from "react-hook-form";
import { IoIosAddCircle } from "react-icons/io";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddBlog = () => {
  const { register, handleSubmit, reset } = useForm();
  //lay api image tu web imgbb
  const img_hosting_key = import.meta.env.VITE_IMG_HOSTING_KEY;

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

  //send to post
  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const hostingImg = await axiosPublic.post(img_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (hostingImg.data.success) {
      const menuItem = {
        title: data.title,
        author: data.author,
        content: data.content,
        image: hostingImg.data.data.display_url,
      };
      //   console.log(menuItem);
      //post item len csdl
      const postMenuItems = axiosSecure.post("/blog", menuItem);
      if (postMenuItems) {
        reset();
        Swal.fire({
          title: "Thành công!",
          text: "Bạn đã đăng bài viết!",
          icon: "success",
        });
      }
    }
  };

  return (
    <div className="w-full md:w-[870px] mt-4">
      <h2 className="flex items-center gap-1 mb-4">
        Đăng tải <p className="text-green">bài viết Blogs</p>
      </h2>

      <form action="" onSubmit={handleSubmit(onSubmit)}>
        {/* row1 */}
        <div className="w-full form-control">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Tiêu đề bài viết</span>
            </div>
            <input
              type="text"
              placeholder="vd: mứt tết.."
              className="input input-bordered w-full"
              defaultValue=""
              {...register("title", { required: true })}
            />
          </label>
        </div>

        {/* row2 */}
        <div className="flex items-center gap-2 mt-3">
          {/* table1 */}
          {/* table2 */}
          <div className="w-full form-control">
            <div className="label">
              <span className="label-text">Tên tác giả*</span>
            </div>
            <input
              type="text"
              placeholder="vd: admin"
              className="input input-bordered w-full"
              {...register("author", { required: true })}
            />
          </div>
        </div>

        {/* row3 */}
        <label className="form-control my-3">
          <div className="label">
            <span className="label-text">Nội dung bài viết*</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Món mứt cứ đến tết là..."
            {...register("content", { required: true })}
            
          ></textarea>
        </label>
        {/* row4 */}
        <div className="">
          <div className="label">
            <span className="label-text">Ảnh bài viết*</span>
          </div>
          <input
            type="file"
            className="file-input file-input-bordered file-input-primary w-full max-w-xs"
            {...register("image", { required: true })}
          />
        </div>
        {/* row5 */}
        <button className="btn bg-green text-white my-3 w-full sm:w-[200px] flex items-center">
          <IoIosAddCircle /> Đăng tải bài viết blogs
        </button>
      </form>
    </div>
  );
};
export default AddBlog;
