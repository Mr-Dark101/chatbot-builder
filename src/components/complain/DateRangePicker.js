import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'moment';
import 'daterangepicker/daterangepicker.css';
import 'daterangepicker';
import moment from 'moment';

const DateRangePicker = ({ onChange, initialStartDate, initialEndDate }) => {
  const pickerRef = useRef();

  useEffect(() => {
    const $picker = $(pickerRef.current);

    $picker.daterangepicker({
      opens: 'right',
      locale: {
        format: 'DD MMM, YYYY'
      },
      startDate: initialStartDate ? initialStartDate : moment().subtract(1, 'month').startOf('month'),
      endDate: initialEndDate ? initialEndDate : moment(),      
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      }
    }, function(start, end, label) {
      // Update input field value immediately
      $(pickerRef.current).val(`${start.format('DD MMM, YYYY')} - ${end.format('DD MMM, YYYY')}`);

      if (onChange) {
        onChange(start, end, label);
      }
    });

    if(initialStartDate && initialEndDate){
        // Set initial value for the input field
        $(pickerRef.current).val(`${initialStartDate.format('DD MMM, YYYY')} - ${initialEndDate.format('DD MMM, YYYY')}`);
    }

    // Cleanup on component unmount
    return () => {
      if ($picker.data('daterangepicker')) {
        $picker.data('daterangepicker').remove();
      }
    };
  }, [onChange, initialStartDate, initialEndDate]);

  return (
    <div className="datepicker-container">
      <i className="fa fa-calendar"></i>&nbsp;
      <input type="text" ref={pickerRef} />
      <span></span> <i className="fa fa-caret-down"></i>
    </div>
  );
};

export default DateRangePicker;
