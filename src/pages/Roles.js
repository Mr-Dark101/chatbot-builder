import React, { useState, useEffect } from "react";
import RolesDataService from "../services/roles.service";
import SetPermission from "../pages/SetPermission";
import RolesPermissionService from "../services/roles_permission.service";
import RoleDetail from './roles/RoleDetail'
import RoleSetting from './roles/RoleSetting'
import ModalPopup from "../components/common/modal/ModalPopup";
import ModalEdit from "../components/common/modal/ModalEdit";
import { useParams,Link } from "react-router-dom";


import * as Yup from 'yup';
import { Form, TextField, SelectField, SubmitButton } from '../components/crud/FormElements';
import CrudService from "../services/crud.service";

const formSchema = {
    name: {
        type: "text",
        label: "Name",
        required: true
    }
    
}

const Roles = ({serviceUrl}) => {
 
const [roleData, setRoleData] = useState([]);
const [permissionList, setPermissionList] = useState(false);
const [roleId, setRoleId] = useState('');
const [roleDetail, setRoleDetail] = useState('');
const [rsEditValue, setRsEditValue] = useState({});

const [formData, setFormData] = useState({});
  const [validationSchema, setValidationSchema] = useState({});
  
  const [successful, setSuccessful] = useState(false);

  const [message, setMessage] = useState();

  const [modal, setModal] = useState(false);
   const [editModal, setEditModal] = useState(false);


  useEffect(() => {
    retrieveRole();
    initForm(formSchema);
  }, [serviceUrl]);



  const retrieveRolePermission =   (roleId,roleName) => {
   
   
   
     RolesPermissionService.getAll(roleId)
      .then(response => {
        

          setPermissionList(renderContent(response.data,roleId,roleName));
        
      })
      .catch(e => {
        console.log(e);
      });

      // setPermissionList(renderContent('dd'));
  };

  const renderContent = (data,roleId,roleName) => {

    return (
      <SetPermission getRoleId={roleId} roleName={roleName} permissionListValue={data} />
    ) 
  }

  const closeModal = () => {
      setModal(false)
      setEditModal(false)
      setPermissionList(false)
  }

  const changeRole = (roleValue) => {
     setRoleDetail(<RoleDetail roleValue={roleValue} loadEdit={loadEdit} roleSettting={roleSettting} />)
  }

  const roleSettting = (role_id,name) => {
     setRoleDetail(<RoleSetting role_id={role_id} role_name={name}  />)
  }
  

  const retrieveRole = () => {
    RolesDataService.getAll()
      .then(response => {

        setRoleData(response.data);
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  const loadEdit = (rs) => {
      setRsEditValue(rs)
      setEditModal(true)
     
 }

  const initForm = async (formSchema) => {
        
       
        let _formData = {};
        let _validationSchema = {};

        for(var key of Object.keys(formSchema)){
            _formData[key] = "";

            if(formSchema[key].type === "text"){
                _validationSchema[key] = Yup.string();
            }else if(formSchema[key].type === "email"){
                _validationSchema[key] = Yup.string().email()
            }else if(formSchema[key].type === "select"){

                _validationSchema[key] = Yup.number().oneOf(formSchema[key].options.map(o => o.value));
            }

            if(formSchema[key].required){
                _validationSchema[key] = _validationSchema[key].required('Required');
            }
        }

        setFormData(_formData);
        setValidationSchema(Yup.object().shape({ ..._validationSchema }));
    }

   const getFormElement = (elementName, elementSchema) => {
        const props = {
            name: elementName,
            label: elementSchema.label,
            options: elementSchema.options
        };

        if (elementSchema.type === "text" || elementSchema.type === "email" ) {
            if(elementSchema.secret){
              return <TextField type="password" {...props} />
            }else{
              return <TextField {...props} />
            }
            
        }

        if (elementSchema.type === "select") {
            return <SelectField  {...props} />
        }

    }

   const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
       

        CrudService.register(values,serviceUrl,'role').then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          //retrieveList();
          retrieveRole();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
        setSubmitting(false);
    }


    const onSubmitEdit = (values, { setSubmitting, resetForm, setStatus }) => {
        

        CrudService.edit(values,serviceUrl,'role').then(
        (response) => {

          
          setMessage(response.data.message);
          setSuccessful(true);
          retrieveRole();
          //retrieveList();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
        setSubmitting(false);
    }

const addRole = () => {
  setModal(true);
}


  return (
    <>


    <div className="row">
        <div className="col-sm-3 setting_tabs" >

        <div className="d-flex align-items-center mx-20">
                  <div className="me-auto">
                    <h3 className="tabs_main_title">Roles</h3>
                  </div>

                  <div>
                    <button  className="btn  btn-primary btn-sm" onClick={() => addRole()} >Add</button>
                  </div>
            
        </div>
        
                 


          
          

          <ul className="left_tabs mt-0">
          {roleData &&
            roleData.map((rs, index) => (
              <li key={index}><Link onClick={() => changeRole(rs)}>{rs.name}</Link></li>
          ))}
          </ul>


        </div>
        <div className="col-sm-9">
            {roleDetail}
        </div>
    </div>

    
    
<ModalEdit show={editModal} title={rsEditValue.name} close={closeModal}>
                
               {!successful && (
        <Form
                enableReinitialize
                initialValues={rsEditValue}
                validationSchema={validationSchema}
                onSubmit={onSubmitEdit}
            >

                {Object.keys(formSchema).map( (key, ind) => (
                    <div key={key}>
                        {getFormElement(key, formSchema[key])}
                    </div>
                ))}
                <br />
                <SubmitButton
                 title="Submit"
                 className="btn btn-primary"
                  
              />

            </Form>
            )}
            {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
            </ModalEdit>

    <ModalPopup show={modal} title={'Roles'} close={closeModal}>
     {!successful && (
        <Form
                enableReinitialize
                initialValues={formData}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >

                {Object.keys(formSchema).map( (key, ind) => (
                    <div key={key}>
                        {getFormElement(key, formSchema[key])}
                    </div>
                ))}
                <br />
                <SubmitButton
                 title="Submit"
                 className="btn btn-primary"
                  
              />

            </Form>
            )}
            {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
    </ModalPopup> 


    </>
  );
};

export default Roles;
