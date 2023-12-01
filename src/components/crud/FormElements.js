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

import MySelectVersion from './MySelectVersion';
import MySwitch from './MySwitch';
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

export function SelectFieldNoLabel(props) {
    const { name, label, options,onChange,placeholder,customStyles } = props
    

    return (
        <>

        
      <br />

             <Field component={MySelect} name={name} placeholder={placeholder}  options={options}/>
      
            
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