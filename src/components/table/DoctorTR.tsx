import { BsInfo } from "react-icons/bs";
import { DoctorProps } from "../../types/interface";
import {LiaTimesSolid} from 'react-icons/lia'

interface Doctor {
  doctor: DoctorProps;
  index: number;
}
export default function DoctorTR({ doctor, index }: Doctor) {
  const First_Last = (name: string) => {
    const words = name.split(" ");
    const FName = words.length > 0 && words[0][0];
    const LName = words.length > 1 && words[words.length - 1][0];
    const abrv = `${FName} ${LName}`;
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
            {doctor.img && <img src={doctor.img} className="rounded-full object-cover w-full h-full" alt="" />}
            {!doctor.img && (
              <div
                className={`w-full h-full rounded-full bg-[#538CFF] flex justify-center items-center text-white`}
              >
                {First_Last(doctor.name)}
              </div>
            )}
          </div>
          {doctor.name}
        </div>
      </td>
      <td className="text-center">{doctor.level}</td>
      <td className="text-center">{doctor.gender}</td>
      <td className="text-center">{doctor.unit}</td>
      <td className="text-center">{doctor.phone_number}</td>
      <td className="text-center">{doctor.email}</td>
      <td>
        <div className="flex justify-around items-center">
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
