import React, { useState, useEffect,useRef } from 'react';
import logo from "../../../assets/eocean-logo-half.png";

import { Form, TextField, SelectField, SubmitButton, CheckBoxField, TextGroupField, TextAreaField } from '../../crud/FormElements';
import * as Yup from 'yup';
import CrudService from '../../../services/crud.service';
import { Link } from 'react-router-dom';
import { CircularProgress, Tooltip } from '@mui/material';
import {toast } from 'react-toastify';
const BASE_URL = process.env.REACT_APP_BACKEND_URl;
const msg = "Complaint";



const LinkModal = ({ retrieveList, loadList,closeModal, data, loadLinkViewCls, modalRef }) => {
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
   const [showLinKView, setShowLinKView] = useState(false)
   const [result, setResult] = useState({})
   const [loader, setLoader] = useState(false)
   const [copied, setCopied] = useState(false);

   const [formData, setFormData] = useState({
   });
   const FormSchema = Yup.object().shape({
   });


   useEffect(() => {
      if(data && data.length){
         setShowLinKView(true);
         loadLinkViewCls();
         setResult(data[0]);
      }

   }, [data]);

   const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

   const fileInputClicked = () => {
      fileInputRef.current.click();
   }

   const copyLinkToClipBoard = (result) => {
      navigator.clipboard.writeText(result.WA_URL).then(() => {
        console.log('Code copied to clipboard!');
        setCopied(true);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
   }

   const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
      // setShowLinKView(true);
      setLoader(true);
      CrudService.createQrCode(msg)
      .then(
         (response) => {
            if(response.data.data){
               if (modalRef.current) {
                  // Add a class to the parent div
                  modalRef.current.classList.add('qr-view');
               }
               setShowLinKView(true);
               setResult(response.data.data);
               setLoader(false);
               loadLinkViewCls();
            }
         },
         (error) => {
            const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            setMessage(resMessage);
            setSuccessful(false);
            setLoader(false);
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
                  {
                     loader ?(<div className='h-200 d-flex justify-content-center align-items-center'>
                        <CircularProgress />
                     </div> ) : <div className="" >
                        {!showLinKView && (
                           <Form enableReinitialize validationSchema={FormSchema} initialValues={formData} onSubmit={onSubmit}>
                              <div className='close-modal-btn' onClick={() => closeModal()}>x</div>
                              <div>
                                 <h4>Create Link</h4>
                              </div>

                              <div className="row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                                 <div className="col-12" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                 <div className="field_section">
                                       <label>Message</label>
                                       <span className='fw-normal'>This keyword is to be pre-populated, and cannot be edited.</span>
                                       <TextAreaField className="complaint-field" style={{"overflow":"auto","resize":"none"}} name="description" label="" value={msg} placeholder="" rows="3" disabled />
                                 </div>
                                 </div>

                                 <div className="col-3" style={{ paddingLeft: '0px', paddingRight: '0px' }}></div>
                              </div>

                              <div className='mt-2 d-flex justify-content-end'>
                                 <button onClick={() => closeModal()} type="button" className="secondary btn-right">
                                    Cancel
                                 </button><br />
                                 <SubmitButton title="Create" className="primary" />

                              </div>
                           </Form>
                        )}
                        {showLinKView && (
                           <div className="form-group">
                              <div className='close-modal-btn' onClick={() => closeModal()}>x</div>
                              <h4>Here is your WhatsApp Help desk bot link</h4>
                              <p>Copy and share it on your social media, websites, emails or<br/>
                              anywhere you want to be connected instantly by your customers</p>
                              <div className='qr-code-link'>
                                 <img src={logo} />
                                 <a href={result.WA_URL} target="_blank">{result.WA_URL}</a>
                              </div>
                              <div className='qr-code-image'>
                                 <img src={result.QR_IMAGE_URL} />
                              </div>
                              <div class="d-flex justify-content-between">
                                 <button 
                                    type="button" 
                                    className="copy-btn" 
                                    style={{"width": "179.5px"}}
                                    onClick={() => copyLinkToClipBoard(result)}>
                                    {copied ? 'COPIED' : 'COPY TO CLIPBOARD'}
                                 </button>
                              
                                 <a href={result.QR_IMAGE_URL} download="QR_Code.png">
                                    <button type="button" className="btn primary">DOWNLOAD QR CODE</button>
                                 </a>
                              </div>
                           </div>
                        )}
                     </div>
                  }
               </div>
            </div>
         </div>
      </>
   );
};

export default LinkModal;
