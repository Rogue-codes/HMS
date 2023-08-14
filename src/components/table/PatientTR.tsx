import { BsFillChatFill, BsInfo } from "react-icons/bs";
import { PatientProps } from "../../types/interface";
import {LiaTimesSolid} from 'react-icons/lia'

interface Patient {
  patient: PatientProps;
  index: number;
  handleChat?: (user: PatientProps) => void
}
export default function PatientTr({ patient, index, handleChat }: Patient) {
  const First_Last = (name: string) => {
    const words = name.split(" ");
    const FName = words.length > 0 && words[0][0];
    const LName = words.length > 1 && words[words.length - 1][0];
    const abrv = `${FName}${LName}`;
    return abrv;
  };

  return (
    <tr
      className="h-12 text-[#595959] text-xs w-full border-t border-b border-[#CFCFCF]"
      key={index}
    >
      <td className="text-center">
        <div className="w-40 mx-auto flex justify-start gap-3 items-center">
          <div className="w-8 h-8 rounded-full">
            {patient.img && <img src={patient.img} alt="" />}
            {!patient.img && (
              <div
                className={`w-full h-full rounded-full bg-[#538CFF] flex justify-center items-center text-white`}
              >
                {First_Last(patient.name)}
              </div>
            )}
          </div>
          {patient.name}
        </div>
      </td>
      <td className="text-center">{patient.age}</td>
      <td className="text-center">{patient.gender}</td>
      <td className="text-center">{patient.blood_group}</td>
      <td className="text-center">{patient.phone_number}</td>
      <td className="text-center">{patient.email}</td>
      <td>
        <div className="flex justify-around items-center">
            {handleChat && <div className="w-6 h-6 hover:scale-105 transition-all cursor-pointer border rounded-lg bg-blue-1 flex justify-center items-center" onClick={()=>handleChat(patient)}>
                <BsFillChatFill sizex="20" color="white"/>
            </div>}
            <div className="w-6 h-6 hover:scale-105 transition-all cursor-pointer border rounded-lg border-red-500 flex justify-center items-center">
                <LiaTimesSolid className="text-red-500"/>
            </div>
            <div className="w-6 h-6 hover:scale-105 transition-all cursor-pointer border rounded-lg text-blue-1 flex justify-center items-center border-blue-1">
                <BsInfo size="20" className="text-blue-1"/>
            </div>
        </div>
      </td>
    </tr>
  );
}
