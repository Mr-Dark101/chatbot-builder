import React, { useState, useEffect } from 'react';

import { TextField, SelectField, SubmitButton, CheckBoxField, TextGroupField, TextAreaField, SwtichField } from '../../crud/FormElements';
import * as Yup from 'yup';
import CrudService from '../../../services/crud.service';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import { Formik, Form, Field, ErrorMessage, useFormikContext, useField, useFormik } from 'formik';

const Edit = ({ rs, retrieveList, loadList }) => {
   const [validationSchema, setValidationSchema] = useState({});

   const [insuranceList, setInsuranceList] = useState([]);
   const [insuranceTypeList, setInsuranceTypeList] = useState([]);

   const [successful, setSuccessful] = useState(false);
   const [message, setMessage] = useState();
   const [headerField, setHeaderField] = useState(JSON.parse(rs.header));
   useEffect(() => {
      // retrieveMasterList('insurance');
      // retrieveMasterList('insurance_type');
   }, []);

   const addField = (param) => {
      setHeaderField([...headerField, {}]);
   };
   const removeField = (i, label) => {
      setHeaderField(headerField.filter((d) => d.keyOther !== label));
   };
   const typeList = [
      { value: 'get', label: 'GET' },
      { value: 'post', label: 'POST' },
      { value: 'put', label: 'PUT' },
   ];

   const retrieveMasterList = (url) => {
      CrudService.ListValue('master/list-value?type=' + url)
         .then((response) => {
            if (url == 'insurance') {
               setInsuranceList(response.data);
            }

            if (url == 'insurance_type') {
               setInsuranceTypeList(response.data);
            }
         })
         .catch((e) => {
            console.log(e);
         });
   };

   const [formData, setFormData] = useState({
      name: rs.name,
      api_type: rs.api_type,
      description: rs.description,
      url: rs.url,
      header: rs.header,
      payload: rs.payload,
      id: rs.id,
   });

   const FormSchema = Yup.object().shape({
      name: Yup.string().required('Required'),
      api_type: Yup.string().required('Required'),
   });

   const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
      values.header = JSON.stringify(headerField);
      CrudService.edit(values, 'api_bot', true).then(
         (response) => {
            //setModalValue('')

            setMessage(response.data.message);
            setSuccessful(true);

            loadList();
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
         <div class="row">
            <div class="col-12">
               <div class="page_data_clinic api_form_section">
                  <div>
                     {!successful && (
                        <>
                           <Formik enableReinitialize validationSchema={FormSchema} initialValues={formData} onSubmit={onSubmit}>
                              {({ setFieldValue, setFieldTouched, values, errors, touched }) => (
                                 <Form className="av-tooltip tooltip-label-right" style={{ overflowY: 'scroll', height: '800px' }}>
                                    <div className="row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                                       <div className="col-9" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                          <div className="field_section">
                                             <TextField name="name" label="API Name" placeholder="Give your API a suitable name to accurately reflect the product or service it provides." />
                                          </div>

                                          <div className="field_section">
                                             <TextAreaField name="description" label="API Description" placeholder="Provide a brief description about the intended use of the API." rows="3" />
                                          </div>

                                          <Tooltip title={"Configure the type of API call you're looking to make - GET, POST,PUT."}>
                                             <div className="field_section" style={{ marginTop: '-20px' }}>
                                                <SelectField name="api_type" label="API Type" options={typeList} />
                                             </div>
                                          </Tooltip>

                                          <div className="field_section">
                                             <TextField name="url" label="API Endpoint URL" placeholder="Provide the endpoint URL here" />
                                          </div>

                                          <Tooltip title={'You can authorize your API in this field and also press any additional parameters as headers in this section.'}>
                                             <label style={{ marginBottom: '0px', fontWeight: '700px', fontFamily: 'Segoe UI Regular' }}>API Header</label>
                                          </Tooltip>
                                          {headerField &&
                                             headerField.map((x, i) => {
                                                return (
                                                   <div className="row align-items-center" style={{ marginTop: '-10px' }}>
                                                      <div className="col-sm-4">
                                                         <TextField name="keyOther" placeholder="Key" value={x.keyOther} onChange={(e) => handleInputChange(e, i, 'phone')} />
                                                      </div>
                                                      <div className="col-sm-7">
                                                         <TextField name="valueOther" placeholder="Value" value={x.valueOther} onChange={(e) => handleInputChange(e, i, 'phone')} />
                                                      </div>

                                                      <div className="col-sm-1 text-center">
                                                         <a href="javascript:void(0)" className="link_delete_icon btn btn-icon btn-icon rounded-circle btn-danger mt-1" onClick={() => removeField(i, x.keyOther)}>
                                                            <i className="fa fa-trash"></i>
                                                         </a>
                                                      </div>
                                                   </div>
                                                );
                                             })}

                                          <button type="button" className="primary btn-danger mt-20" onClick={() => addField('email')}>
                                             Add
                                          </button>
                                          <br />
                                          <br />

                                          {values.api_type == 'post' ? (
                                             <div className="field_section mb-20">
                                                <TextAreaField
                                                   name="payload"
                                                   label="API Payload"
                                                   placeholder="Configure the API Payload in JSON. If there is a need for a dynamic parameter inside an API, you can insert a keyword here. For example, if you insert xparam then your bot will recognize it as a dynamic parameter."
                                                   rows="3"
                                                />
                                             </div>
                                          ) : null}
                                       </div>

                                       <div className="col-3" style={{ paddingLeft: '0px', paddingRight: '0px' }}></div>
                                    </div>

                                    <div className="mt-20">
                                       <SubmitButton title="Update" className="btn primary" />
                                       <button onClick={() => loadList()} className="btn secondary ms-20">
                                          Cancel
                                       </button>
                                    </div>
                                 </Form>
                              )}
                           </Formik>
                        </>
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
         </div>
      </>
   );
};

export default Edit;
