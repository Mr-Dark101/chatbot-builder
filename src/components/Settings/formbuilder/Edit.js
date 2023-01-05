import React, { useState, useEffect } from 'react';
import { MenuItem, Select } from '@mui/material';
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
   const [headerField, setHeaderField] = useState(JSON.parse(rs.form_data));

   const [optionField, setOptionField] = useState({ key: '', value: '' });
   useEffect(() => {
      // retrieveMasterList('insurance');
      // retrieveMasterList('insurance_type');
   }, []);

   const addField = (param) => {
      setHeaderField([...headerField, {}]);
   };

   const removeField = (i, label) => {
      setHeaderField(headerField.filter((d) => d.label !== label));
   };
   const removeFieldOption = (i, label, parentIndex) => {
      const list = [...headerField];
      const newArray = headerField[parentIndex]['option'].filter((d) => d.key !== label);

      list[parentIndex]['option'] = newArray;
      setHeaderField(list);
      //setHeaderField(headerField[parentIndex]['option'].filter((d) => d.key !== label))
      //console.log(headerField)
   };

   const removeFieldRegular = (i, label, parentIndex) => {
      const list = [...headerField];
      const newArray = headerField[parentIndex]['regularexpression'].filter((d) => d.label !== label);

      list[parentIndex]['regularexpression'] = newArray;
      setHeaderField(list);
   };

   const addFieldOption = (index) => {
      const list = [...headerField];

      list[index]['option'].push({ key: '', value: '' });

      setHeaderField(list);
   };

   const typeList = [
      { value: 'text', label: 'Text' },
      { value: 'number', label: 'Number' },
      { value: 'option', label: 'Option' },
      { value: 'email', label: 'Email' },
      { value: 'cnic', label: 'CNIC' },
      { value: 'image', label: 'Image' },
      { value: 'video', label: 'Video' },
      { value: 'document', label: 'Document' },
      { value: 'regularexpression', label: 'Regular Expression' },
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
      form_data: rs.form_data,
      description: rs.description,
      receivers_emails: rs.receivers_emails,
      id: rs.id,
   });

   const FormSchema = Yup.object().shape({
      name: Yup.string().required('Required'),
   });

   const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
      console.log(JSON.stringify(headerField));
      values.form_data = JSON.stringify(headerField);

      CrudService.edit(values, 'form_builder', true).then(
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

      if (value == 'option') {
         list[index]['option'] = [{ key: '', value: '' }];
      } else {
         list[index]['option'] = [];
      }

      setHeaderField(list);
   };
   const handleInputChangeOption = (e, index, param, indexParent) => {
      const { name, value } = e.target;

      const list = [...headerField];
      list[indexParent]['option'][index][name] = value;

      setHeaderField(list);
   };

   const handleInputChangeRegular = (e, index, param, indexParent) => {
      const { name, value } = e.target;

      const list = [...headerField];
      list[indexParent]['regularexpression'][index][name] = value;

      setHeaderField(list);
   };

   return (
      <>
         <div class="row">
            <div class="col-12">
               <div class="page_data_clinic">
                  <div>
                     {!successful && (
                        <>
                           <Formik enableReinitialize validationSchema={FormSchema} initialValues={formData} onSubmit={onSubmit}>
                              {({ setFieldValue, setFieldTouched, values, errors, touched }) => (
                                 <Form className="av-tooltip tooltip-label-right">
                                    <div className="api_form_section" style={{ overflowY: 'scroll', height: 800 }}>
                                       <div className="row" style={{ marginLeft: '0px', marginRight: '0px' }}>
                                          <div className="col-9" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                             <div className="field_section mb-20">
                                                <TextField name="name" label="Form Name" placeholder="Provide a suitable name for your form." />
                                             </div>

                                             <div className="field_section mb-20">
                                                <TextAreaField name="description" label="Form Description" placeholder="Provide a description about the intended purpose of the form." rows="3" />
                                             </div>

                                             <Tooltip title={'Add customer form and provide name and type for each field. For certain field types you can also add multiple options for your users to choose from.'}>
                                                <label style={{ marginBottom: '0px' }}>Form Fields</label>
                                             </Tooltip>
                                             {headerField &&
                                                headerField.map((x, i) => {
                                                   return (
                                                      <>
                                                         <div style={{ border: '1px solid #ccc', margin: '10px 0px', padding: 10 }}>
                                                            <div className="row align-items-center">
                                                               <div className="col-sm-4">
                                                                  <TextField name="label" placeholder="Key" value={x.label} onChange={(e) => handleInputChange(e, i, 'phone')} />
                                                               </div>
                                                               <div className="col-sm-7">
                                                                  <Select
                                                                     labelId="demo-simple-select-standard-label"
                                                                     id="demo-simple-select-standard"
                                                                     value={x.type}
                                                                     className="platform_select_field"
                                                                     name="type"
                                                                     onChange={(e) => handleInputChange(e, i, 'phone')}
                                                                  >
                                                                     {typeList?.map((tr) => {
                                                                        return <MenuItem value={tr.value}>{tr.label}</MenuItem>;
                                                                     })}
                                                                  </Select>
                                                               </div>
                                                               <div className="col-sm-1 text-center">
                                                                  <a href="javascript:void(0)" className="link_delete_icon btn btn-icon btn-icon rounded-circle btn-danger" onClick={() => removeField(i, x.label)}>
                                                                     <i className="fa fa-trash"></i>
                                                                  </a>
                                                               </div>
                                                            </div>
                                                            {x.type == 'option' ? (
                                                               <>
                                                                  <div>Option Data</div>

                                                                  {headerField[i]['option'].map((o, io) => {
                                                                     return (
                                                                        <>
                                                                           <div className="row align-items-center">
                                                                              <div className="col-sm-4">
                                                                                 <TextField name="key" placeholder="Key" value={o.key} onChange={(e) => handleInputChangeOption(e, io, 'phone', i)} />
                                                                              </div>
                                                                              <div className="col-sm-7">
                                                                                 <TextField name="value" placeholder="Value" value={o.value} onChange={(e) => handleInputChangeOption(e, io, 'phone', i)} />
                                                                              </div>

                                                                              <div className="col-sm-1 text-center">
                                                                                 <a className="link_delete_icon btn btn-icon btn-icon rounded-circle btn-danger" href="javascript:void(0)" onClick={() => removeFieldOption(io, o.key, i)}>
                                                                                    <i className="fa fa-trash"></i>
                                                                                 </a>
                                                                              </div>
                                                                           </div>
                                                                        </>
                                                                     );
                                                                  })}

                                                                  <button type="button" className="primary btn-danger mt-20" onClick={() => addFieldOption(i)}>
                                                                     Add Option
                                                                  </button>
                                                               </>
                                                            ) : null}

                                                            {/* Adding Regular Expression */}
                                                            {x.type == 'regularexpression' ? (
                                                               <>
                                                                  <div style={{ marginTop: '20px' }}>Regular Expression</div>

                                                                  {headerField[i]['regularexpression'].map((o, io) => {
                                                                     return (
                                                                        <>
                                                                           <div className="row align-items-center">
                                                                              <div className="col-sm-11">
                                                                                 <TextField name="value" placeholder="Reg([/hello/])" value={o.value} onChange={(e) => handleInputChangeRegular(e, io, 'phone', i)} style={{ marginTop: '-10px' }} />
                                                                              </div>
                                                                              <div className="col-sm-1 text-center">
                                                                                 <a className="link_delete_icon btn btn-icon btn-icon rounded-circle btn-danger" href="javascript:void(0)" onClick={() => removeFieldRegular(io, o.key, i)}>
                                                                                    <i className="fa fa-trash"></i>
                                                                                 </a>
                                                                              </div>
                                                                           </div>
                                                                        </>
                                                                     );
                                                                  })}
                                                               </>
                                                            ) : null}
                                                         </div>
                                                      </>
                                                   );
                                                })}
                                             <div className="mt-20 text-end">
                                                <Link className="btn primary" onClick={() => addField('email')}>
                                                   Add Fields
                                                </Link>
                                             </div>
                                             <label style={{ marginBottom: '10px' }}>On Form Submit</label>
                                             <p style={{ marginBottom: '20px' }}>
                                                You can automatically allow form data to be sent to one or more email addresses when a customer completes the form. For your security, consider using this feature with only trusted email addresses.
                                             </p>

                                             <label style={{ marginBottom: '0px' }}>Enter Email Addresses (Optional)</label>
                                             <div className="row align-items-center">
                                                <div className="col-sm-12 mt-3">
                                                   <TextAreaField name="receivers_emails" placeholder="john@companyname, peter@companyname.." rows="3" />
                                                </div>
                                             </div>
                                             <div className="mt-20 text-end">
                                                <SubmitButton title="Update" className="btn primary" />
                                                <button onClick={() => loadList()} className="btn secondary ms-20">
                                                   Cancel
                                                </button>
                                             </div>
                                          </div>

                                          <div className="col-3" style={{ paddingLeft: '0px', paddingRight: '0px' }}></div>
                                       </div>
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
