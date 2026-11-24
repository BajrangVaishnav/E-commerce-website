import React, { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

export default function ValueIncrementBtn({onValueChange}) {
  const [price,setPrice]=useState(650);
  const [value, setValue] = useState(1);

  const handleIncrement = () => {
    if(value<10){
      setValue(value + 1);
      setPrice(price*value);

    }
  }
  const handleDecrement = () => {
    if (value > 1) {
      setValue(value - 1);
    };
  };
  const handleInputChange = (e) => {
    const newValue = e.target.value;

    setValue(newValue);
    onValueChange(newValue); // Send the value to the parent
  };

  return (
    <div className="flex justify-center items-center p-0">
      <div className="border-[1.5px] border-black rounded w-[72px] h-11 grid grid-cols-2 items-center ">

        <input disabled type="text" name="" id="" value={String(value).padStart(2, '0') } 
        className="ps-2" onChange={handleInputChange} />

        <div className="flex flex-col items-center h-full p-[6px]">
          <button onClick={handleIncrement} className=" w-full flex justify-center ">
            <IoIosArrowUp />
          </button>
          <button onClick={handleDecrement} className=" w-full flex justify-center ">
            <IoIosArrowDown />
          </button>
        </div>
      </div>
    </div>
  );
}
