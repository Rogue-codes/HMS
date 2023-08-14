/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoIosNotifications } from "react-icons/io";
import { profile } from "../../../public/assets";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { User } from "../../store/reducers/authSlic";
export default function Nav() {
  const location = useLocation()

  const pageName = location.pathname.split("/")

  const actualPage = !pageName[1] ? "Dashboard" : pageName[1]

  const admin:User = useSelector((state:any)=>state.auth.user)

  return (
    <div className="w-[80%] ml-[20%] py-9 flex justify-between items-center px-8">
      <p className="text-lg font-medium text-text-1">{actualPage.toLocaleUpperCase()}</p>

      <div className="flex justify-start gap-8 items-center">
        <div className="relative">
        <IoIosNotifications size="30" />
        <div className="w-2 absolute right-0 top-0 h-2 bg-red-500 rounded-full"></div>
        </div>
        
        <div className="flex justify-start gap-3 items-center">
          <div className="w-10 h-10 rounded-full">
            <img src={profile} className="w-full h-full rounded-full object-contain" alt="" />
          </div>
          <div>
            <p className="text-text-1 text-xs font-medium">{admin.username}</p>
            <p className="text-text-2 text-[11px] font-normal">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
