/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { BiCalendar } from 'react-icons/bi';

interface DateSelectProps {
    className?: string,
    onChange?: (e: Date | null) => any,
    placeholderText?: string,
    selected? : Date | null,
    minDate? : Date,
    maxDate? : Date,
    style?: React.CSSProperties,
    disbaled? : boolean,
    nullValuePlaceHolder? : string
    type:string;
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
        nullValuePlaceHolder="",
        type,
        maxDate
    }: DateSelectProps
) {
    const CustomInput = React.forwardRef(({value, onClick, onChange} : any, ref : any) => {
        return <div onClick={onClick}
                className={`flex ${type === "form" ? "flex" : "flex-row-reverse"} item-center cursor-pointer items-center border  ` + className + (disbaled ? " opacity-80" : '')} style={style}  >
            <BiCalendar variant='Bold' size="20" className='mr-2 text-blue-1 -ml-1'/>
            <input 
                className='disabled:cursor-not-allowed focus:outline-none text-xs w-full placeholder:text-blue-11 text-blue-11 bg-transparent'
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
            maxDate={maxDate}
            // disabled={disbaled}
        />
    </div>
}