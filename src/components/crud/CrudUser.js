import React,{useState,useEffect,useRef} from "react";
import DataTableUser from './DataTableUser';
import ModalPopup from "../../components/common/modal/ModalPopup";
import ModalEdit from "../../components/common/modal/ModalEdit";
import * as Yup from 'yup';
import { Form, TextField, SelectField, SubmitButton,CheckBoxField } from '../../components/crud/FormElements';
import CrudService from "../../services/crud.service";
import {toast } from 'react-toastify';
import Pagination from "@material-ui/lab/Pagination";


const CrudUser = ({row,title,dataAttr,formSchema,serviceUrl,deleteAction,retrieveRolePermission,master,subPage,loadPage,masterValue }) => {

  const [formData, setFormData] = useState({});
  const [validationSchema, setValidationSchema] = useState({});
  const [rsEditValue, setRsEditValue] = useState({});
  const [successful, setSuccessful] = useState(false);

  const [message, setMessage] = useState();

  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [listData, setListData] = useState([]);



  const Toggle = () => setModal(!modal);

  const closeModal = () => {
      setModal(false)
      setSuccessful(false)
      setMessage('')
  }

  const closeModalEdit = () => {
      setModalEdit(false)
      setSuccessful(false)
      setMessage('')
  }

  const retrieveList = () => {
    const params = getRequestParams(searchTitle, page, pageSize);
 
    CrudService.getAll(serviceUrl + '&tenent_id=' + row.id,master,params)
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






    
    

const initForm = async (formSchema) => {
       

        
       
        let _formData = {};
        let _validationSchema = {};

        for(var key of Object.keys(formSchema)){
          
            _formData[key] = "";

            if(formSchema[key].type === "text"){
                _validationSchema[key] = Yup.string();
            }else if(formSchema[key].type === "email"){
                _validationSchema[key] = Yup.string().email()
            }else if(formSchema[key].type === "select" && key === 'permission_type'){
                
                _validationSchema[key] = Yup.string().oneOf(formSchema[key].options.map(o => o.value));
            
            }else if(formSchema[key].type === "select" && key !== 'permission_type'){

                _validationSchema[key] = Yup.number();
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
            options: elementSchema.options,
            id: elementName,

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

        if (elementSchema.type === "checkbox") {
            return <CheckBoxField  {...props}    />
        }

    }

    const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
       
        values.tenent_id = row.id
        CrudService.register(values,serviceUrl,master).then(
        (response) => {
          toast(response.data.message,{type: toast.TYPE.SUCCESS})
          setMessage('');
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
          setSuccessful(false);
        }
      );
        setSubmitting(false);
    }

    const deleteRow = (id) => {
        const aa = window.confirm("Are you sure delete this record.");
        if(aa){
            CrudService.deleteRow(id,serviceUrl,master).then(
            (response) => {
              setMessage(response.data.message);
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
    }

    const onSubmitEdit = (values, { setSubmitting, resetForm, setStatus }) => {
        

        CrudService.edit(values,serviceUrl,master).then(
        (response) => {

          toast(response.data.message,{type: toast.TYPE.SUCCESS})
          setMessage('');
          setSuccessful(false);
          retrieveList();
          setModalEdit(false)
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


const createNew = () => {
  setModal(true)
}
const loadEdit = (rs) => {

      setRsEditValue(rs)
      setModalEdit(true)
     
 }

  return (
    <>
    <ModalEdit show={modalEdit} title={title} close={closeModalEdit}>
                
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

    <ModalPopup show={modal} title={title} close={closeModal}>
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
    </ModalPopup> 
    <section className="content">
      <div className="row">       
        <div className="col-12">
          <div className="box">
          <div className="box-body">

          <div className="row mb-20">
                <div className="col-7">
                  <h4 className="box-title">{title}</h4>
                </div>
                <div className="col-5 text-end">

                  <button className="primary" onClick={() => createNew()}>Create New {title}</button>

                </div>
            </div>

           
            <div className="table-responsive">
                
                <DataTableUser loadPage={loadPage} masterValue={masterValue} subPage={subPage} serviceUrl={serviceUrl} retrieveRolePermission={retrieveRolePermission} loadEdit={loadEdit} deleteAction={deleteAction} deleteRow={deleteRow} data={listData} dataAttr={dataAttr} />
                  
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

export default CrudUser;