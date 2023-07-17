import React, { useState, useEffect,useRef } from "react";

import CrudService from "../../../services/crud.service";
import ModalPopup from "../../../components/common/modal/ModalPopup";
import AddForm from "../../../components/crud/AddForm";
import Detail from './Detail'
import SweetAlert from 'react-bootstrap-sweetalert';
const ReviewSystem = ({row}) => {

const [categoryList, setCategoryList] = useState([]);
const [listData, setListData] = useState([]);
const [symptomsList, setSymptomsList] = useState([]);
const [modalValue, setModalValue] = useState('');

const [change, setChange] = useState(0);
const [show, setShow] = useState(true);
const [showAlert, setShowAlert] = useState(false);
const [delId, setDelId] = useState(false);

useEffect(() => {
    
    retrieveList();
    retrieveMasterList('review_system_category');
    retrieveMasterList('symptoms');
    
  }, [change]);

const retrieveMasterList = (url) => {
    CrudService.ListValue('master/list-value?type=' + url)
      .then(response => {
            if(url == 'review_system_category'){

                setCategoryList(response.data);
                
            }
            if(url == 'symptoms'){

                setSymptomsList(response.data);
                
            }
            
            
        })
      .catch(e => {
        console.log(e);
      });
  };
  
const retrieveList = () => {
   
    setChange(1)
    CrudService.getAll('review_system_category',true)
      .then(response => {
        

        setListData(response.data);
       
        
      })
      .catch(e => {
        console.log(e);
      });
  };

const formSchemaCategory = {
    name: {
        type: "text",
        label: "Name",
        required: true,
    }
    
   
} 

const formSchemaSymtomp = {
    category_id: {
        type: "select",
        label: "Category",
        required: true,
        options:categoryList
    },
    symptoms_id: {
        type: "select",
        label: "Symptoms",
        required: true,
        options:symptomsList
    },
    description: {
        type: "text",
        label: "Decription",
        required: false,
    }
    
   
}  
const loadModal = (title,children) => {
        setChange(1)
        setModalValue(
         
        <ModalPopup show={'true'} close={closeModal} title={title} >
            {children}
        </ModalPopup>
        
        )
    
 }


const deleteRow = (id) => {
        
            CrudService.deleteRow(id,'review_system_category',true).then(
            (response) => {
              closeModal()  
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

const editForm = (rs) => {
    loadModal('Edit Symptom',<AddForm rs={rs} formSchema={formSchemaSymtomp} master={true} closeModal={closeModal} titel="Symtomps" retrieveList={retrieveList} serviceUrl="review_system_pre_template" />)
}


const closeModal = () => {

      setChange(0)
      setModalValue('')
  }
const deleteMe  = (id) => {
           
            setDelId(id)
            setShowAlert(true)
    }
    const cancelAlert = () => {
          
            setShowAlert(false);
        
            
       
    }  
    
  return (
    <>


{showAlert && (
    <SweetAlert
  custom
  showCancel
  confirmBtnText="Yes"
  cancelBtnText="No"
  confirmBtnBsStyle="primary"
  cancelBtnBsStyle="light"
  customIcon=""
  title="Are you sure?"

  
  onConfirm={() => {
        setShowAlert(false)
        deleteRow(delId)
    }
}
  onCancel={cancelAlert}
 
/>

)}

 

   {modalValue}

    <section className="content">
      <div className="row">       
        <div className="col-12">
          <div className="box">
          <div className="box-body">

            <div className="row mb-20">
                <div className="col-6">
                  <h4 className="box-title">Review Of System</h4>
                  <h4>{row.name} <small>{row.Speciality.name}</small></h4>
                </div>
                <div className="col-6 text-end">
                <button className="btn secondary me-15" onClick={() => loadModal('Add Category',<AddForm formSchema={formSchemaCategory} master={true} closeModal={closeModal} titel="Category" retrieveList={retrieveList} serviceUrl="review_system_category" />)} >Add Category</button>
                  <button className="btn primary" onClick={() => loadModal('Add Category',<AddForm row={row} formSchema={formSchemaSymtomp} master={true} closeModal={closeModal} titel="Symtomps" retrieveList={retrieveList} serviceUrl="review_system_pre_template" />)}>Add Symptom</button>
                </div>
            </div>

           
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    
                     {listData &&
                        listData.map((rs, index) => (
                        <>
                        <thead className="bg-primary">
                        <tr>
                        <th >
                        {rs.name}
                        </th>
                        <th className="text-end">
                        <button style={{marginLeft:5}} className="secondarysmall" onClick={() => deleteMe(rs.id)} >Delete</button>
                        </th>

                        </tr>
                         </thead>
                         <tbody>

                            <Detail row={row} id={rs.id} closeModal={closeModal} retrieveList={retrieveList} editForm={editForm} detailUrl="review_system_pre_template" change={change} />
                         </tbody>
                            </>
                        ))}
                    
                </table>
            </div>        
          </div>
          
          </div>
        </div>
      </div>
    </section>
 
    </>
  );
};

export default ReviewSystem;
