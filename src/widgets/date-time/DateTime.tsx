import { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { LiaTimesSolid } from "react-icons/lia";
import { BsCalendarWeekFill } from "react-icons/bs";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function DateTime() {
  const [value, setValue] = useState<Value>(new Date());
  console.log(value)
  return (
    <div className="rounded-lg px-2 py-3 shadow-[3px_3px_6px_0px_rgba(182,190,196,0.15),-1.5px_-1.5px_6px_0px_rgba(182,190,196,0.15)]">
      <DateTimePicker  minDate={new Date()} required autoFocus={false} className='text-blue-1 text-xs w-[48%]' clearIcon={<LiaTimesSolid className="text-blue-1" size={20}/>} onChange={setValue} value={value} calendarIcon={<BsCalendarWeekFill className="text-blue-1" size={20}/>}/>
    </div>
  );
}
