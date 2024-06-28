import React,{useEffect} from 'react';
import Select from 'react-select';
import {useField} from 'formik';

function SelectField(props) {
  const [field, state, {setValue, setTouched}] = useField(props.field.name);

  const onChange = ({value}) => {
    setValue(value);
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
    }),

    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      return { ...provided, opacity, transition };
    }
  }

  // Modify the options to disable the first one
  const modifiedOptions = props.options.map((option, index) => ({
    ...option,
    isDisabled: (option && option.isDisabled)? true : false,
  }));

  return (
    <>
      <Select {...props}  
        defaultValue={props.options.find((option) => option.value === field.value)}
        value={props.options.find((option) => option.value === field.value)}
        placeholder={'Select'}
        classNamePrefix={'react-select'}
        onChange={onChange} onBlur={setTouched}
      />
    </>
  );
}

export default SelectField;