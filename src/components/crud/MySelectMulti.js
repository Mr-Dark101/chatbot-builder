import React,{useEffect} from 'react';
import Select from 'react-select';
import {useField} from 'formik';

function SelectFieldMulti(props) {
  const [field, state, {setValue, setTouched}] = useField(props.field.name);

  // const onChange = ({value}) => {
  //   console.log(value)
  //   setValue(value);
  // };


  function onChange(option) {
        props.form.setFieldValue(
            props.field.name,
            option ? (option).map((item) => item.value) : [],
        );
    }

    const getValue = () => {
        if (props.options) {
            return  props.options.filter((option) => field.value.indexOf(option.value) >= 0)
                
        } else {
            return [];
        }
    };


  // useEffect(() => {

  //   setValue(props.field.value)

  // }, []);

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
  return (
    <>
    

    


    <Select {...props}  

    defaultValue={props.options.find((option) => option.value === field.value)}
    value={getValue()}
    isMulti
    placeholder={props.placeholder}
     classNamePrefix={'react-select'}
    onChange={onChange} onBlur={setTouched}/>
    </>
  );
}

export default SelectFieldMulti;