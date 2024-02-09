import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { GiConfirmed } from "react-icons/gi";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
const ManagerBooking = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments/all");
      return res.data;
    },
  });

  const formatDate = (createAt) => {
    const createAtDate = new Date(createAt);
    const day = createAtDate.getDate();
    const month = createAtDate.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
    const year = createAtDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleConfirm = async (items) => {
    await axiosSecure.patch(`/payments/${items._id}`).then((res) => {
      Swal.fire({
        title: "Chúc mừng!",
        text: "Bạn đã duyệt đơn hàng thành công.",
        icon: "success",
      });
      if (res.data.status === "Đã được duyệt") {
        refetch();
      }
    });
  };

  return (
    <div className="w-full md:w-[870px] mt-4">
      <div className="">
        {/* banner  */}
        <h2 className="flex items-center gap-1 mb-4">
          Quản lí <p className="text-green">đơn hàng,</p>{" "}
          <span>Tổng đơn: {orders.length}</span>
        </h2>
        {/* table */}
        <div className="overflow-x-auto w-full">
          <table className="table table-zebra">
            {/* head */}
            <thead className="text-center bg-green text-white">
              <tr>
                <th>#</th>
                <th>Avatar</th>
                <th>Họ & tên</th>
                <th>Email</th>
                <th>Mã đơn hàng</th>
                <th>Tên sản phẩm</th>
                <th>Số lượng sản phẩm</th>
                <th>Tổng tiền</th>

                <th>Trạng thái đơn hàng</th>
                <th>Ngày mua</th>
                <th>Duyệt đơn</th>
                <th>Xoá</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {/* row 1 */}
              {orders?.map((order, index) => (
                <tr key={index} className="text-center">
                  <td>{index + 1}</td>
                  <td className="text-center   ">
                    <img
                      className="w-8 h-8 text-center flex justify-center rounded-full"
                      src="https://zycrypto.com/wp-content/uploads/2018/11/Bearish-Crypto-Market-Is-This-The-Best-Time-To-Buy.png"
                      // src={user?.photoURL}

                      alt=""
                    />
                  </td>
                  <td>
                    {order.name && order.displayName ? (
                      order.displayName
                    ) : (
                      <p className="text-red">{order.name}</p>
                    )}
                  </td>
                  <td>{order.email}</td>
                  <td>{order.idTransaction}</td>
                  {/* <td>{(order.itemName).join(', ')}</td> */}
                  <td>{"Đang cập nhật..."}</td>
                  <td>{order.quantity}</td>
                  <td>
                    {order.cartTotals.toLocaleString("vi-VN", {
                      minimumFractionDigits: 3,
                    })}
                    VND
                  </td>
                  <td className="text-red">{order.status}</td>
                  <td>{formatDate(order.createAt)}</td>
                  <td>
                    {order.status === "Đã được duyệt" ? (
                      <p className="text-green">Đã duyệt đơn</p>
                    ) : (
                      <button
                        onClick={() => handleConfirm(order)}
                        className="btn btn-ghost btn-xs border bg-blue-500 border-blue-500 text-white"
                      >
                        <GiConfirmed />
                      </button>
                    )}
                  </td>
                  <td>
                    <button className="btn btn-ghost btn-xs border bg-red border-red text-white">
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

export default ManagerBooking;
