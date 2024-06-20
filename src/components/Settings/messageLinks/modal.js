import React, { useState, useEffect,useRef } from 'react';

import { Form, TextField, SelectField, SubmitButton, CheckBoxField, TextGroupField, TextAreaField } from '../../crud/FormElements';
import * as Yup from 'yup';
import CrudService from '../../../services/crud.service';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import {toast } from 'react-toastify';
const BASE_URL = process.env.REACT_APP_BACKEND_URl;

const LinkModal = ({ retrieveList, loadList,closeModal }) => {
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
      document.location.href= BASE_URL + '/sampletrainingdata.csv';
  }

   return (
      <>
         <div class="row">
            <div class="col-12 px-3 py-0">
               <div>
                  <div className="" >
                     {!successful && (
                        <Form enableReinitialize validationSchema={FormSchema} initialValues={formData} onSubmit={onSubmit}>
                          
                           <div className="row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                              <div className="col-12" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                <div className="field_section">
                                    <label>Message</label>
                                    <span className='fw-normal'>This keyword is to be pre-populated, and cannot be edited.</span>
                                    <TextAreaField name="description" label="" value="Complaint" placeholder="" rows="3" disabled />
                                </div>
                              </div>

                              <div className="col-3" style={{ paddingLeft: '0px', paddingRight: '0px' }}></div>
                           </div>

                           <div className='d-flex justify-content-end'>
                              <button onClick={() => closeModal()} type="button" className="secondary btn-right">
                                 Cancel
                              </button><br />
                              <SubmitButton title="Create" className="primary" />

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

export default LinkModal;
