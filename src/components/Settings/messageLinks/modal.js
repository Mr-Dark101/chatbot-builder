import React, { useState, useEffect,useRef } from 'react';

import Modal from 'react-bootstrap/Modal';
import logo from "../../../assets/eocean-logo-half.png";

import { Form, TextField, SelectField, CheckBoxField, TextGroupField, TextAreaField } from '../../crud/FormElements';
import * as Yup from 'yup';
import CrudService from '../../../services/crud.service';
import { CircularProgress, Tooltip } from '@mui/material';
import { useFormikContext } from 'formik';

const BASE_URL = process.env.REACT_APP_BACKEND_URl;
const msg = "Complaint";



const LinkModal = ({ retrieveList, loadList,closeModal, data, loadLinkViewCls, modalTitle, show, onHide }) => {
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
      console.log("data:",data);
      if(data && data.length > 0){
         setShowLinKView(true);
         loadLinkViewCls();
         setResult(data[0]);
      }else {
         setShowLinKView(false);
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
  
  function SubmitButtonModal(props){
      const { title, ...rest } = props;
      const { isSubmitting } = useFormikContext();
      
      return (
         <>
            <button type="submit" className="btn-sm btn-primary customfontWeight border create-team-btn rounded-pill"  {...rest} disabled={isSubmitting}>
               {title}
            </button>	
         </>
      )
   }

   return (
      <>
      <Modal
         show={show}
         size="md"
         aria-labelledby="contained-modal-title-vcenter"
         centered
         className={`qr-view-modal ${showLinKView? 'qr-view' : ''}`}
      > 
          <div className="modal-content modalBorderRadius">

              <div className="modal-header bg-white modalBorderRadius" style={{padding: "0.5rem 1rem"}}>
                  <h4 className="modal-title ">{(showLinKView)? "Here is your WhatsApp help desk bot link" : modalTitle}</h4>
                  <button type="button" className="close createuser-close text-dark mr-0 pt-25 shadow-none font-weight-light" onClick={()=>{closeModal();setMessage("")}}>&times;</button>
              </div>
              <div className="modalBorderSpacer mx-2"></div>
              <div className="modal-body">
                  <div className="row">
                     <div className="col-12 px-3 py-0">
                        <div>
                           {
                              loader ?(<div className='h-200 d-flex justify-content-center align-items-center'>
                                 <CircularProgress />
                              </div> ) : <div className="" >
                                 {!showLinKView && (
                                    <Form enableReinitialize validationSchema={FormSchema} initialValues={formData} onSubmit={onSubmit}>
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


                                       <div className="modal-footer p-0 pt-3 mt-3">
                                          <button type="button" class="btn-sm border border-primary customfontWeight bg-white rounded-pill" onClick={closeModal}>Cancel</button>
                                          <SubmitButtonModal title="Create" className="ant-btn-primary btn-sm border border-primary customfontWeight rounded-pill" />
                                       </div>

                                    </Form>
                                 )}
                                 {showLinKView && (
                                    <div className="form-group">
                                       {/* <h4>Here is your WhatsApp help desk bot link</h4> */}
                                       <p className='fw-normal' style={{fontSize: '12px'}}>Copy and share it on your social media, websites, emails or<br/>
                                       anywhere you want to be connected instantly by your customers</p>
                                       <div className='qr-code-link'>
                                          <img src={logo} />
                                          <a href={result.WA_URL} target="_blank">{result.WA_URL}</a>
                                       </div>
                                       <div className='qr-code-image'>
                                          <img src={result.QR_IMAGE_URL} />
                                       </div>
                                       <div className="d-flex justify-content-between">
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
              </div>
          </div>
      
      </Modal>
      </>
   );
};

export default LinkModal;
