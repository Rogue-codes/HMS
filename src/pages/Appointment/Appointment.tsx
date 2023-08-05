import { useState } from "react";
import Tab from "../../components/tabs/Tab";
import { AiOutlinePlus } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import Tr from "../../components/table/Tr";
import { patientArr } from "../../utils";

export default function Appointment() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabArr: string[] = ["NEW APPOINTMENTS", "COMPLETED APPOINTMENTS"];
  return (
    <div className="w-[80%] ml-[20%] pb-12">
      <div className=" rounded-lg shadow-[rgba(17,17,26,0.1)0px_1px_0px] bg-white">
        <div className="pt-9 flex justify-between items-center pb-2 border-b border-[#CFCFCF] pr-9">
          <Tab
            data={tabArr}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <button className="bg-blue-1 p-2 flex justify-start text-xs gap-3 items-center rounded-lg text-white hover:scale-105 transition-all">
            <AiOutlinePlus size="20" /> New Appointment
          </button>
        </div>

        <div className="pt-8 px-9 flex justify-start gap-10 items-center">
          <div>
            <input
              type="search"
              className="w-[14rem] bg-[#EBF5FF] py-2 px-3 rounded-xl placeholder:text-xs"
              placeholder="Search"
              name=""
              id=""
            />
          </div>

          <button className="w-[14rem] text-xs px-6 py-2 border text-text-2 rounded-xl flex justify-between items-center border-blue-1">
            Filter by Date{" "}
            <BiCalendar size="20" color="rgba(52, 151, 249, 1)" />
          </button>
        </div>

        <div className="py-9 w-full mt-6">
          <table className="w-full">
            <thead>
              <tr className="h-12 text-[#242222] text-xs">
                <th>Time</th>
                <th>Date</th>
                <th>Patient Name</th>
                <th>Patient Age</th>
                <th>Doctor</th>
                {
                  activeTab === 1 &&(
                    <th>Fee Status</th>
                  )
                }
                <th>User Action</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {patientArr.map((patient, index) => (
                <Tr patient={patient} index={index} activeTab={activeTab}/>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
