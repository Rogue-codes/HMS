import { useState } from "react";
import { loginImg } from "../../../public/assets/index";
import { IoEyeSharp } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { FormikErrors, useFormik } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../../store/reducers/authSlic";
import ApiFetcher from "../../utils/Api";

type UserLoginType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Login() {
  const [type, setType] = useState<string>("password");
  const base_url = "https://tes-hms.onrender.com/api/v1/Tes-HMS";
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const emailRegex = RegExp(/^\S+@\S+\.\S+$/);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const { password, email } = values;
      setLoading(true);
      try {
        const res = await ApiFetcher.post(`${base_url}/auth/signin`, {
          password,
          email,
        });
        setLoading(false);
        dispatch(login(res?.data?.data));
        localStorage.setItem('token', JSON.stringify(res.data.token));
        navigate("/");
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    },
    validate: (values) => {
      const errors: FormikErrors<UserLoginType> = {};
      if (!values.email) {
        errors.email = "Email is Required!";
      } else if (!emailRegex.test(values.email)) {
        errors.email = "Invalid email address!";
      }
      if (!values.password) {
        errors.password = "password is Required!";
      } else if (values.password.length < 6) {
        errors.password = "password must be atleast 6 characters!";
      }
      return errors;
    },
  });

  return (
    <div className="w-full h-screen bg-white flex justify-center items-center">
      <div className="w-[50%] h-full bg-blue-2 relative">
        <img
          src={loginImg}
          className="absolute left-0 top-0 h-full w-full object-cover -scale-x-[1]"
          alt=""
        />
        <div className="grad absolute h-full w-full z-10 opacity-50 left-0 top-0"></div>
      </div>

      <div className="w-1/2 bg-white flex flex-col justify-center items-center h-full p-12">
        <p className="text-blue-1 mb-8 text-center text-xl font-bold">LOGIN</p>
        <form
          action=""
          className="w-full shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px] px-12 py-16 rounded-lg"
          onSubmit={formik.handleSubmit}
        >
          <div
            className={`${
              formik.touched.email &&
              formik.errors.email &&
              " border border-red-500 bg-red-100"
            }  w-[80%] rounded-lg mx-auto flex justify-start items-center gap-2 px-2 border border-[#808080]`}
          >
            <AiOutlineMail
              className={`${
                formik.touched.email && formik.errors.email && " text-red-500"
              } text-blue-1`}
              size={25}
            />
            <input
              className={`${
                formik.touched.email &&
                formik.errors.email &&
                " placeholder:text-red-500"
              } p-3 w-full focus:outline-none bg-transparent`}
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              name="email"
              placeholder="Email"
            />
          </div>
          {formik.touched.email && formik.errors.email ? (
            <p className="ml-[10%] text-red-600 text-xs">
              {formik.errors.email}
            </p>
          ) : (
            ""
          )}

          <div
            className={`${
              formik.touched.password &&
              formik.errors.password &&
              "border-red-500 bg-red-100"
            }  w-[80%] relative border border-[#808080] rounded-lg mt-8 mx-auto flex justify-start items-center gap-2 px-2 `}
          >
            <RiLockPasswordLine
              className={`${
                formik.touched.password &&
                formik.errors.password &&
                " text-red-500"
              } text-blue-1`}
              size={25}
            />
            <input
              className={`${
                formik.touched.email &&
                formik.errors.email &&
                " placeholder:text-red-500"
              } p-3 w-full focus:outline-none bg-transparent`}
              type={type}
              value={formik.values.password}
              onChange={formik.handleChange}
              name="password"
              placeholder="Password"
            />
            {type === "password" ? (
              <IoEyeSharp
                className={`${
                  formik.touched.password &&
                  formik.errors.password &&
                  " text-red-500"
                } text-blue-1 absolute right-3 cursor-pointer top-3`}
                size={25}
                onClick={() => setType("text")}
              />
            ) : (
              <BsFillEyeSlashFill
                className="text-blue-1 absolute right-3 cursor-pointer top-3"
                size={25}
                onClick={() => setType("password")}
              />
            )}
          </div>
          {formik.touched.password && formik.errors.password ? (
            <p className="ml-[10%] text-red-600 text-xs">
              {formik.errors.password}
            </p>
          ) : (
            ""
          )}

          <button
            disabled={!formik.values.email || !formik.values.password}
            className="w-[80%] hover:scale-105 transition-all mx-auto flex justify-center items-center rounded-lg p-4 bg-blue-1 text-white mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Login"}
          </button>

          <p className="text-center mt-5">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-1 font-medium">
              Register here
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}
