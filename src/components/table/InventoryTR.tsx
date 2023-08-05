import { BsFillTrashFill } from "react-icons/bs";
import { DrugProps } from "../../types/interface";
import { BiSolidNotepad } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

interface Doctor {
  item: DrugProps;
  index: number;
}
export default function InventoryTR({ item, index }: Doctor) {
  return (
    <tr
      className="h-12 text-[#595959] text-xs w-full border-t border-b border-[#CFCFCF]"
      key={index}
    >
      <td className="text-center">{item.product_name}</td>
      <td className="text-center">{item.type}</td>
      <td className="text-center">{item.price}</td>
      <td className="text-center">{item.in_stock}</td>
      <td className="text-center">{item.expiry_date}</td>
      <td className="text-center">{item.vendor}</td>
      <td>
        <div className="flex justify-around items-center">
          <div className="w-6 h-6 hover:scale-105 transition-all cursor-pointer border rounded-lg border-[#96999C] flex justify-center items-center">
            <BiSolidNotepad className="text-[#96999C]" />
          </div>

          <div className="w-6 h-6 hover:scale-105 transition-all cursor-pointer border rounded-lg border-blue-1 flex justify-center items-center">
            <AiOutlinePlus className="text-blue-1" />
          </div>
          <div className="w-6 h-6 hover:scale-105 transition-all cursor-pointer border rounded-lg text-red-500 flex justify-center items-center border-red-500">
            <BsFillTrashFill className="text-red-500" />
          </div>
        </div>
      </td>
    </tr>
  );
}
