import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { FaCartShopping, FaUsers } from "react-icons/fa6";
import { IoBagAddSharp } from "react-icons/io5";
import { MdEditSquare } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import logo from "../assets/images/logo/logo.png";
import { MdDashboard } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { FaLocationArrow, FaQuestionCircle } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthProvider";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import Login from "../components/Login";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const DashBoardLayout = () => {
  const { user } = useContext(AuthContext);
  const { loading } = useAuth();
  //admin
  const [isAdmin, isAdminLoading] = useAdmin();

  const sharedLinks = (
    <>
      <li className="mt-3">
        <Link to="/">
          <MdDashboard /> Trang chủ
        </Link>
      </li>
      <li>
        <Link to="/menu">
          <FaCartShopping /> Món ăn
        </Link>
      </li>
      <li>
        <Link to="/follow-menu">
          <FaLocationArrow /> Theo dõi đơn hàng
        </Link>
      </li>
      <li>
        <Link to="/support-customer">
          <FaQuestionCircle /> Hỗ trợ khách hàng
        </Link>
      </li>
      <li>
        <Link to="/about">
          <FaPersonCircleQuestion /> Về chúng tôi
        </Link>
      </li>
    </>
  );

  return (
    <div>
      {isAdmin ? (
        <div className="drawer sm:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col sm:justify-start sm:items-center my-20 sm:my-2">
            <div className="flex items-center z-10 justify-between px-4 py-2 fixed top-0  left-0 right-0 bg-white shadow-sm">
              {/* Page content here */}
              <label
                htmlFor="my-drawer-2"
                className="  text-green text-[1.5rem] cursor-pointer drawer-button sm:hidden"
              >
                <MdDashboard />
              </label>
              {/* <button className="flex items-center gap-1  btn rounded-md  bg-green text-white sm:hidden">
                Đăng xuất <IoIosLogOut />
              </button> */}
              {/* avatar */}
              <div className="w-10 rounded-full">
                {user.photoURL ? (
                  <div className="avatar online placeholder cursor-pointer">
                  <div className="bg-neutral text-neutral-content rounded-full w-10">
                    <img src={user.photoURL} alt="" />
                  </div>
                </div> 
                  
                ) : (
                  <img src="https://cdn4.iconfinder.com/data/icons/job-resume-9/100/job_work_office-15-512.png" />
                )}
              </div>
            </div>
            <div className="max-w-screen-2xl container mx-auto xl:px-24 pb-16 px-4">
              <Outlet />
            </div>
          </div>
          <div className="drawer-side drawer-open sm:w-full z-20">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-[80%] sm:w-80 min-h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <li>
                <Link to="/">
                  <img src={logo} className="w-[6rem]" alt="" />
                </Link>
              </li>
              <li className="my-3">
                <Link to="/" className="flex items-center">
                  {user ? (
                    user?.displayName || user?.email
                  ) : (
                    <img src={logo} className="w-20" alt="" />
                  )}
                  <div className="badge badge-secondary">admin</div>
                </Link>
              </li>
              <li>
                <Link to="/dashboard">
                  {" "}
                  <MdSpaceDashboard /> Bảng điều khiển
                </Link>
              </li>
              <li>
                <Link to="/dashboard/manager-booking">
                  {" "}
                  <MdEditSquare /> Quản lí đơn hàng
                </Link>
              </li>
              <li>
                <Link to="/dashboard/add-menu">
                  {" "}
                  <IoBagAddSharp /> Thêm sản phẩm
                </Link>
              </li>
              <li>
                <Link to="/dashboard/manage-items">
                  {" "}
                  <RiEdit2Fill /> Quản lí sản phẩm
                </Link>
              </li>
              <li>
                <Link to="/dashboard/users">
                  <FaUsers /> Tất cả người dùng
                </Link>
              </li>
              <hr />
              {sharedLinks}
            </ul>
          </div>
        </div>
      ) : loading ? (
        <Login />
      ) : (
        <div className="h-screen flex justify-center items-center ">
          <Link to="/">
            {/* <p>Bạn không phải là admin, vui lòng quay lại</p> */}
            <button className="btn bg-green text-white">Về trang chủ</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashBoardLayout;
