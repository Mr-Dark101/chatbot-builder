import React, { useState, useEffect,useRef } from "react";

import CrudService from "../../../services/crud.service";
import ModalPopup from "../../../components/common/modal/ModalPopup";
import AddForm from "../../../components/crud/AddForm";
import Detail from './Detail'
import SweetAlert from 'react-bootstrap-sweetalert';
const PhysicalExam = ({row}) => {

const [categoryList, setCategoryList] = useState([]);
const [listData, setListData] = useState([]);
const [showAlert, setShowAlert] = useState(false);
const [delId, setDelId] = useState(false);
const [modalValue, setModalValue] = useState('');

const [change, setChange] = useState(0);
const [show, setShow] = useState(true);
useEffect(() => {
    
    retrieveList();
    retrieveMasterList('physical_exam_category');
    
    
  }, [change]);

const retrieveMasterList = (url) => {
    CrudService.ListValue('master/list-value?type=' + url)
      .then(response => {
            if(url == 'physical_exam_category'){

                setCategoryList(response.data);
                
            }
            
            
            
        })
      .catch(e => {
        console.log(e);
      });
  };
  
const retrieveList = () => {
   
    setChange(1)
    CrudService.getAll('physical_exam_category',true)
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
    name: {
        type: "text",
        label: "Name",
        required: true,
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

const editForm = (rs) => {
    loadModal('Edit Symptom',<AddForm rs={rs} formSchema={formSchemaSymtomp} master={true} closeModal={closeModal} title="Symtomps" retrieveList={retrieveList} serviceUrl="physical_exam_pre_template" />)
}


const deleteRow = (id) => {
        
            CrudService.deleteRow(id,'physical_exam_category',true).then(
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

          <div className="row">
                <div className="col-5">
                  <h4 className="box-title">Physical Exam</h4>
                  <h4>{row.name} <small>{row.Speciality.name}</small></h4>
                </div>
                <div className="col-7 text-end">
                <button className="btn secondary" onClick={() => loadModal('Add Category',<AddForm formSchema={formSchemaCategory} master={true} closeModal={closeModal} title="Category" retrieveList={retrieveList} serviceUrl="physical_exam_category" />)} >Add Category</button>
                  <button className="btn primary ms-15" onClick={() => loadModal('Add Examination',<AddForm formSchema={formSchemaSymtomp} master={true} row={row} closeModal={closeModal} title="Symtomps" retrieveList={retrieveList} serviceUrl="physical_exam_pre_template" />)}>Add Examination</button>
                </div>
            </div>

            <br />
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

                            <Detail row={row} closeModal={closeModal} id={rs.id} id={rs.id} retrieveList={retrieveList} editForm={editForm} detailUrl="physical_exam_pre_template" change={change} />
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

export default PhysicalExam;
