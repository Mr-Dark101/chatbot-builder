import React, { useState, useEffect,useRef } from 'react';

import { Form, TextField, SelectField, SubmitButton, CheckBoxField, TextGroupField, TextAreaField } from '../../crud/FormElements';
import * as Yup from 'yup';
import CrudService from '../../../services/crud.service';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import {toast } from 'react-toastify';
const BASE_URL = process.env.REACT_APP_BACKEND_URl;

const CreateImport = ({ retrieveList, loadList,closeModal }) => {
   const [validationSchema, setValidationSchema] = useState({});

   const [insuranceList, setInsuranceList] = useState([]);
   const [insuranceTypeList, setInsuranceTypeList] = useState([]);

   const [successful, setSuccessful] = useState(false);
   const [message, setMessage] = useState();
   const [headerField, setHeaderField] = useState([{ keyOther: '', valueOther: '' }]);


    const fileInputRef = useRef();


 const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
const [isSelected, setIsSelected] = useState(false)


   useEffect(() => {
      //retrieveMasterList('insurance');
      //retrieveMasterList('insurance_type');
   }, []);

  
  

   

   const [formData, setFormData] = useState({
     
   });

   const FormSchema = Yup.object().shape({
     
      
   });
   const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  const fileInputClicked = () => {
        fileInputRef.current.click();
    }

   const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {

      const formData = new FormData();
       formData.append('file', selectedFile);

      
      CrudService.register(formData, 'import', true).then(
         (response) => {
            //setModalValue('')
            //loadList();
            toast('Training data has been successfully uploaded!', { type: toast.TYPE.SUCCESS });
            retrieveList();

            setMessage(response.data.message);
            setSuccessful(true);
            closeModal()
            //retrieveList();
         },
         (error) => {
            const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            setMessage(resMessage);

            setSuccessful(false);
         }
      );
   };

   const handleInputChange = (e, index, param) => {
      const { name, value } = e.target;

      const list = [...headerField];
      list[index][name] = value;
      setHeaderField(list);
   };

   const downLoadTemplate = () => {
      document.location.href= BASE_URL + '/template.csv';
  }

   return (
      <>
         <div class="row">
            <div class="col-12">
               <div>
                  <div className="" >
                     {!successful && (
                        <Form enableReinitialize validationSchema={FormSchema} initialValues={formData} onSubmit={onSubmit}>
                          
                           <div>
                              <a  href="#" onClick={() => downLoadTemplate()} style={{color: '#000000'}}>Download sample CSV file</a>
                           </div>
                           <div className="row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                              <div className="col-9" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                 <div className="field_section">
                                    


                                    <div className="drop-container"
                  
                   
                >
                    <div className="drop-message">
                       
                        <a href="#">Data File</a>
                    </div>
                    <input type="file" 
                    ref={fileInputRef}
                    className="file-input" name="file" onChange={changeHandler} />
                   
                </div>
                <div className="file-display-container">
                    
                </div>


                                 </div>

                               

                                 

                                

                                
                                

                                

                                
                              </div>

                              <div className="col-3" style={{ paddingLeft: '0px', paddingRight: '0px' }}></div>
                           </div>

                           <div>
                              <SubmitButton title="Upload" className="ant-btn ant-btn-primary" />

                              <button onClick={() => closeModal()} type="button" className="ant-btn ant-btn-default ms-10">
                                 Cancel
                              </button>
                           </div>
                        </Form>
                     )}
                     {message && (
                        <div className="form-group">
                           <div className={successful ? 'alert alert-success' : 'alert alert-danger'} role="alert">
                              {message}
                           </div>
                           <button type="button" className="btn primary" onClick={() => loadList()}>Back</button>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default CreateImport;
