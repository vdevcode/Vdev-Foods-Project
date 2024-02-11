import React from "react";
import useBlog from "../../../hooks/useBlog";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManagerBlogs = () => {
  const [refetch, blog] = useBlog();

  const axiosSecure = useAxiosSecure()
  const formartDate = (created) => {
    const createAtDate = new Date(created);
    const day = createAtDate.getDate();
    const month = createAtDate.getMonth() + 1;
    const year = createAtDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDeletedBlog = async (items) => {
    Swal.fire({
      title: "Bạn có chắc không?",
      text: "Bạn sẽ không thể quay lại điều này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Vâng, xóa nó đi!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/blog/${items._id}`);
        if (res) {
          refetch();
          Swal.fire({
            title: "Đã xóa!",
            text: "Bài viết của bạn đã bị xóa.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div className="w-full md:w-[870px] mt-4">
      <div className="">
        <h2 className="flex items-center gap-1 mb-4">
          Quản lí <p className="text-green">bài viết,</p>{" "}
          <span>Tổng bài viết: {blog?.length}</span>
        </h2>

        {/* table */}
        <div className="overflow-x-auto w-full">
          <table className="table table-zebra">
            {/* head */}
            <thead className="text-center bg-green text-white">
              <tr>
                <th>#</th>
                <th>Ảnh blog</th>
                <th>Tiêu đề bài viết</th>
                <th>Ngày đăng</th>
                <th>Xoá</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {/* row 1 */}
              {blog?.map((order, index) => (
                <tr key={index} className="text-center">
                  <td>{index + 1}</td>
                  <td className="text-center   ">
                    <img
                      className="w-full h-10 text-center flex justify-center rounded-sm"
                      src={order.image}
                      // src={user?.photoURL}

                      alt=""
                    />
                  </td>
                  <td>
                    <p className="text-red text">{order.title}</p>
                  </td>
                  <td>{formartDate(order.createdAt)}</td>
                  <td>
                    <button
                      onClick={() => handleDeletedBlog(order)}
                      className="btn btn-ghost btn-xs border bg-red border-red text-white"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagerBlogs;
