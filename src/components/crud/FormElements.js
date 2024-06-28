import React from 'react';
import {
    Formik,
    Form as FormikForm,
    Field,
    ErrorMessage,
    useFormikContext,
    useField,
    useFormik
} from 'formik';
import MyPhone from './MyPhone';
import MySelect from './MySelect';
import MySelectMulti from './MySelectMulti';
import DateRangePickerBoot from './DateRangePickerBoot';
import MySelectVersion from './MySelectVersion';
import MySwitch from './MySwitch';
import Select from 'react-select';
export function Form(props) {
    return (
        <Formik
            {...props}
        >
            <FormikForm className="needs-validation" noValidate="">
                {props.children}
            </FormikForm>
        </Formik>)
}


export function TextGroupField(props) {
    const { name, label, placeholder, icon, ...rest } = props
    return (
        <>
        
        <div class="form-group">
            {label && <label htmlFor={name}>{label}</label>}

            <div class="input-group">
                      <div class="input-group-addon">
                        <i class={icon}></i>
                      </div>

            <Field
                className="form-control"
                type="text"
                name={name}
                id={name}
                placeholder={placeholder || ""} 
                {...rest}
            />
            
            </div>
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />
        </div>
            
        </>
    )
}


export function DatePicker(props) {
    const { name, label,onChange,placeholder,customStyles } = props
    

    return (
        <>

        {label && <label htmlFor={name}>{label}</label>}
     

             <Field component={DateRangePickerBoot} name={name} placeholder={placeholder} />
      
            
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />

            
        </>
    )
}

export function TextAreaField(props) {
    const { rows,name, label, placeholder, ...rest } = props
    return (
        <>
        
            {label && <label htmlFor={name}>{label}</label>}
            <Field
                className="form-control"
                as="textarea"
                rows={rows}
                name={name}
                id={name}
                placeholder={placeholder || ""} 
                {...rest}
            />
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />

            
        </>
    )
}

export function TextFieldColor(props) {
    const { name, label, placeholder, ...rest } = props
    return (
        <>
        <br />
            {label && <label htmlFor={name}>{label}</label>}
            <Field
                
                type="text"
                name={name}
                id={name}
                placeholder={placeholder || ""} 
                {...rest}
                className="form-control my-colorpicker1"
            />
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />

            
        </>
    )
}


function CustomSelectField(props) {
    const [field, state, {setValue, setTouched}] = useField(props.field.name);
  
    const onChange = ({value}) => {
      setValue(value);
      props.onChange(value);
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
  export function CustomSelectFieldNoLabel(props) {
    const { name, label, options,onChange,placeholder,customStyles, value } = props
    
    const handleOnChange = (e) =>{
        console.log(e);
        onChange({
            label, name, value: e
        })
    }
    return (
        <>

        
      <br />

             <Field component={CustomSelectField} name={name} placeholder={placeholder}  options={options} 
             value ={value} onChange = {(e)=> handleOnChange(e)}/>
      
            
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />

            
        </>
    )
}
export function SelectFieldNoLabel(props) {
    const { name, label, options,onChange,placeholder,customStyles, value } = props
    

    return (
        <>

        
      <br />

             <Field component={MySelect} name={name} placeholder={placeholder}  options={options} 
             value ={value}/>
      
            
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />

            
        </>
    )
}

export function CheckBoxField(props) {
    const { name, label, placeholder, ...rest } = props
    return (
        <>
        
         <label htmlFor={name}>{label}</label>

         <br />
           <Field component={MySwitch} name={name}
                id={name}  /> 
           
           
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />

            
        </>
    )
}

export function TextField(props) {
    const { name, label, placeholder, ...rest } = props
    return (
        <>
            <br />
            {label && <label htmlFor={name}>{label}</label>}
            <Field
                className="form-control"
                type="text"
                name={name}
                id={name}
                placeholder={placeholder || ""} 
                {...rest}
            />
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />

            
        </>
    )
}

export function NumberField(props) {
    const { name, label, placeholder, ...rest } = props;
  
    return (
      <>
        <br />
        {label && <label htmlFor={name}>{label}</label>}
        <Field
          className="form-control"
          type="number"
          name={name}
          id={name}
          placeholder={placeholder || ""}
          {...rest}
        />
        <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
      </>
    );
  }
export function ButtonTextField(props) {
    const { name, label, placeholder, ...rest } = props
    return (
        <>
            <br />
            {label && <label htmlFor={name}>{label}</label>}
            <Field
                className="form-control"
                type="text"
                name={name}
                maxLength={20}
                id={name}
                placeholder={placeholder || ""} 
                {...rest}
            />
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />
        </>
    )
}

export function TitleTextField(props) {
    const { name, label, placeholder, ...rest } = props
    return (
        <>
            <br />
            {label && <label htmlFor={name}>{label}</label>}
            <Field
                className="form-control"
                type="text"
                name={name}
                maxLength={60}
                id={name}
                placeholder={placeholder || ""} 
                {...rest}
            />
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />
        </>
    )
}

export function ListTextField(props) {
    const { name, label, placeholder, ...rest } = props
    return (
        <>
            <br />
            {label && <label htmlFor={name}>{label}</label>}
            <Field
                className="form-control"
                type="text"
                name={name}
                maxLength={24}
                id={name}
                placeholder={placeholder || ""} 
                {...rest}
            />
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />
        </>
    )
}

export function TextFieldModal(props) {
    const { name, label, placeholder, ...rest } = props
    return (
        <>
            
            {label && <label htmlFor={name}>{label}</label>}
            <Field
                className="form-control"
                type="text"
                name={name}
                id={name}
                placeholder={placeholder || ""} 
                {...rest}
            />
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />

            
        </>
    )
}

export function TextPhoneField(props) {
    const { name, label, placeholder, ...rest } = props
    return (
        <>
        <br />
        <div class="form-group">
            {label && <label htmlFor={name}>{label}</label>}

            <div class="input-group">
                      <div class="input-group-addon">
                        <i class="fa fa-phone"></i>
                      </div>





             <Field component={MyPhone}  name={name}
                id={name}  /> 
           
            
            
                
               
            
            
            </div>
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />
        </div>
            
        </>
    )
}

export function TextFaxField(props) {
    const { name, label, placeholder, ...rest } = props
    return (
        <>
        <br />
        <div class="form-group">
            {label && <label htmlFor={name}>{label}</label>}

            <div class="input-group">
                      <div class="input-group-addon">
                        <i class="fa fa-fax"></i>
                      </div>

            <Field
                className="form-control"
                type="text"
                name={name}
                id={name}
                placeholder={placeholder || ""} 
                {...rest}
            />
            
            </div>
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />
        </div>
            
        </>
    )
}

export function TextEmailField(props) {
    const { name, label, placeholder, ...rest } = props
    return (
        <>
        <br />
        <div class="form-group">
            {label && <label htmlFor={name}>{label}</label>}

            <div class="input-group">
                      <div class="input-group-addon">
                        <i class="fa fa-envelope"></i>
                      </div>

            <Field
                className="form-control"
                type="text"
                name={name}
                id={name}
                placeholder={placeholder || ""} 
                {...rest}
            />
            
            </div>
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />
        </div>
            
        </>
    )
}

export function SelectField(props) {
    const { name, label, options,onChange,placeholder,customStyles } = props
     
     
    return (
        <>

        
       {label && <br />}

            {label && <label htmlFor={name}>{label} </label>}

             <Field component={MySelect} name={name} placeholder={placeholder}  options={options}/>
      
            
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />

            
        </>
    )
}


export function SelectFieldMulti(props) {
    const { name, label, options,onChange,placeholder,customStyles } = props
     

    return (
        <>

        
       {label && <br />}

            {label && <label htmlFor={name}>{label} </label>}

             <Field component={MySelectMulti} name={name} placeholder={placeholder}  options={options}/>
      
            
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />

            
        </>
    )
}


export function SelectFieldVersion(props) {
    const { name, label, options,onChange,placeholder,customStyles,customChange } = props
     

    return (
        <>

        
       {label && <br />}

            {label && <label htmlFor={name}>{label} </label>}

             <Field component={MySelectVersion} customChange={customChange} name={name} placeholder={placeholder}  options={options}/>
      
            
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />

            
        </>
    )
}

export function SubmitButtonModal(props){
    const { title, ...rest } = props;
    const { isSubmitting } = useFormikContext();
    
    return (
        <>
        
        <button type="submit" {...rest} disabled={isSubmitting}>{title}</button>
        </>
    )
}
export function SubmitButton(props){
    const { title, ...rest } = props;
    const { isSubmitting } = useFormikContext();
    
    return (
        <>
        <br />
        <button type="submit" {...rest} disabled={isSubmitting}>{title}</button>
        </>
    )
}