import React from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const Order = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("access-token");

  const { refetch, data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:6001/payments?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return res.json();
    },
  });

  const formatDate = (createAt) => {
    const createAtDate = new Date(createAt);
    const day = createAtDate.getDate();
    const month = createAtDate.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
    const year = createAtDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 pb-16 my-4 sm:my-10 px-4">
      <div className="py-24 flex flex-col justify-center items-center gap-8">
        <div className="text-center">
          <h2 className="md:text-5xl text-2xl font-bold md:leading-snug leading-snug">
            Tất cả<span className="text-green"> đơn hàng</span>
          </h2>
          <p className="text-[#4A4A4A] mt-[10px] text-[1rem] md:text-xl">
            Đơn hàng mà bạn đã mua.
          </p>
        </div>
        <div className="overflow-x-auto w-full">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <table className="table table-zebra">
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
                </tr>
              </thead>
              <tbody className="text-center">
                {Array.isArray(orders) && orders.length > 0 ? (
                  orders.map((order, index) => (
                    <tr key={index} className="text-center">
                      <td>{index + 1}</td>
                      <td className="text-center">
                        {user?.photoURL ? (
                          <img
                            className="w-8 text-center rounded-full justify-center"
                            src={user?.photoURL}
                            alt=""
                          />
                        ) : (
                          <img
                            className="w-8 text-center flex justify-center rounded-full"
                            src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                            alt=""
                          />
                        )}
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
                        })}VND
                      </td>
                      <td className="text-red">{order.status}</td>
                      <td>{formatDate(order.createAt)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center">
                      Không có đơn hàng
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
