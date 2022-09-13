import React,{useEffect,useState} from 'react';
import Switch from 'react-input-switch';
import {useField} from 'formik';
import MaskedInput from 'react-text-mask'


const phoneNumberMask = [
  "(",
  /[1-9]/,
  /\d/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  /\d/
];

function MyPhone(props) {
  const [field, state,onChange,value] = useField(props.field.name);

  const myVal = field.value;
  
const [valuex, setValuex] = useState(myVal);


  // const onChange = (value) => {
   
  //   setValuex(value);
  //   setValue(value)
  //  };




  return (
    <>
    

    

    <MaskedInput
      value={field.value}
      onChange={field.onChange}
      name={field.name} id={field.name}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
    />
    
    </>
  );
}

export default MyPhone;