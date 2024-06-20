import React,{useEffect,useState} from 'react';
import Switch from 'react-input-switch';
import {useField} from 'formik';



function SwitchField(props) {
  const [field, state,{setValue, setTouched}] = useField(props.field.name);

  const myVal = (field.value === true  || field.value === 1) ? 1 : 0;
  
const [valuex, setValuex] = useState(myVal);


  const onChange = (value) => {
   
    setValuex(value);
    setValue(value)
  };

  


  return (
    <>
    

    

    <Switch  value={valuex}   onChange={onChange} name={field.name} id={field.name} 

styles={{
    container: {
    position: 'relative',
    display: 'inline-block',
    width: 60,
    height: 24,
    verticalAlign: 'middle',
    cursor: 'pointer',
    userSelect: 'none'
  },
  track: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 3,
    backgroundColor: '#cccccc'
  },
  button: {
    position: 'absolute',
    top: 2,
    bottom: 2,
    right: 26,
    left: 2,
   
    backgroundColor: '#fff',
    borderRadius: 3,
    transition: 'all 100ms ease'
  },
  buttonChecked: {
    right: 2,
    left: 26
  }
  }}

       />
    
    </>
  );
}

export default SwitchField;