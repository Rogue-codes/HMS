import { useEffect } from "react";
import Activity from "../../components/dashboard/activity-overview/Activity";
import PieChartBox from "../../components/dashboard/charts/PieChart";
import EduContents from "../../components/dashboard/edu-contents/EduContents";
import PatientFee from "../../components/dashboard/patient-fee/PatientFee";
import DashboardTable from "../../components/dashboard/table/DashboardTable";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate()
  useEffect(()=>{
    const loggedIn = localStorage.getItem('user')
    !loggedIn && navigate('/login')
  },[navigate])
  return (
    <div className="w-[80%] bg-blue-2  ml-[20%] min-h-screen">
      <div className="rounded">
        <div className="w-full min-h-screen grid grid-cols-3">
          <div className="bg-white shadow-[3px_3px_6px_0px_rgba(182,190,196,0.15),-1.5px_-1.5px_6px_0px_rgba(182,190,196,0.15)] rounded-lg px-2 py-8 h-[20rem] m-3">
            <Activity />
          </div>
          <div className="bg-white shadow-[3px_3px_6px_0px_rgba(182,190,196,0.15),-1.5px_-1.5px_6px_0px_rgba(182,190,196,0.15)] h-[20rem] overflow-y-scroll col-span-2 m-3 rounded-lg">
            <DashboardTable/>
          </div>
          <div className="bg-white shadow-[3px_3px_6px_0px_rgba(182,190,196,0.15),-1.5px_-1.5px_6px_0px_rgba(182,190,196,0.15)] h-[20rem] m-3 rounded-lg">
            <EduContents/>
          </div>
          <div className="bg-white p-5 shadow-[3px_3px_6px_0px_rgba(182,190,196,0.15),-1.5px_-1.5px_6px_0px_rgba(182,190,196,0.15)] h-[20rem] m-3 rounded-lg">
            <p className="text-sm text-[#242222]">Top Medicines Sold</p>
            <PieChartBox/>
          </div>
          <div className="bg-white shadow-[3px_3px_6px_0px_rgba(182,190,196,0.15),-1.5px_-1.5px_6px_0px_rgba(182,190,196,0.15)] h-[20rem] m-3 rounded-lg">
            <PatientFee/>
          </div>
        </div>
      </div>
    </div>
  );
}
