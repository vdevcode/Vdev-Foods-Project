import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { useForm } from "react-hook-form";
import { useNavigate, Navigate, useLocation } from "react-router-dom";

const UpdateProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const name = data.name;
    const photo = data.photoURL;
    updateUserProfile(name, photo)
      .then((results) => {
        const result = results;
        setErrorMessage("Cập nhật thông tin thành công");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage("Cập nhật thông tin thất bại" + errorMessage);
      });
  };

  return (
    <div className="hero bg-base-200">
      <div className="mx-[10px]">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 my-[30%]">
          <h1 className="text-center my-3 text-green font-bold">
            Cập nhật thông tin
          </h1>
          <div className="text-center mt-4 text-red justify-center flex mx-auto">
            {user ? (
              <img
                className="w-20 h-20 rounded-[100%]"
                src={user?.photoURL}
                alt={user?.name}
              />
            ) : (
              <img
                className="w-20 h-20 rounded-[100%]"
                src="https://cdn4.iconfinder.com/data/icons/job-resume-9/100/job_work_office-15-512.png"
                alt={user?.name}
              />
            )}
          </div>
          <div className="text-red text-center mt-2">
            <p>{user?.displayName}</p>
          </div>
          <form
            className="card-body p-5 sm:p-[2rem]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Họ và tên </span>
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder={`Ví dụ: ${
                  user?.email ? user?.displayName : user?.name
                }...`}
                className="input input-bordered outline-none text-sm font-light"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Ảnh đại diện</span>
              </label>
              <input
                type="text"
                {...register("photoURL")}
                placeholder="upload link ảnh..."
                className="input input-bordered outline-none text-sm font-light"
                required
              />
            </div>
            <div className="">
              {errorMessage ? (
                <p className="text-center text-red">{errorMessage}</p>
              ) : (
                <p className="text-center text-blue">{errorMessage}</p>
              )}
            </div>
            <div className="text-sm font-light">
              <p>Mã tài khoản: {user?.metadata.createdAt}</p>
              <p className="my-[10px]">
                Lần đăng nhập gần đây: {user?.metadata.lastSignInTime}
              </p>
              <p>Địa chỉ ID: {user?.reloadUserInfo.localId}</p>
            </div>

            <div className="text-sm font-light">
              <p>Mã Token của bạn:</p>
              <div className="mt-2 flex justify-center border border-gray-300 w-full">
                <div className="py-2 w-[220px]  sm:w-[80%] outline-none  overflow-x-auto">
                  {user?.stsTokenManager.accessToken}
                </div>
              </div>
            </div>
            {/* <input type="file" className=' w-full max-w-xs' placeholder='đổi ảnh'/> */}
            <div className="form-control mt-6">
              <button className="btn bg-green text-white">Cập nhật</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
