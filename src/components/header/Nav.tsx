import { IoIosNotifications } from "react-icons/io";
import { profile } from "../../../public/assets";
export default function Nav() {
  return (
    <div className="w-[80%] ml-[20%] py-9 flex justify-between items-center px-8">
      <p className="text-lg font-medium text-text-1">Appointments</p>

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
            <p className="text-text-1 text-xs font-medium">Jonitha Cathrine</p>
            <p className="text-text-2 text-[11px] font-normal">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
