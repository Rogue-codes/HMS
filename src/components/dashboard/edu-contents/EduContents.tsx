import { eduArr } from "../../../utils";

export default function EduContents() {
  return (
    <div className="p-4">
        <p className="text-[#242222] text-sm">Educational Content</p>
        <div>
            {
                eduArr.map((content,index)=>(
                    <div className="flex justify-between items-center py-2 my-4 border-b border-[#CFCFCF]" key={index}>
                        <div>
                            <img src={content.img} alt="" />
                        </div>
                        <div>
                            <p className="text-xs text-[#374957]">{content.name}</p>
                            <p className="text-[11px] text-[#808080]">{content.author}</p>
                        </div>
                        
                        <button className="bg-blue-1 text-xs hover:scale-105 transition-all text-white p-1 rounded-lg">Assign</button>
                    </div>
                ))
            }
        </div>
    </div>
  )
}
