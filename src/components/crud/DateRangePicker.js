import React,{ useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

function DateRangeField({setOpen}){
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const meSelect = (item) => {

    setState([item.selection])
    setOpen(false)
  }

  return(
      <DateRangePicker
        onChange={item => meSelect(item)}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={state}
        direction="horizontal"
      />
    )
  }

export default DateRangeField;