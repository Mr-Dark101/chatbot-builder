import React, { useState, useEffect,useRef } from 'react';

import Modal from 'react-bootstrap/Modal';
import { useFormikContext } from 'formik';
import { Form, SubmitButton} from '../../crud/FormElements';
import * as Yup from 'yup';
import CrudService from '../../../services/crud.service';
import { generateToast } from '../../../utils';
const BASE_URL = process.env.REACT_APP_BACKEND_URl;

const CreateImport = ({ retrieveList, loadList,closeModal, visible, modalTitle, onHide}) => {
   const [validationSchema, setValidationSchema] = useState({});

   const [insuranceList, setInsuranceList] = useState([]);
   const [insuranceTypeList, setInsuranceTypeList] = useState([]);

   const [successful, setSuccessful] = useState(false);
   const [message, setMessage] = useState("");
   const [headerField, setHeaderField] = useState([{ keyOther: '', valueOther: '' }]);
   const fileInputRef = useRef();

   const [selectedFile, setSelectedFile] = useState();
   const [isFilePicked, setIsFilePicked] = useState(false);
   const [isSelected, setIsSelected] = useState(false)


   useEffect(() => {
      //retrieveMasterList('insurance');
      //retrieveMasterList('insurance_type');
   }, []);

  
  
   function SubmitButtonModal(props){
      const { title, ...rest } = props;
      const { isSubmitting } = useFormikContext();
      
      return (
          <>
            <button type="submit" class="btn-sm btn-primary customfontWeight border create-team-btn rounded-pill"  {...rest} disabled={isSubmitting}>
               {title}
            </button>	
          </>
      )
  }

   

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

      debugger;
      CrudService.register(formData, 'import', true).then(
         (response) => {
            //setModalValue('')
            //loadList();
            
            generateToast('Training data has been successfully uploaded!', 'Success!');
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
      <Modal
         onHide={onHide}
         show={visible}
         size="md"
         aria-labelledby="contained-modal-title-vcenter"
         centered
      > 
          <div className="modal-content modalBorderRadius">

              <div className="modal-header bg-white modalBorderRadius" style={{padding: "0.5rem 1rem"}}>
                  <h4 className="modal-title ">{modalTitle}</h4>
                  <button type="button" className="close createuser-close text-dark mr-0 pt-25 shadow-none font-weight-light" onClick={()=>{closeModal();setMessage("")}}>&times;</button>
              </div>
              <div className="modalBorderSpacer mx-2"></div>
              <div className="modal-body">
                  <div className="" >
                     {!successful && (
                        <Form enableReinitialize validationSchema={FormSchema} initialValues={formData} onSubmit={onSubmit}>
                          
                        <div>
                           <a  href="#" onClick={() => downLoadTemplate()} style={{color: '#1890ff'}}>Download sample CSV file</a>
                        </div>
                        <div className="row pb-4" style={{ marginLeft: '0px', marginRight: '0px', marginBotton: '10px' }}>
                           <div className="col-9" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                              <div className="field_section">
                                 <div className="drop-container">
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
                              <div class="modal-footer p-0 pt-3">
                                 <button type="button" class="btn-sm border border-primary customfontWeight bg-white rounded-pill" onClick={()=>{closeModal();setMessage("")}}>Cancel</button>
                                 <SubmitButtonModal title="Create" className="ant-btn-primary btn-sm border border-primary customfontWeight rounded-pill" />
                              </div>
                           </div>
                     </Form>
                     )}
                     {message && (
                        <div className="form-group">
                           <div className={successful ? 'alert alert-success' : 'alert alert-danger'} role="alert">
                              {message}
                           </div>
                        </div>
                     )}
                  </div>
              </div>
          </div>
      
      </Modal>
      </>
   );
};

export default CreateImport;
