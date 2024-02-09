import React, { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { FaTrash, FaUser } from "react-icons/fa6";
import { GrUserAdmin } from "react-icons/gr";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";

const Users = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("access-token");
  const axiosSecure = useAxiosSecure();

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      // const res = await fetch(`http://localhost:6001/users`, {
      //   headers: {
      //     authorization: `Bearer ${token}`,
      //   },
      // });
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`users/admin/${user._id}`)
      .then((res) => {
        alert(`Đã phong ${user.email} lên admin thành công`);
        refetch();
      })
      .catch((error) => {
        if (error.response) {
          // Xử lý lỗi dựa trên response từ server
          console.error("Lỗi từ server:", error.response.data);
        } else {
          // Xử lý lỗi khác
          console.error("Lỗi không có response từ server:", error.message);
        }
      });
  };

  const handleDeletedUser = (user) => {
    axiosSecure.delete(`users/${user._id}`).then((res) => {
      alert(`Đã xoá ${user.email} thành công`);
      refetch();
    });
  };

  // Lọc bớt những người dùng có email trùng lặp
  const filteredUsers = users.filter(
    (user, index, self) =>
      index === self.findIndex((u) => u.email === user.email)
  );

  return (
    <div className="my-4 w-full md:w-[870px]">
      <div className="flex items-center justify-between my-2">
        Tổng users: {filteredUsers.length}
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead className="text-center bg-green text-white">
            <tr>
              <th>#</th>
              <th>Ảnh đại diện</th>
              <th>Họ & tên</th>
              <th>Email</th>
              <th>Chức vụ</th>
              <th>Chỉnh sửa</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {/* row 1 */}
            {filteredUsers?.map((user, index) => (
              <tr key={index} className="">
                <td>{index + 1}</td>
                <td className="text-center flex items-center justify-center">
                  {user && user.role === "admin" ? (
                    // <img src={user.photoURL} alt={user.name} />
                    <img
                      className="w-8 text-center flex justify-center rounded-full"
                      src="https://media.licdn.com/dms/image/C4E03AQGO448nAOrvfw/profile-displayphoto-shrink_400_400/0/1516929476300?e=2147483647&v=beta&t=i9xTbCh2nx3upQEx53PPtGP28Da2T7i_AJOTsqQRliE"
                      alt=""
                    />
                  ) : user?.photoURL ? (
                    <img
                      className="w-8 text-center rounded-full flex justify-center"
                      src={user?.photoURL}
                      alt=""
                    />
                  ) : (
                    <img
                      className="w-8 text-center flex justify-center rounded-full"
                      src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                      // src={user?.photoURL}

                      alt=""
                    />
                  )}
                </td>
                <td>
                  {user.name && user.displayName ? (
                    user.displayName
                  ) : (
                    <p className="text-red">{user.name}</p>
                  )}
                </td>
                <td>{user.email}</td>
                <td className="text-red">
                  {user.role === "admin" ? (
                    <button className="flex items-center gap-2">
                      <GrUserAdmin />
                      admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="text-green"
                    >
                      <FaUser />
                    </button>
                  )}
                </td>
                <td className=" text-red">
                  <button
                    onClick={() => handleDeletedUser(user)}
                    className="btn btn-xs bg-red text-white"
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
  );
};

export default Users;
