import { useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { SelectOptions } from '../../types/interface'

interface SelectProps{
    selectArr:SelectOptions []
}
export default function Select({selectArr}: SelectProps) {


    const [showDropdown,setShowDropdown] = useState<boolean>(false)
    const [selectedOption,setSelectedOption] = useState<string>(selectArr[0].value)

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown)
    }

    const handleOptionSelection = (option:string) => {
        setSelectedOption(option)
        setShowDropdown(false)
        console.log(showDropdown)
    }
    console.log(showDropdown)
  return (
    <div className='w-[14rem] relative flex justify-between items-center border border-blue-1 p-2 rounded-xl' onClick={toggleDropdown} tabIndex={0} onBlur={()=>setShowDropdown(false)}>
        <p className='text-xs text-text-1'>{selectedOption}</p>
        <BsChevronDown/>
        <div className={`${showDropdown ? "block" : "hidden"} shadow-[rgba(0, 0, 0, 0.02)0px_1px_3px_0px,_rgba(27,31,35,0.15)0px_0px_0px_1px;] bg-white absolute left-0 top-10 border z-10 w-full `}>
            {
                selectArr.map((select,index)=>(
                    <p key={index} className={`${selectedOption === select.value ? "bg-blue-1 text-white":""} p-4 hover:bg-[#f3f1f1] text-xs cursor-pointer`} onClick={()=>handleOptionSelection(select.value)}>{select.label}</p>
                ))
            }
        </div>
    </div>
  )
}
