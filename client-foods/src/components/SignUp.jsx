import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebook } from "react-icons/fa"; // Change FaFacebookF to FaFacebook
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const { createUser, updateUserProfile, signUpWithGmail } =
    useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const axiosPublic = useAxiosPublic()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;

    try {
      const result = await createUser(email, password);
      const user = result.user;
      updateUserProfile(data.email, data.photoURL).then(() => {
        const userInfor = {
          name: data.name,
          email: data.email,
          photoURL: result?.user?.photoURL
        };
        axiosPublic
          .post("/users", userInfor)
          .then((response) => {
            alert("Tạo tài khoản thành công");
            navigate(from, { replace: true });
          });
      });
      // setErrorMessage("Tạo tài khoản thành công");
      // document.getElementById("my_modal_5").close();
      // navigate(from, { replace: true });
    } catch (error) {
      const errorMessage = error.message;
      setErrorMessage("Lỗi khi tạo tài khoản. " + errorMessage);
    }
  };

  // login with google
  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfor = {
          name: result?.user?.displayName,
          email: result?.user?.email,
          photoURL: result?.user?.photoURL
        };
        axiosPublic.post("/users", userInfor).then((response) => {
          // console.log(response);
          alert("Đăng nhập thành công!");
          document.getElementById("my_modal_5").close();
          navigate("/");
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-4">
      <div className="modal-action flex flex-col justify-center mt-0 p-0">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <h3 className="font-bold text-lg">Đăng kí</h3>

          {/* name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Họ và tên</span>
            </label>
            <input
              type="name"
              placeholder="Họ và tên.."
              className="input input-bordered"
              {...register("name")}
            />
          </div>

          {/* email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register("email")}
            />
          </div>

          {/* password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              {...register("password")}
            />
            <label className="label mt-1">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>

          {/* error */}
          {errorMessage && (
            <p
              className={`text-center ${
                errorMessage.includes("Lỗi khi tạo tài khoản.")
                  ? "text-red"
                  : "text-green-500"
              }`}
            >
              {errorMessage}
            </p>
          )}

          {/* login btn */}
          <div className="form-control mt-6">
            <input
              type="submit"
              value="Signup"
              className="btn bg-green text-white"
            />
          </div>

          <p className="text-center my-2">
            Nếu bạn có tài khoản?{" "}
            <button
              className="underline text-red ml-1"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              <Link to="/login">Đăng nhập</Link>
            </button>{" "}
          </p>

          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </Link>
        </form>

        {/* social sign in */}
        <div className="text-center space-x-3 mb-5">
          <button
            onClick={handleRegister}
            className="btn btn-circle hover:bg-green hover:text-white"
          >
            <FcGoogle />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaFacebook />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaGithub />
          </button>
        </div>
      </div>
      <Modal />
    </div>
  );
};

export default SignUp;
