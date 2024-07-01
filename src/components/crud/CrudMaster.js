import React,{useState,useEffect,useRef} from "react";
import DataTable from './DataTable';
import ModalPopup from "../../components/common/modal/ModalPopup";

import ModalEdit from "../../components/common/modal/ModalEdit";
import * as Yup from 'yup';
import { Form, TextField, SelectFieldNoLabel, SubmitButton,TextFieldColor } from '../../components/crud/FormElements';
import CrudService from "../../services/crud.service";
import {toast } from 'react-toastify';
import Pagination from "@material-ui/lab/Pagination";
import { generateToast } from "../../utils";

const CrudMaster = ({title,dataAttr,formSchema,serviceUrl,deleteAction,retrieveRolePermission,master }) => {

  const [formData, setFormData] = useState({});
  const [validationSchema, setValidationSchema] = useState({});
  const [rsEditValue, setRsEditValue] = useState({});
  const [successful, setSuccessful] = useState(false);

  const [message, setMessage] = useState();

  const [modal, setModal] = useState(false);

 
  const [showAlert, setShowAlert] = useState(false);
  const [listData, setListData] = useState([]);



  const Toggle = () => setModal(!modal);



  const closeModal = () => {
      setModal(false)
      setSuccessful(false)
      setMessage('')
  }



  const retrieveList = () => {
    const params = getRequestParams(searchTitle, page, pageSize);
    CrudService.getAll(serviceUrl,master,params)
      .then(response => {
        const { dataRow, totalPages } = response.data;

        setListData(dataRow);
        setCount(totalPages);
        
      })
      .catch(e => {
        console.log(e);
      });
  };



const [searchTitle, setSearchTitle] = useState("");
  const tutorialsRef = useRef();

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const pageSizes = [3, 6, 9];

  tutorialsRef.current = listData;

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const getRequestParams = (searchTitle, page, pageSize) => {
    let params = {};

    if (searchTitle) {
      params["title"] = searchTitle;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

    const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

useEffect(() => {
    initForm(formSchema);
    retrieveList();
  }, [serviceUrl,page, pageSize]);

async function retrieveRoleList() {
      let rr = await CrudService.getAll('master/role')
             
             
          return rr.data
         
    }

    
    

const initForm = async (formSchema) => {
        if(serviceUrl == 'user'){

          let result = await retrieveRoleList();
           formSchema.roleId.options = result
        }
       
        let _formData = {};
        let _validationSchema = {};

        for(var key of Object.keys(formSchema)){
            _formData[key] = "";

            if(formSchema[key].type === "text" || formSchema[key].type === "color"){
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

        if (elementSchema.type === "text" || elementSchema.type === "email" || elementSchema.type === "color" ) {
            if(elementSchema.secret){
              return <TextField type="password" {...props} />
            }else if(elementSchema.type == 'color'){
              return <TextFieldColor {...props} />
            }else{
              return <TextField {...props} />
            }
            
        }

        if (elementSchema.type === "select") {
            return <SelectFieldNoLabel  {...props} />
        }

    }

    const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
       

        CrudService.register(values,serviceUrl,master).then(
        (response) => {
          setMessage(response.data.message);
          //setSuccessful(true);
          generateToast(response.data.message, 'Success!');


          
          
          retrieveList();
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
          generateToast(resMessage, 'Error!', false);


          


          
        }
      );
        setSubmitting(false);
    }

   

    const deleteRow = (id) => {
          
           CrudService.deleteRow(id,serviceUrl,master).then(
            (response) => {
              setMessage(response.data.message);
              generateToast(response.data.message, 'Success!');

              setSuccessful(true);
              retrieveList();
            },
            (error) => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();

              //setMessage(resMessage);
              //setSuccessful(false);
            }
          );
        
            
       
    }

    
    const onSubmitEdit = (values, { setSubmitting, resetForm, setStatus }) => {
        

        CrudService.edit(values,serviceUrl,master).then(
        (response) => {

          
          setMessage('');
          generateToast(response.data.message, 'Success!');

          setSuccessful(false);
          retrieveList();
          setModal(false)
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          generateToast(resMessage, 'Failed!', false);

          setSuccessful(false);
        }
      );
        setSubmitting(false);
    }



const loadEdit = (rs) => {
      setModal(true)
      setRsEditValue(rs)
     
 }

  return (
    <>

     
    

    
    <ModalEdit show={modal} title={title} close={closeModal}>
                
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
                 className="primary"
                  
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

    
    <section>
      <div className="row">       
        <div className="col-12">
          <div className="box">
          <div className="box-body">

          <div className="row">
                <div className="col-8">
                  <h4 className="box-title">{title}</h4>
                </div>
                
            </div>

                   <Form
                enableReinitialize
                initialValues={formData}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >

                <div className="row mb-20">
                    
                {Object.keys(formSchema).map( (key, ind) => (
                  <div className="col-5" key={key}>
                    <div key={key} className="field_section">
                        {getFormElement(key, formSchema[key])}
                    </div>
                    </div>
                ))}

                    
                    <div className="col-1">
                      
                      
                      <SubmitButton
                         title="Add"
                         className="primary"
                          
                      />
                    </div>
                </div>

                

                

            </Form>
            
           
            <div className="table-responsive">
                
                <DataTable serviceUrl={serviceUrl} retrieveRolePermission={retrieveRolePermission} loadEdit={loadEdit} deleteAction={deleteAction} deleteRow={deleteRow} data={listData} dataAttr={dataAttr} />
                  
               <Pagination
            className="my-3"
            count={count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
             
            </div>        
          </div>
          
          </div>
        </div>
      </div>
    </section>
      
    </>
  );
};

export default CrudMaster;