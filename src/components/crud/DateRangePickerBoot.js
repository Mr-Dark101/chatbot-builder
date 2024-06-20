import React,{ useState } from 'react';
import DatePicker from "react-datepicker";
import {useField} from 'formik';
import "react-datepicker/dist/react-datepicker.css";

function DateRangeField(props){

  const [field, state, {setValue, setTouched}] = useField(props.field.name);

  const [startDate, setStartDate] = useState(new Date());

  const onChange = (value) => {
    console.log(value)
    setValue(value);
    setStartDate(value)
  };

  return(
    <>
      <DatePicker className="form-control" selected={startDate} 
      value={field.value}

      onChange={(date) => onChange(date)} />
      </>
    )
  }

export default DateRangeField;