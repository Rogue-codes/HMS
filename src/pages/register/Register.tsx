import { useState } from "react";
import { loginImg } from "../../../public/assets/index";
import { BiUser } from "react-icons/bi";
import { IoEyeSharp } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { BsFillEyeSlashFill, BsShieldLockFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FormikErrors, useFormik } from "formik";
import { AiOutlineMail } from "react-icons/ai";
import Backdrop from "../../widgets/modal/Backdrop";
import OtpInput from "../../components/otp/OtpInput";
import { LiaTimesSolid } from "react-icons/lia";
import { useDispatch } from "react-redux";
import { login } from "../../store/reducers/authSlic";
import ApiFetcher from "../../utils/Api";

type UserRegistrationType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export default function Register() {

  const [type, setType] = useState<string>("password");
  const [confrimPasswordType, setconfirmPasswordType] =
    useState<string>("password");

  const [loading, setLoading] = useState<boolean>(false);

  const [showOtpModal, setShowOtpModal] = useState<boolean>(false);

  const dispatch = useDispatch()
  const emailRegex = RegExp(/^\S+@\S+\.\S+$/);
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      const { username, password, email } = values;
      setLoading(true);
      try {
        const res = await ApiFetcher.post(`/auth/signup`, {
          username,
          password,
          email,
        });
        setLoading(false);
        if(res.data.status === "success") {
            setShowOtpModal(true);
        }
        dispatch(login(res?.data?.data))
        localStorage.setItem('token', JSON.stringify(res.data.token));
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    },
    validate: (values) => {
      const errors: FormikErrors<UserRegistrationType> = {};
      if (!values.username) {
        errors.username = "username is Required!";
      }
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
      if (!values.confirmPassword) {
        errors.confirmPassword = "confirmPassword is Required!";
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Password does not match!";
      }
      return errors;
    },
  });

  const [otp, setOtp] = useState('');
  const onChange = (value: string) => setOtp(value);
  const [otpLoading, setOtpLoading] = useState<boolean>(false)

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
        <p className="text-blue-1 mb-8 text-center text-xl font-bold">REGISTER</p>
        <form
          action=""
          className="w-full shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px] px-12 py-16 rounded-lg"
          onSubmit={formik.handleSubmit}
        >
          <div
            className={`${
              formik.touched.username &&
              formik.errors.username &&
              "border border-red-500 bg-red-100"
            } w-[80%] rounded-lg mx-auto flex justify-start items-center gap-2 px-2 border border-[#808080]`}
          >
            <BiUser
              className={`${
                formik.touched.username &&
                formik.errors.username &&
                " text-red-500"
              } text-blue-1`}
              size={25}
            />
            <input
              className={`${
                formik.touched.username &&
                formik.errors.username &&
                " placeholder:text-red-500 bg-red-100"
              } p-3 w-full focus:outline-none`}
              type="text"
              placeholder="Username*"
              value={formik.values.username}
              name="username"
              onChange={formik.handleChange}
            />
          </div>
          {formik.touched.username && formik.errors.username ? (
            <p className="ml-[10%] text-red-600 text-xs">
              {formik.errors.username}
            </p>
          ) : (
            ""
          )}

          <div
            className={`${
              formik.touched.email &&
              formik.errors.email &&
              "border border-red-500 bg-red-100"
            }  w-[80%] rounded-lg mx-auto flex justify-start mt-8 items-center gap-2 px-2 border border-[#808080]`}
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
              type="text"
              placeholder="email*"
              value={formik.values.email}
              name="email"
              onChange={formik.handleChange}
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
              "border border-red-500 bg-red-100"
            }  w-[80%] relative border border-[#808080] rounded-lg mt-8 mx-auto flex justify-start items-center gap-2 px-2`}
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
                formik.touched.password &&
                formik.errors.password &&
                " placeholder:text-red-500"
              } p-3 w-full bg-transparent focus:outline-none`}
              type={type}
              placeholder="Password"
              value={formik.values.password}
              name="password"
              onChange={formik.handleChange}
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
                className={`${
                  formik.touched.password &&
                  formik.errors.password &&
                  " text-red-500"
                } text-blue-1 absolute right-3 cursor-pointer top-3`}
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

          <div
            className={`${
              formik.touched.confirmPassword &&
              formik.errors.confirmPassword &&
              "border border-red-500 bg-red-100"
            } w-[80%] relative border border-[#808080] rounded-lg mt-8 mx-auto flex justify-start items-center gap-2 px-2 `}
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
                formik.touched.confirmPassword &&
                formik.errors.confirmPassword &&
                "placeholder:text-red-500 bg-red-100"
              } p-3 w-full focus:outline-none`}
              type={confrimPasswordType}
              placeholder="Confirm Password"
              value={formik.values.confirmPassword}
              name="confirmPassword"
              onChange={formik.handleChange}
            />
            {confrimPasswordType === "password" ? (
              <IoEyeSharp
                className={`${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword &&
                  " text-red-500"
                } text-blue-1 absolute right-3 cursor-pointer top-3`}
                size={25}
                onClick={() => setconfirmPasswordType("text")}
              />
            ) : (
              <BsFillEyeSlashFill
                className={`${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword &&
                  " text-red-500"
                } text-blue-1 absolute right-3 cursor-pointer top-3`}
                size={25}
                onClick={() => setconfirmPasswordType("password")}
              />
            )}
          </div>
          {formik.touched.username && formik.errors.username ? (
            <p className="ml-[10%] text-red-600 text-xs">
              {formik.errors.username}
            </p>
          ) : (
            ""
          )}

          <button
            type="submit"
            className="w-[80%] hover:scale-105 transition-all mx-auto flex justify-center items-center rounded-lg p-4 bg-blue-1 text-white mt-8"
          >
            {loading ? "Loading..." : "Register"}
          </button>
          <p className="text-center mt-5">
            Already have an account?,{" "}
            <Link to="/login" className="text-blue-1 font-medium">
              login here
            </Link>
          </p>
        </form>
      </div>
      {
        showOtpModal &&  <Backdrop>
            <div className="w-[40%] flex relative flex-col justify-center items-center gap-6 p-5 py-8 border-2 shadow-md rounded-lg bg-white">
                <LiaTimesSolid className="absolute text-lg cursor-pointer right-4 top-4" onClick={()=>setShowOtpModal(false)}/>
                <div className="w-12 h-12 border rounded-full bg-[#3496f962] shadow-md flex justify-center items-center">
                    <BsShieldLockFill className="text-blue-1" size={30}/>
                </div>
                <p className="text-blue-1 text-lg">Enter your Confirmation Code</p>
                <p className="text-text-2 text-sm text-center">A confirmation code has been sent to your Registered Email/Phone number.</p>
                <OtpInput setOtpLoading={setOtpLoading} value={otp} setValue={setOtp} valueLength={4} onChange={onChange} setShowOtpModal={setShowOtpModal}/>
                <p>{otpLoading && "Loading..."}</p>
            </div>
        </Backdrop>
      }
    </div>
  );
}
