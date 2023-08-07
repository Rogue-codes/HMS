
export default function Activity() {
  return (
    <div className="w-full h-full rounded-lg">
      <div className="flex justify-between items-center">
        <p className="text-sm">Activity Overview</p>
        <p className="text-xs">Weekly</p>
      </div>
      <div className="grid mt-5 h-full grid-cols-2">
        <div className="text-[#374858] bg-[rgba(164,210,255,0.40)] flex flex-col justify-center gap-6 items-center w-[95%] rounded-lg h-[80%]">
          <p className="text-md font-bold">100</p>
          <p className="text-xs">Appointments</p>
        </div>

        <div className="bg-[rgba(164,255,189,0.40)] text-[#2D421E] flex flex-col justify-center gap-6 items-center border-black w-[95%] rounded-lg h-[80%]">
          <p className="text-md font-bold">50</p>
          <p className="text-xs">New Patients</p>
        </div>

        <div className="bg-[rgba(255,245,152,0.47)] text-[#242222] flex flex-col justify-center gap-6 items-center border-black w-[95%] rounded-lg h-[80%]">
          <p className="text-md font-bold">500</p>
          <p className="text-xs">Medicines Sold</p>
        </div>

        <div className="bg-[rgba(204,164,255,0.42)] text-[#4B4403] flex flex-col justify-center gap-6 items-center border-black w-[95%] rounded-lg h-[80%]">
          <p className="text-md font-bold">100</p>
          <p className="text-xs">Lab Tests</p>
        </div>
      </div>
    </div>
  );
}
