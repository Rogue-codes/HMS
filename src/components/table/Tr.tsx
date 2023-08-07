import { PatientProps } from "../../types/interface";

interface Patient {
  patient: PatientProps;
  index: number;
  activeTab: number;
}
export default function Tr({ patient, index, activeTab }: Patient) {
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
      <td className="text-center">{patient.time}</td>
      <td className="text-center">{patient.date}</td>
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
      <td className="text-center">{patient.doctor}</td>
      {activeTab === 1 && (
        <td
          className={`${
            patient.fee_status ? "text-[#27AE60]" : "text-[#FF6558]"
          } text-center`}
        >
          {patient.fee_status ? "Paid" : "UnPaid"}
        </td>
      )}
      <td className="text-center text-blue-1">Reschedule</td>
    </tr>
  );
}
