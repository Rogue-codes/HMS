import { Link, useLocation } from "react-router-dom";
import { NavLinks } from "../../utils";
import { AiFillDashboard } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";
import { MdLibraryBooks } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { BiSolidMessageDetail } from "react-icons/bi";
import { MdInventory2 } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { logo } from "../../../public/assets";
import {FiLogOut} from 'react-icons/fi';

export default function SideNav() {
  const location = useLocation();
  return (
    <div className="w-[20%] !min-h-screen bg-white fixed left-0 top-0">
      <div className="flex px-2 py-5 mb-11 justify-start gap-3 items-center">
        <img src={logo} alt="" />
        <h1 className="logo text-blue-1">JHC Clinic</h1>
      </div>
      {NavLinks.map((nav, _) => (
        <Link to={nav.link} key={_}>
          <div
            className={`${
              location.pathname === nav.link
                ? "text-blue-1 bg-[#3496f943] "
                : "text-text-3"
            }  flex justify-start text-sm gap-2 items-center py-4 px-3`}
          >
            {_ === 0 ? (
              <AiFillDashboard />
            ) : _ === 1 ? (
              <BsPeopleFill />
            ) : _ === 2 ? (
              <MdLibraryBooks />
            ) : _ === 3 ? (
              <FaUserDoctor />
            ) : _ === 4 ? (
              <BiSolidMessageDetail />
            ) : _ === 5 ? (
              <MdInventory2 />
            ) : (
              <IoSettingsSharp />
            )}
            <p>{nav.label}</p>
          </div>
        </Link>
      ))}

      <div className="flex px-2 py-5 mt-11 justify-start gap-3 items-center">
        <FiLogOut size="40" color="rgba(127, 143, 152, 1)"/>
        <h1 className="text-sm text-text-1">Logout</h1>
      </div>
    </div>
  );
}
