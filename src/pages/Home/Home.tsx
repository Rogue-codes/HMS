import Activity from "../../components/dashboard/activity-overview/Activity";
import DashboardTable from "../../components/dashboard/table/DashboardTable";

export default function Home() {
  return (
    <div className="w-[80%]  border-black  ml-[20%] h-screen">
      <div className="rounded">
        <div className="w-full min-h-screen grid grid-cols-3 border-2 border-black p-8">
          <div className="bg-white shadow-[3px_3px_6px_0px_rgba(182,190,196,0.15),-1.5px_-1.5px_6px_0px_rgba(182,190,196,0.15)] rounded-lg px-2 py-8 h-[20rem] m-3">
            <Activity />
          </div>
          <div className="bg-white shadow-[3px_3px_6px_0px_rgba(182,190,196,0.15),-1.5px_-1.5px_6px_0px_rgba(182,190,196,0.15)] h-[20rem] overflow-y-scroll col-span-2 m-3 rounded-lg">
            <DashboardTable/>
          </div>
          <div className="bg-white shadow-[3px_3px_6px_0px_rgba(182,190,196,0.15),-1.5px_-1.5px_6px_0px_rgba(182,190,196,0.15)] h-[20rem] m-3 rounded-lg"></div>
          <div className="bg-white shadow-[3px_3px_6px_0px_rgba(182,190,196,0.15),-1.5px_-1.5px_6px_0px_rgba(182,190,196,0.15)] h-[20rem] m-3 rounded-lg"></div>
          <div className="bg-white shadow-[3px_3px_6px_0px_rgba(182,190,196,0.15),-1.5px_-1.5px_6px_0px_rgba(182,190,196,0.15)] h-[20rem] m-3 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
