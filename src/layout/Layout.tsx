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
    {location.pathname !== "/login" && <SideNav />}
      <div className="w-full">
        <div className="bg-blue-2">
          {location.pathname !== "/login" && <Nav />}
          <div className="w-full px-9 bg-blue-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
