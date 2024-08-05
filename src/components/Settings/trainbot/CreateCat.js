import React, { useState, useEffect } from 'react';

import { Form, TextFieldModal } from '../../crud/FormElements';
import * as Yup from 'yup';
import CrudService from '../../../services/crud.service';
import { generateToast } from '../../../utils';
import Modal from 'react-bootstrap/Modal';
import { useFormikContext } from 'formik';

const CreateCat = ({ rs, retrieveList, loadList,closeModal, visible, modalTitle, onHide }) => {
   const [validationSchema, setValidationSchema] = useState({});

   const [insuranceList, setInsuranceList] = useState([]);
   const [insuranceTypeList, setInsuranceTypeList] = useState([]);

   const [successful, setSuccessful] = useState(false);
   const [message, setMessage] = useState();
   const [headerField, setHeaderField] = useState([{ keyOther: '', valueOther: '' }]);
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
      name: '',
      
   });

   const FormSchema = Yup.object().shape({
      name: Yup.string().required('Required'),
      
   });

   const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
      values.header = JSON.stringify(headerField);
      CrudService.register(values, 'gptcat', true).then(
         (response) => {
            //setModalValue('')
            loadList();
            closeModal()
            setMessage(response.data.message);

            generateToast('Category data been created', 'Success!');
            setSuccessful(true);
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

   return (
      <>
      <Modal
         onHide={onHide}
         show={visible}
         size="md"
         aria-labelledby="contained-modal-title-vcenter"
         centered
      > 
          <div class="modal-content modalBorderRadius">

              <div className="modal-header bg-white modalBorderRadius" style={{padding: "0.5rem 1rem"}}>
                  <h4 className="modal-title ">{modalTitle}</h4>
                  <button type="button" className="close createuser-close text-dark mr-0 pt-25 shadow-none font-weight-light" onClick={closeModal}>&times;</button>
              </div>
              <div className="modalBorderSpacer mx-2"></div>
              <div className="modal-body">
                  <div className="" >
                     {!successful && (
                        <Form enableReinitialize validationSchema={FormSchema} initialValues={formData} onSubmit={onSubmit}>
                           <div className="field_section">
                              <TextFieldModal name="name" icon="check-square" placeholder="Category Name" />
                           </div>

                           <div>
                              <div className="modal-footer p-0 pt-3">
                                 <button type="button" className="btn-sm border border-primary customfontWeight bg-white rounded-pill" onClick={closeModal}>Cancel</button>
                                 <SubmitButtonModal title="create" className="ant-btn-primary btn-sm border border-primary customfontWeight rounded-pill" />
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

export default CreateCat;
