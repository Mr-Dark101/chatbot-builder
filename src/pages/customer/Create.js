import React, { useState, useEffect } from "react";
import CustomerDataService from "../../services/customer.service";
import { Form, TextField, SelectField, SubmitButton } from '../../components/crud/FormElements';
import * as Yup from 'yup';
import CrudService from "../../services/crud.service";

const Create = ({getPage}) => {

 


  const [cityList, setCityList] = useState([]);
const [stateList, setStateList] = useState([]);
const [specialityList, setSpecialityList] = useState([]);

const [message, setMessage] = useState("");




const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    url: "",
    
    
  });

const FormSchema = Yup.object().shape({
    name: Yup.string()
          .required('Required'),
    
    email: Yup.string()
        .required('Required'),
        


    phone: Yup.string()
        .required('Required'),
       

    url: Yup.string()
        .required('Required'),
        

    
        
   
});



  
  

    

    const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
       
        CustomerDataService.register(values).then(
        (response) => {
       
          getPage('list');
          
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

  
 

  return (
    <>
    <div className="content-header">
      <div className="d-flex align-items-center">
        <div className="me-auto">
          <h3 className="h1">Add New Customer</h3>
          
        </div>
        
      </div>
    </div>

    <section className="content">
      <div className="row">       
        <div className="col-12">
          <div className="box">
          <div className="box-body">
            {message}
             
            <Form
            enableReinitialize
            validationSchema={FormSchema}
            initialValues={formData}
            onSubmit={onSubmit}
          >

            <div className="row">

                <div className="col-sm-6">
                    <div className="field_section">
                        <TextField 
                          name="name"
                          label="Name"
                        />
                    </div>

                   
                    
                    <TextField 
                                  name="email"
                                  placeholder="Email"
                                  label="Email"
                        />

                        <TextField 
                                  name="phone"
                                  placeholder="Phone"
                                  label="Phone"
                        />


                        <TextField 
                                  name="url"
                                  placeholder="Url"
                                  label="Url"
                        />

                   
                    <SubmitButton
              title="Add Clinic and Continue"
              className="primary"
            />
                    
                </div>
              
            </div>
           

            

            
          </Form>    
          </div>
          
          </div>
        </div>
      </div>
    </section>

   
    </>
  );
};

export default Create;
