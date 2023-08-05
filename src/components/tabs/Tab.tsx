interface TabProps{
  data: string[]
  setActiveTab: React.Dispatch<React.SetStateAction<number>>
  activeTab: number
}
export default function Tab({data,activeTab,setActiveTab}:TabProps) {

  return (
    <div className="flex relative px-9 justify-start gap-4 items-center">
        {
          data.map((data,_)=>(
            <p key={_} className={`${activeTab === _ ? "text-[#242222]" : "text-[#808080]"} pb-2 text-sm cursor-pointer`} onClick={()=>setActiveTab(_)}>
              {data}
            </p>
          ))
        }
        <div className={`${activeTab === 0 ? "left-9 w-40" : "left-[45%] w-56"} border-b  border absolute left-9 bottom-0 border-blue-1 transition-all`}>

        </div>
    </div>
  )
}
