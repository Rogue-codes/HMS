/* eslint-disable react-refresh/only-export-components */
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
    { name: "Paracetamol", value: 400, color: "#3497F9" },
    { name: "Antacid Tablets", value: 300, color: "#4EE578" },
    { name: "Vitamin Tablets", value: 300, color: "#A156FF" },
    { name: "others", value: 200, color: "#FFEE55" },
  ];

export default function PieChartBox(){
    return (
        <div className=" flex flex-col justify-between items-center">
          <div className="w-full">
            <ResponsiveContainer width="99%" height={200}>
              <PieChart>
                <Tooltip
                  contentStyle={{ background: "white", borderRadius: "5px" }}
                />
                <Pie
                  data={data}
                  innerRadius={"50%"}
                  outerRadius={"90%"}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="options">
            {data.map((item) => (
              <div className="option flex justify-start items-center gap-5 text-xs" key={item.name}>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      );
}
