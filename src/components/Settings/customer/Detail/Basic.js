import React, { useState, useEffect } from "react";
import { Form, TextField, SelectField, SubmitButton } from '../../../crud/FormElements';
import * as Yup from 'yup';
import CustomerDataService from "../../../../services/clinic.service";
import CrudService from "../../../../services/crud.service";
import {toast } from 'react-toastify';
import { generateToast } from "../../../../utils";
function Basic({getPage,clinicRs}){


	const [message, setMessage] = useState("");
	const [specialityList, setSpecialityList] = useState([]);
	const [formData, setFormData] = useState({
    name: clinicRs.name,
   
    phone: clinicRs.phone,
   
    email: clinicRs.email,
   
    id:clinicRs.id
    
  });


useEffect(() => {
   
    
    
    retrieveSpecialityList();
  }, []);


  const retrieveSpecialityList = () => {
    CrudService.getAll('master/speciality')
      .then(response => {
        setSpecialityList(response.data);
        
      })
      .catch(e => {
        console.log(e);
      });
  };


	const FormSchema = Yup.object().shape({
    name: Yup.string()
          .required('Required'),
    email: Yup.string()
          .required('Required'),
    phone: Yup.string()
          .required('Required'),
          
   
        
   
});

	const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
       
        CustomerDataService.edit(values).then(
        (response) => {
          generateToast("Record has been updated!", 'Success!');

          setSubmitting(false);
          //getPage('owner',response.data.message.id);
          
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(<div className="text text-danger">{resMessage}</div>);
          setSubmitting(false);
        }
      );
    }

	return(
		<>
			<div className="page_data_clinic">
							  	<div className="row">
								  	<div className="col-sm-7">
							  			<Form
								            enableReinitialize
								            validationSchema={FormSchema}
								            initialValues={formData}
								            onSubmit={onSubmit}
								          >

							  				<h3 className="page_heading">Basic Information</h3>

								  			
                        <div className="field_section">
                          <TextField 
                            name="name"
                            label="Name"
                          />


                           <TextField 
                            name="phone"
                            label="Phone"
                          />

                           <TextField 
                            name="email"
                            label="email"
                          />
                        </div>
								  			 
                        

                    


                    
                    


                
                    <SubmitButton
              title="Update"
              className="primary"
            />
							  			</Form>
								  	</div>

								  	<div className="col-sm-5"></div>
							  	</div>			
						  	</div>
		</>
	);
}

export default Basic;