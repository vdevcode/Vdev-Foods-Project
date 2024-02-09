import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { IoIosAddCircle } from "react-icons/io";

const UpdateMenu = () => {
    const item = useLoaderData();
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
        name: data.name,
        price: data.price,
        category: data.category,
        recipe: data.recipe,
        image: hostingImg.data.data.display_url,
      };
      //   console.log(menuItem);
      //post item len csdl
      const postMenuItems = axiosSecure.patch(`/menu/${item._id}`, menuItem);
      if (postMenuItems) {
        reset();
        Swal.fire({
          title: "Thành công!",
          text: "Bạn đã cập nhật được sản phẩm!",
          icon: "success",
        });
      }
    }
  };

  return (
    <div className="w-full md:w-[870px] mt-4">
      <h2 className="flex items-center gap-1 mb-4">
        Cập nhật <p className="text-green">sản phẩm</p>
      </h2>

      <form action="" onSubmit={handleSubmit(onSubmit)}>
        {/* row1 */}
        <div className="w-full form-control">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Tên sản phẩm</span>
            </div>
            <input
              type="text"
              placeholder="..."
              className="input input-bordered w-full"
              {...register("name", { required: true })}
              defaultValue={item.name}
            />
          </label>
        </div>

        {/* row2 */}
        <div className="flex items-center gap-2 mt-3">
          {/* table1 */}
          <div className="w-full form-control">
            <div className="label">
              <span className="label-text"> Chọn thể loại*</span>
            </div>
            <select
              className="select select-bordered w-full max-w-xs"
              {...register("category", { required: true })}
              defaultValue={item.category}
            >
              <option disabled value="default">
                Chọn thể loại
              </option>
              <option value="Món ăn kiêng">Món ăn kiêng</option>
              <option value="Món ăn vặt">Món ăn vặt</option>
              <option value="Món ăn tết">Món ăn tết</option>
              <option value="Đồ uống">Đồ uống</option>
            </select>
          </div>
          {/* table2 */}
          <div className="w-full form-control">
            <div className="label">
              <span className="label-text">Giá*</span>
            </div>
            <input
              type="number"
              placeholder="vd: nếu 10.000 thì ghi 10"
              className="input input-bordered w-full"
              {...register("price", { required: true })}
              defaultValue={item.price}
            />
          </div>
        </div>

        {/* row3 */}
        <label className="form-control my-3">
          <div className="label">
            <span className="label-text">Mô tả sản phẩm*</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Sản phẩm tuyệt...."
            {...register("recipe", { required: true })}
            defaultValue={item.recipe}
          ></textarea>
        </label>
        {/* row4 */}
        <div className="">
          <div className="label">
            <span className="label-text">Ảnh sản phẩm*</span>
          </div>
          <input
            type="file"
            className="file-input file-input-bordered file-input-accent w-full max-w-xs"
            {...register("image", { required: true })}

          />
        </div>
        {/* row5 */}
        <button className="btn bg-green text-white my-3 w-full sm:w-[200px] flex items-center">
          <IoIosAddCircle /> Đăng sản phẩm
        </button>
      </form>
    </div>
  );
};

export default UpdateMenu;
