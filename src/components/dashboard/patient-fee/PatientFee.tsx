import { patientArr } from "../../../utils";

export default function PatientFee() {
  const First_Last = (name: string) => {
    const words = name.split(" ");
    const FName = words.length > 0 && words[0][0];
    const LName = words.length > 1 && words[words.length - 1][0];
    const abrv = `${FName} ${LName}`;
    return abrv;
  };

  const pendingPayment = patientArr.filter((patient) => patient.fee_status === false)
  console.log(pendingPayment)
  return (
    <div className="p-5">
      <p className="text-sm text-[#242222]">Patient Fee</p>

      <div>
        {pendingPayment.map((patient, index) => (
          <div className="flex my-7" key={index}>
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
              <div>
                <p className="text-[#595959] text-xs font-medium">{patient.name}</p>
                <p className="text-[10px] text-red-500">{!patient.fee_status && "Doctor fee pending"}</p>
                </div>
            </div>

            <button className="p-2 text-xs text-white rounded-lg bg-blue-1 hover:scale-105 transition-all">
              Request Fee
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
