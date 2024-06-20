import React, { useState, useEffect } from "react";
import ClinicDataService from "../../services/clinic.service";
import { Form, TextField, SelectField, SubmitButton } from '../../components/crud/FormElements';
import * as Yup from 'yup';
import CrudService from "../../services/crud.service";

const ClinicOwner = ({getPage,clinicRs}) => {

 


  const [packageList, setPackageList] = useState([]);



const [message, setMessage] = useState("");

useEffect(() => {
   
    
    retrievePackageList();
    
  }, []);


const retrievePackageList = () => {
    CrudService.getAll('master/package')
      .then(response => {
        setPackageList(response.data);
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  



const [formData, setFormData] = useState({
    subdomain: "",
    contact_person: "",
    contact_number: "",
    email: "",
    package_id: "",
    clinic_id: clinicRs.id,
    
  });

const FormSchema = Yup.object().shape({
    subdomain: Yup.string()
          .required('Required'),
    contact_person: Yup.string()
          .required('Required'),
    contact_number: Yup.string()
          .required('Required'),
          
    package_id: Yup.string()
        .required('Required'),
        
    email: Yup.string().email()
        .required('Required'),
        

        
   
});



  
  

    

    const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
       console.log(values);
       //return false;
        ClinicDataService.tenent(values).then(
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
          <h3 className="page-title">Add Clinic Owner {clinicRs.id}</h3>
          
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

                <div className="col-sm-8">

                    <TextField 
                      name="subdomain"
                      label="Sub Domain"
                    />


                    <TextField 
                      name="contact_person"
                      label="Contact Person"
                    />


                    <TextField 
                      name="contact_number"
                      label="Contact Number"
                    />


                    <TextField 
                      name="email"
                      label="Email Address"
                    />



                    
                    <SelectField 
                              name="package_id"
                              label="Package"
                              options={packageList}
                            />
                    

                             <SubmitButton
              title="Finish Clinic Setup"
              className="btn btn-primary  btn-sm"
            />

                </div>
                <div className="col-sm-4">
          <div className="content-wrapper clinic-wrapper">
              <div className="container-full">  
              <div className="content-header">
                <div className="d-flex align-items-center">
                  <div className="me-auto">
                    <h3 className="page-title">Clinic Details</h3>
                  </div>
            
                </div>
              </div>

                <div className="page_data_clinic_detail">
                  <div className="clinic_list_section">
                    <div className="row">
                      <div className="col-sm-7">
                        <p><b>Clinic Name:</b></p>
                      </div>

                      <div className="col-sm-5">
                        <p>{clinicRs.name}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="clinic_list_section">
                    <div className="row">
                      <div className="col-sm-7">
                        <p><b>Type:</b></p>
                      </div>

                      <div className="col-sm-5">
                        <p>{clinicRs.clinic_type}</p>
                      </div>
                    </div>
                  </div>

                  <div className="clinic_list_section">
                    <div className="row">
                      <div className="col-sm-7">
                        <p><b>Tax ID:</b></p>
                      </div>

                      <div className="col-sm-5">
                        <p>{clinicRs.tax_id}</p>
                      </div>
                    </div>
                  </div>

                  <div className="clinic_list_section">
                    <div className="row">
                      <div className="col-sm-7">
                        <p><b>MediCare ID (PTAN):</b></p>
                      </div>

                      <div className="col-sm-5">
                        <p>{clinicRs.medicare_id}</p>
                      </div>
                    </div>
                  </div>

                  <div className="clinic_list_section">
                    <div className="row">
                      <div className="col-sm-7">
                        <p><b>NPI:</b></p>
                      </div>

                      <div className="col-sm-5">
                        <p>{clinicRs.np_id}</p>
                      </div>
                    </div>
                  </div>

                  <div className="clinic_list_section">
                    <div className="row">
                      <div className="col-sm-7">
                        <p><b>DEA Number:</b></p>
                      </div>

                      <div className="col-sm-5">
                        <p>{clinicRs.dea_id}</p>
                      </div>
                    </div>
                  </div>

                  <div className="clinic_list_section">
                    <div className="row">
                      <div className="col-sm-7">
                        <p><b>Speciality:</b></p>
                      </div>

                      <div className="col-sm-5">
                        <p>{clinicRs.Speciality.name}</p>
                      </div>
                    </div>
                  </div>

                  <div className="clinic_list_section">
                    <div className="row">
                      <div className="col-sm-7">
                        <p><b>Address</b></p>
                      </div>

                      <div className="col-sm-5">
                        <p>{clinicRs.address_1}</p>
                        <p>{clinicRs.address_2}</p>
                        <p>{clinicRs.City.name}, {clinicRs.State.name}, {clinicRs.post_code}</p>
                      </div>
                    </div>
                  </div>

                  <div className="clinic_list_section">
                    <div className="row">
                      <div className="col-sm-7">
                        <p><b>Phone #</b></p>
                      </div>

                      <div className="col-sm-5">
                        <p>{clinicRs.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="clinic_list_section">
                    <div className="row">
                      <div className="col-sm-7">
                        <p><b>Fax #:</b></p>
                      </div>

                      <div className="col-sm-5">
                        <p>{clinicRs.fax}</p>
                      </div>
                    </div>
                  </div>

                  <div className="clinic_list_section">
                    <div className="row">
                      <div className="col-sm-7">
                        <p><b>E-Mail ID:</b></p>
                      </div>

                      <div className="col-sm-5">
                        <p>{clinicRs.email}</p>
                      </div>
                    </div>
                  </div>      
                </div>    
              </div>
          </div>
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

export default ClinicOwner;
