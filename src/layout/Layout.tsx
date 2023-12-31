import { useLocation } from "react-router-dom";
import SideNav from "../components/SideNav/SideNav";
import Nav from "../components/header/Nav";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  return (
    <div className="">
    {location.pathname !== "/login" && location.pathname !== "/register" && <SideNav />}
      <div className="w-full">
        <div className="bg-blue-2">
          {location.pathname !== "/login" && location.pathname !== "/register"  && <Nav />}
          <div className={`${location.pathname !== "/login" && location.pathname !== "/register" && "px-9"} w-full bg-blue-2`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
