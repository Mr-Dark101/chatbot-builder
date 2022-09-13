import React, { useState, useEffect,useRef } from "react";

import CrudService from "../../../services/crud.service";
import ModalPopup from "../../../components/common/modal/ModalPopup";
import AddForm from "../../../components/crud/AddForm";
import Detail from './Detail'
import SweetAlert from 'react-bootstrap-sweetalert';
const SocialType = () => {

const [categoryList, setCategoryList] = useState([]);
const [listData, setListData] = useState([]);
const [showAlert, setShowAlert] = useState(false);
const [delId, setDelId] = useState(false);
const [modalValue, setModalValue] = useState('');

const [change, setChange] = useState(0);
const [show, setShow] = useState(true);
useEffect(() => {
    
    retrieveList();
    retrieveMasterList('social_category');
    
    
  }, [change]);

const retrieveMasterList = (url) => {
    CrudService.ListValue('master/list-value?type=' + url)
      .then(response => {
            if(url == 'social_category'){

                setCategoryList(response.data);
                
            }
            
            
            
        })
      .catch(e => {
        console.log(e);
      });
  };
  
const retrieveList = () => {
   
    setChange(1)
    CrudService.getAll('social_category',true)
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
    loadModal('Edit Symptom',<AddForm rs={rs} formSchema={formSchemaSymtomp} master={true} closeModal={closeModal} title="Symtomps" retrieveList={retrieveList} serviceUrl="social_type" />)
}


const deleteRow = (id) => {
        
            CrudService.deleteRow(id,'social_category',true).then(
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
  showCloseButton
  confirmBtnText="Yes"
  cancelBtnText="No"
  confirmBtnBsStyle="primary"
  cancelBtnBsStyle="light"
  customIcon="https://raw.githubusercontent.com/djorg83/react-bootstrap-sweetalert/master/demo/assets/thumbs-up.jpg"
  title="Are you sure delete this record.?"

  
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
                  <h4 className="box-title">Social History</h4>
                </div>
                <div className="col-7 text-end">
                    <button className="btn secondary" onClick={() => loadModal('Add Category',<AddForm formSchema={formSchemaCategory} master={true} closeModal={closeModal} title="Category" retrieveList={retrieveList} serviceUrl="social_category" />)} >Add Category</button>
                  <button className="btn primary ms-15" onClick={() => loadModal('Add Examination',<AddForm formSchema={formSchemaSymtomp} master={true} closeModal={closeModal} title="Symtomps" retrieveList={retrieveList} serviceUrl="social_type" />)}>Add Social History</button>
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
                            <button style={{marginLeft:5}} className="warningsmall" onClick={() => deleteMe(rs.id)} >Delete</button>
                        </th>
                        </tr>
                         </thead>
                         <tbody>

                            <Detail closeModal={closeModal} id={rs.id} id={rs.id} retrieveList={retrieveList} editForm={editForm} detailUrl="social_type" change={change} />
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

export default SocialType;
