/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { BsCalendarPlus } from 'react-icons/bs';

interface DateSelectProps {
    className?: string,
    onChange?: (e: Date | null) => any,
    placeholderText?: string,
    selected? : Date | null,
    minDate? : Date,
    style?: React.CSSProperties,
    disbaled? : boolean,
    nullValuePlaceHolder? : string
}
export default function DateSelect(
    {
        className="",
        onChange,
        placeholderText,
        selected,
        minDate,
        style,
        disbaled=false,
        nullValuePlaceHolder=""
    }: DateSelectProps
) {
    const CustomInput = React.forwardRef(({value, onClick, onChange} : any, ref : any) => {
        return <div onClick={onClick}
                className={"flex item-center cursor-pointer items-center border border-transparent  " + className + (disbaled ? " opacity-80" : ' hover:border-[#B0BACA]')} style={style}  >
            <BsCalendarPlus variant='Bold' size="20" className='mr-2 text-blue-1 -ml-1'/>
            <input 
                className='disabled:cursor-not-allowed focus:outline-none text-sm w-full placeholder:text-blue-11 text-blue-11 bg-transparent'
                value={value ? value : nullValuePlaceHolder}
                onChange={onChange}
                placeholder={placeholderText}
                ref={ref}
                // disabled={disbaled}
            />
        </div>
    })
    return <div>
        <DatePicker
            onChange={(e) => onChange && onChange(e)}
            customInput={<CustomInput />}
            selected={selected}
            minDate={minDate}
            // disabled={disbaled}
        />
    </div>
}