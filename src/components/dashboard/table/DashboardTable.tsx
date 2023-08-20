/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useSelector } from "react-redux";
import { PatientProps } from "../../../types/interface";

export default function DashboardTable() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabArr: string[] = ["PATIENT", "APPOINTMENS"];
  // const First_Last = (name: string) => {
  //   const words = name.split(" ");
  //   const FName = words.length > 0 && words[0][0];
  //   const LName = words.length > 1 && words[words.length - 1][0];
  //   const abrv = `${FName} ${LName}`;
  //   return abrv;
  // };

  const patient = useSelector((state:any)=>state.patient.patients)
  return (
    <div>
      <div className="flex p-2 pb-1 relative justify-start gap-8">
        {tabArr.map((tab, index) => (
          <p
            className={`${
              activeTab === index ? "text-blue-1" : "text-[#808080]"
            } cursor-pointer text-xs`}
            key={index}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </p>
        ))}
        <div
          className={`${
            activeTab === 0 ? "left-2 w-[10%]" : "left-[13%] w-[16%]"
          } transition-all bottom-0 border-b border-blue-1 absolute`}
        ></div>
      </div>

      <div className="p-5">
        <table className="w-full">
          <thead>
            <tr className="h-12 text-[#242222] text-xs">
              <th>Time</th>
              <th>Date</th>
              <th>Patient Name</th>
              <th>Doctor</th>
              {activeTab === 1 && <th>Fee Status</th>}
            </tr>
          </thead>
          <tbody className="w-full">
            {patient.map((patient:PatientProps, index:number) => (
              <tr
                className="h-12 text-[#595959] text-xs w-full border-t border-b border-[#CFCFCF]"
                key={index}
              >
                <td className="text-center">{patient.createdAt}</td>
                <td className="text-center">{patient.createdAt}</td>
                <td className="text-center">
                  <div className="w-40 mx-auto flex justify-start gap-3 items-center">
                    <div className="w-8 h-8 rounded-full">
                        <div
                          className={`w-full h-full rounded-full bg-[#538CFF] flex justify-center items-center text-white`}
                        >
                          {patient.patientName}
                        </div>
                    </div>
                    {patient.patientName}
                  </div>
                </td>
                <td className="text-center">{patient.patientName}</td>
                {activeTab === 1 && (
                  <td
                    className={`${
                      patient.fee_status ? "text-[#27AE60]" : "text-[#FF6558]"
                    } text-center`}
                  >
                    {patient.fee_status ? "Paid" : "UnPaid"}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
