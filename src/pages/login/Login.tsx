import { loginImg } from "../../../public/assets/index";
import { BiUser } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
export default function Login() {
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
        <form action="" className="w-full shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px] px-12 py-16 rounded-lg">
          <div className="w-[80%] rounded-lg mx-auto flex justify-start items-center gap-2 px-2 border border-[#808080] bg-white">
            <BiUser className="text-blue-1" size={25}/>
            <input className="p-3 w-full focus:outline-none" type="text" placeholder="Username"/>
          </div>

          <div className="w-[80%] border border-[#808080] rounded-lg mt-8 mx-auto flex justify-start items-center gap-2 px-2  bg-white">
            <RiLockPasswordLine className="text-blue-1" size={25}/>
            <input className="p-3 w-full focus:outline-none" type="password" placeholder="Password"/>
          </div>

          <button className="w-[80%] hover:scale-105 transition-all mx-auto flex justify-center items-center rounded-lg p-4 bg-blue-1 text-white mt-8">Login</button>
        </form>
      </div>
    </div>
  );
}
