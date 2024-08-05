import React, { useState, useEffect } from 'react';

import { Form, TextFieldModal } from '../../crud/FormElements';
import * as Yup from 'yup';
import CrudService from '../../../services/crud.service';
import { generateToast } from '../../../utils';
import Modal from 'react-bootstrap/Modal';
import { useFormikContext } from 'formik';

const EditCat = ({ rs, retrieveList, loadList,closeModal, visible, modalTitle, onHide }) => {
   const [validationSchema, setValidationSchema] = useState({});

   const [gptCatList, setGptCatList] = useState([]);
   const [insuranceTypeList, setInsuranceTypeList] = useState([]);

   const [successful, setSuccessful] = useState(false);
   const [message, setMessage] = useState();

   useEffect(() => {
      
   }, []);

   

   function SubmitButtonModal(props){
      const { title, ...rest } = props;
      const { isSubmitting } = useFormikContext();
      
      return (
          <>
            <button type="save" class="btn-sm btn-primary customfontWeight border create-team-btn rounded-pill"  {...rest} disabled={isSubmitting}>
               {title}
            </button>	
          </>
      )
  }

   const [formData, setFormData] = useState({
      name: rs.name,
     
      id: rs.id,
   });

   const FormSchema = Yup.object().shape({
      name: Yup.string().required('Required'),
     
   });

   const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
      
      CrudService.edit(values, 'gptcat', true).then(
         (response) => {
            //setModalValue('')
            generateToast('Category has been updated', 'Success!');

            setMessage(response.data.message);
            setSuccessful(true);

            loadList();
            closeModal();
         },
         (error) => {
            const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            setMessage(resMessage);
            setSuccessful(false);
         }
      );
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

               <div class="modal-header bg-white modalBorderRadius" style={{padding: "0.5rem 1rem"}}>
                     <h4 class="modal-title ">{modalTitle}</h4>
                     <button type="button" class="close createuser-close text-dark mr-0 pt-25 shadow-none font-weight-light" onClick={closeModal}>&times;</button>
               </div>
               <div class="modalBorderSpacer mx-2"></div>
               <div class="modal-body">
                     <div className="" >
                        {!successful && (
                           <Form enableReinitialize validationSchema={FormSchema} initialValues={formData} onSubmit={onSubmit}>
                              <div className="field_section">
                                 <TextFieldModal name="name" icon="check-square" placeholder="Category Name" />
                              </div>

                              <div>
                                 <div class="modal-footer p-0 pt-3">
                                    <button type="button" class="btn-sm border border-primary customfontWeight bg-white rounded-pill" onClick={closeModal}>Cancel</button>
                                    <SubmitButtonModal title="Save" className="ant-btn-primary btn-sm border border-primary customfontWeight rounded-pill" />
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

export default EditCat;
