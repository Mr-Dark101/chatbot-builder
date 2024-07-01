import React, { useState, useEffect } from "react";
import { Form, TextField, SelectField, SubmitButton, TextPhoneField, TextFaxField, TextEmailField } from '../../../components/crud/FormElements';
import * as Yup from 'yup';
import ClinicDataService from "../../../services/clinic.service";
import CrudService from "../../../services/crud.service";
import { Link } from "react-router-dom";
import {toast } from 'react-toastify';
import { generateToast } from "../../../utils";
function ContactDetail({getPage,clinicRs}){

	const [message, setMessage] = useState("");
	
	const [cityList, setCityList] = useState([]);
const [stateList, setStateList] = useState([]);

let phoneData = '[]';
if(clinicRs.phone_other !== null){
  phoneData = clinicRs.phone_other;
}

let faxData = '[]';
if(clinicRs.fax_other !== null){
  faxData = clinicRs.fax_other;
}

let emailData = '[]';
if(clinicRs.email_other !== null){
  emailData = clinicRs.email_other;
}

const [phoneField, setPhoneField] = useState(JSON.parse(phoneData));
const [faxField, setFaxField] = useState(JSON.parse(faxData));
const [emailField, setEmailField] = useState(JSON.parse(emailData));




	const addField = (param) => {
		if(param === 'phone'){
			setPhoneField([...phoneField,{ phoneOther: "" }])
		}
		if(param === 'email'){
			setEmailField([...emailField,{ emailOther: "" }])
		}
		if(param === 'fax'){

			setFaxField([...faxField,{ faxOther: "" }])
		}
		
	}


const handleInputChange = (e, index,param) => {
	const { name, value } = e.target;
	if(param === 'phone'){
			const list = [...phoneField];
		    list[index][name] = value;
		    setPhoneField(list);
		}
		if(param === 'email'){
			const list = [...emailField];
		    list[index][name] = value;
		    setEmailField(list);
		}
		if(param === 'fax'){

			const list = [...faxField];
		    list[index][name] = value;
		    setFaxField(list);
		}
    
    
 };


	const [formData, setFormData] = useState({
    id:clinicRs.id,
    address_1: clinicRs.address_1,
    address_2: clinicRs.address_2,
    post_code: clinicRs.post_code,
    phone: clinicRs.phone,
    fax: clinicRs.fax,
   
    city_id: clinicRs.city_id,
    state_id: clinicRs.state_id,
    email: clinicRs.email,
    phone_other:'',
    fax_other:'',
    email_other:'',
    
  });


useEffect(() => {
   
    
    
     retrieveCityList();
    retrieveStateList();
  }, []);


  const retrieveStateList = () => {
    CrudService.getAll('master/state')
      .then(response => {
        setStateList(response.data);
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  

const retrieveCityList = () => {
    CrudService.getAll('master/city')
      .then(response => {
        setCityList(response.data);
        
      })
      .catch(e => {
        console.log(e);
      });
  };


	const FormSchema = Yup.object().shape({
    

    address_1: Yup.string()
        .required('Required'),
        

    post_code: Yup.string()
        .required('Required'),
        

    phone: Yup.string()
        .required('Required'),
       

    email: Yup.string().email()
        .required('Required'),
        

    city_id: Yup.string()
        .required('Required'),
        

    state_id: Yup.string()
        .required('Required'),

    
        
   
});

	const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
		
		values.phone_other = JSON.stringify(phoneField);
		values.fax_other = JSON.stringify(faxField);
		values.email_other = JSON.stringify(emailField);
		console.log(values)
        ClinicDataService.edit(values).then(
        (response) => {
       		setSubmitting(true);
          generateToast("Record has been updated!", 'Success!');
          //getPage('owner',response.data.message.id);
          
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            generateToast(resMessage, 'Failed!', false);
          //setMessage(<div className="text text-danger">{resMessage}</div>);
          setSubmitting(false);
        }
      );

        
    }


	return(
		<>
			<div className="page_data_clinic">
        <Form
          enableReinitialize
          validationSchema={FormSchema}
          initialValues={formData}
          onSubmit={onSubmit}
        >
		  	<div className="row">
			  	<div className="col-sm-7">
		  			

		  				<h3 className="page_heading">Contact Detail Information</h3>

              <div className="field_section">
                <label>Address</label>
                <TextField 
                  name="address_1"
                  placeholder="Address 1"
                  label=""
                />

                <TextField 
                  name="address_2"
                  placeholder="Address 1"
                  
                />

                <div className="row">
                   <div className="col-sm-4">
                     <br />
                     <SelectField 
                        name="city_id"
                        label=""
                        options={cityList}
                      />
                   </div>

                   <div className="col-sm-4">
                       <br />
                      <SelectField 
                        name="state_id"
                        label=""
                        options={stateList}
                      />
                   </div>
                   <div className="col-sm-4">
                      <TextField 
                        name="post_code"
                        placeholder="Post Code"
                      />
                   </div>


                </div>
              </div>

              <div className="field_section mt-30">
                <div className="row">
                  <div className="col-sm-6">
                    <label>Phone</label>
                    <TextPhoneField 
                      name="phone"
                      placeholder="Phone"
                      label=""
                    />
                  </div>

                  <div className="col-sm-6"></div>
                </div>

                {phoneField && phoneField.map((x, i) => {
                  return (
                    <div className="row media-center">
                      <div className="col-sm-6">
                        <div>
                          <TextPhoneField 
                            name="phoneOther"
                            placeholder="Phone"
                            type="text"
                            value={x.phoneOther}
                            onChange={e => handleInputChange(e, i,'phone')}
                          />       
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <Link>Delete</Link>
                      </div>
                    </div>
                  );
                })}
                <Link  onClick={() => addField('phone')}>Add Phone Number</Link>
              </div>

              <div className="field_section">
                <div className="row">
                  <div className="col-sm-6">
                    <TextFaxField 
                      name="fax"
                      type="text"
                      label=""
                    />
                  </div>

                  <div className="col-sm-6"></div>
                </div>

                {faxField && faxField.map((x, i) => {
                  return (
                    <div className="row media-center">
                      <div className="col-sm-6">             
                        <div>

                          <TextFaxField 
                            name="faxOther"
                            placeholder="Fax"
                        
                            value={x.faxOther}
                            onChange={e => handleInputChange(e, i,'fax')}
                          />
                        </div>   
                      </div>
                      <div className="col-sm-6">
                        <Link>Delete</Link>
                      </div>
                    </div>
                  );
                })}
                <Link  onClick={() => addField('fax')}>Add Fax Number</Link>
              </div>
          </div>
          <div className="col-sm-5"></div>
        </div>

        <div className="field_section">
          <div className="row">
            <div className="col-sm-7">
              <TextEmailField 
                name="email"
                type="text"
                label=""
              />
            </div>

            <div className="col-sm-5"></div>
          </div>

          {emailField && emailField.map((x, i) => {
            return (
              <div className="row media-center">
                <div className="col-sm-7">
                  <div>
                    <TextEmailField 
                      name="emailOther"
                      placeholder="Email"
                      
                      value={x.emailOther}
                      onChange={e => handleInputChange(e, i,'email')}
                    />   
                  </div>
                </div>

                <div className="col-sm-5">
                  <Link>Delete</Link>
                </div>
              </div>
            );
          })}
          <Link onClick={() => addField('email')}>Add E-Mail Address</Link>
        </div>
                        
        <div className="row">
          <div className="col-sm-7">
            <SubmitButton
              title="Update"
              className="primary"
            />
          </div>

          <div className="col-sm-5"></div>
        </div>		  			
			</Form>
  	</div>

								  				
						  	
		</>
	);
}

export default ContactDetail;