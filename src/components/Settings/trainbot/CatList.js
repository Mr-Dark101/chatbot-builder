import React, { useState, useEffect,useRef } from 'react';
import CrudService from '../../../services/crud.service';
import ModalPopup from '../../common/modal/ModalPopup';
import back_icon from '../../../assets/back-icon.svg';
import SweetAlert from 'react-bootstrap-sweetalert';
import Create from './Create';
import CreateCat from './CreateCat';
import Edit from './EditCat';
import List from './List'
import BlankMsg from '../../common/BlankMsg';
import { toast } from 'react-toastify';
import { Tooltip } from '@mui/material';
import editIcon from '../../../assets/edit.svg';
import deleteIcon from '../../../assets/deleteicon.svg';
import { generateToast } from '../../../utils';
import ConfirmModal from '../../../SharedComponent/ConfirmModal/Modal';


const CatList = ({loadList }) => {

   const ref = useRef([]);
   const inputElement = useRef([]);
   const allSelected = useRef("");

   const [listData, setListData] = useState([]);

   const [modalValue, setModalValue] = useState('');
   const [show, setShow] = useState(true);
   const [showAlert, setShowAlert] = useState(false);
   
   const [successful, setSuccessful] = useState(false);
   const [message, setMessage] = useState();
   const [delId, setDelId] = useState(false);
   const [deleteShow, setDeleteShow] = useState(false);
   const [checkedAll, setCheckedAll] = useState(false);
   const [showAlertAll, setShowAlertAll] = useState(false);


   const [modalText, setModalText] = useState("");
   const [modalType, setModalType] = useState("");
   const [modalTitle, setModalTitle] = useState("");
   const [okText, setOkText] = useState("");
   const [modalId, setModalId] = useState("");
   const [visible, setVisible] = useState(false);


   useEffect(() => {
      retrieveList();
   }, []);

   const retrieveList = () => {
      CrudService.getAll('gptcat', true)
         .then((response) => {
            setListData(response.data);
            

            
         })
         .catch((e) => {
            console.log(e);
         });
   };
   const loadModal = (visible) => {
      setModalValue(
         <CreateCat loadList={loadList} closeModal={closeModal} visible={visible}  modalTitle={"Add Category"}  />
      );
   };

   const closeModal = () => {
      loadModal(false);
   };


   const loadEditModal = (rs, visible) => {
      setModalValue(
         <Edit closeModal={closeEditModal} rs={rs} visible={visible} modalTitle="Edit Category" loadList={retrieveList}  />
      );
   };

   const closeEditModal = () => {
      loadModal(false);
   };

   const deleteMe = (id) => {
      setDelId(id);
      setShowAlert(true);
   };

   

   const deleteRow = (id) => {
      CrudService.deleteRow(id, 'gptcat', true).then(
         (response) => {
            generateToast('Category has been deleted!', 'Success!');

            setMessage(response.data.message);
            setSuccessful(true);
            allSelected.current.checked = false;
            retrieveList();
            setDeleteShow(false);

         },
         (error) => {
            const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            //setMessage(resMessage);
            //setSuccessful(false);
         }
      );
   };

   const createJson = () => {
      CrudService.createJsonData().then(
         (response) => {
            
            alert("Json Created")
         },
         (error) => {
            alert("Error")
         }
      );
   }

    const deleteRowAll = async (id) => {
      await CrudService.deleteRow(id, 'gptcat', true)

      
   };

   const deleteAllSeleted = async () => {

      
      for (let i = 0; i < inputElement.current.length; i++) {
         if(inputElement.current[i]){
               if(inputElement.current[i].checked){
                  await deleteRowAll(inputElement.current[i].value)
               }
         }
      }

      generateToast('Category has been deleted!', 'Success!');
      setSuccessful(true);
      retrieveList();
      allSelected.current.checked = false;
      setCheckedAll(false);
      setDeleteShow(false);

      //setMessage("Category has been deleted");
     // setSuccessful(true);
     
      
   }

const deleteAll = async () => {     
   modalSettings("deleteAllModal", "Delete Category", "Deleting the category will reassign all training data assigned to the category to default category.", "Delete");      
}

const selectAll = (check_status,value) => {
        setCheckedAll(!checkedAll)


        
        for (let i = 0; i < inputElement.current.length; i++) {
            
            if(inputElement.current[i]){

               let id  = inputElement.current[i].id
               id = id.split('-')[0]
              

                  if(check_status) {
                     inputElement.current[i].checked = true;

                  }else{
                     inputElement.current[i].checked = false;
                  }
               
            }
            
        }
        setDeleteShow(check_status)
       
  };
   const checkDelete = () => {
      let checkStatus = false;
      for (let i = 0; i < inputElement.current.length; i++) {
         
         if(inputElement.current[i]){
            if(inputElement.current[i].checked){
               
               checkStatus = true;
               break
            }
         }

      }
       setDeleteShow(checkStatus)
  }

 const createCatBody = (rs) => {
      
      loadModal(true ,<CreateCat closeModal={closeModal}   title="Add Category" loadList={retrieveList}  />)
 }

  const editCatBody = (rs) => {
      
      loadModal(true ,<Edit closeModal={closeModal} rs={rs}   title="Edit Category" loadList={retrieveList}  />)
 }

 const deleteCatBody = (rs,id) => {
   setDelId(id);
   // setShowAlert(true);
   modalSettings("deleteModal", "Delete Category", "Deleting the category will reassign all training data assigned to the category to default category.", "Delete");
};

const modalSettings = (modalId, title, desc, okText) => {
   setModalId(modalId);
   setModalTitle(title);
   setModalText(desc);
   setOkText(okText);
   setModalType(modalId);
};


   return (
      <>
         {modalValue}
         {showAlert && (
            <SweetAlert
               custom
               showCancel
               confirmBtnText="Delete"
               cancelBtnText="Cancel"
               confirmBtnBsStyle="primary"
               cancelBtnBsStyle="light"
               customIcon=""
               customClass="containerBoxAlert"
               title="Delete Category"
               onConfirm={() => {
                  setShowAlert(false);
                  deleteRow(delId);
               }}
               onCancel={() => {
                  setShowAlert(false);
               }}

                reverseButtons={true}
            >
            Deleting the category will reassign all training data assigned to the category to default category.
            </SweetAlert>
         )}


         {showAlertAll && (
            <SweetAlert
               custom
               showCancel
               confirmBtnText="Delete"
               cancelBtnText="Cancel"
               confirmBtnBsStyle="primary"
               cancelBtnBsStyle="light"
               customIcon=""
               customClass="containerBoxAlert"
               title="Delete Category"
               onConfirm={ () => {
                  setShowAlertAll(false);
                  deleteAllSeleted();
                  
               }}
               onCancel={() => {
                  setShowAlertAll(false);
               }}

               reverseButtons={true}
            >
             Deleting the category will reassign all training data assigned to the category to default category.
            </SweetAlert>
         )}



         {/* Added DC COnfirmation Modal */}
         <ConfirmModal 
            modalText={modalText}
            handleOk={
               ()=>{
                  if(modalType === "deleteAllModal"){
                     deleteAllSeleted();
                  }else{
                     deleteRow(delId)
                  }
               }
            } 
            modalTitle={modalTitle}
            okText={okText}
            modalId={modalId}
          />


            <div className="row px-30 py-15 media-center">
                     <div className="col-sm-6">

                        
                        <h5 className="box-title m-0" style={{ fontWeight: 800 }}>
                        <span onClick={() => loadList() } style={{marginRight:'5px'}} className="icon">
                           <img style ={{ width: "15px", marginRight: "6px"}} alt={'#'} src={back_icon} /> 
                        </span>
                             Manage Data Categories
                        </h5>
                     </div>

                     <div className="col-sm-6 d-flex justify-content-end">

                        {deleteShow && 

                           <a class="danger" style={{ marginLeft: '15px', textAlign: 'center' }} 
                           data-toggle="modal" data-target="#deleteAllModal" 
                           onClick={() => deleteAll()}>
                           Delete All
                        </a> 

                        }
                        
                        
                        <a class="primary" onClick={() => loadModal(true)} style={{ marginLeft: '15px', textAlign: 'center' }}>
                           Add Category
                        </a> 
                        

                       

                                 
                     </div>
                  </div>
                  <hr />

         
            {listData.length > 0 ? (
               <>
                  

                  <div className="table-responsive px-30 py-15">
                     <table className="table table-hover" id="settingTbl">
                        <thead>
                           <tr>
                              <th>
                              
                              <input type="checkbox"
                                    ref={allSelected} 
                                    name={`c_all`}
                                    onChange={(event) => selectAll(event.target.checked,event.target.value)}
                                    value='all'
                              />
                              </th>
                              <th style={{fontFamily: 'Lexend Deca Medium', fontSize: '12px'}}><b>CATEGORY</b></th>
                            
                              <th style={{fontFamily: 'Lexend Deca Medium', fontSize: '12px'}}><b>ACTION</b></th>
                           </tr>
                        </thead>
                        <tbody>
                           
                           {listData &&
                              listData.map((row, index) => (
                                 <tr>
                                    <td width="3%">
                                       
                                    
                                       {row.name !== 'Default' && 

                                          <input
                                           type="checkbox"
                                           name={`r_${row.id}`}
                                           value={row.id}
                                           id={`${row.id}`}
                                          onChange={(event) => checkDelete()}
                                           ref={(element) => { inputElement.current[row.id] = element }}
                                           />

                                       }

                                       

                                    </td>
                                    <td width="95%" style={{fontFamily: 'Lexend Deca Light', fontSize:'12px'}}>{row.name}</td>
                                    
                                   
                                    
                                    <td width="5%" style={{ textAlign: 'end' }}>
                                      {row.name !== 'Default' ? 
                                      (
                                       <>
                                       <a style={{ marginLeft: 5 }}  onClick={() => loadEditModal(row, true)} >
                                          <img alt={'#'} src={editIcon}  />
                                       </a>
                                       <a data-toggle="modal" data-target="#deleteModal" style={{ marginLeft: 5 }}  onClick={() => deleteCatBody(row,row.id)}>
                                          <img alt={'#'} src={deleteIcon} width="20" />
                                       </a>
                                       </>
                                       ) : null
                                    }
                                    </td>
                                 </tr>
                              ))}
                        </tbody>
                     </table>
                  </div>
               </>
            ) : (
               null
            )}
         
      </>
   );
};

export default CatList;
