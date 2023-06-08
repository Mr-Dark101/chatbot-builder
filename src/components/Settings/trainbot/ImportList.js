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

const ImportList = ({subPage }) => {

   const ref = useRef([]);
   const inputElement = useRef([]);
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

   useEffect(() => {
      retrieveList();
   }, []);

   const retrieveList = () => {
      CrudService.getAll('import-history', true)
         .then((response) => {
            setListData(response.data);
            

            
         })
         .catch((e) => {
            console.log(e);
         });
   };
   const loadModal = (title, children) => {
      setModalValue(
         <ModalPopup show={'true'} close={closeModal} title={title}>
            {children}
         </ModalPopup>
      );
   };

   const closeModal = () => {
      setModalValue('');
   };

   const deleteMe = (id) => {
      setDelId(id);
      setShowAlert(true);
   };

   

   const deleteRow = (id) => {
      CrudService.deleteRow(id, 'gptcat', true).then(
         (response) => {
            toast('Record has been deleted!', { type: toast.TYPE.SUCCESS });
            setMessage(response.data.message);
            setSuccessful(true);
            retrieveList();
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
      setSuccessful(true);
      retrieveList()
      //setMessage("Record has been deleted");
     // setSuccessful(true);
     
      
   }

const deleteAll = async () => {

      setShowAlertAll(true);
     
     
      
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
      
      loadModal('Add Category',<CreateCat closeModal={closeModal}   title="Add Category" loadList={retrieveList}  />)
 }

  const editCatBody = (rs) => {
      
      loadModal('Edit Category',<Edit closeModal={closeModal} rs={rs}   title="Edit Category" loadList={retrieveList}  />)
 }


   return (
      <>
         {modalValue}
         {showAlert && (
            <SweetAlert
               custom
               showCancel
               showCloseButton
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
               showCloseButton
               confirmBtnText="Yes"
               cancelBtnText="No"
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


            <div className="row px-30 py-15 media-center">
                     <div className="col-sm-6">

                        
                        <h5 className="box-title m-0" style={{ fontWeight: 800 }}>
                        <span onClick={() => subPage(<List subPage={subPage} />)} style={{marginRight:'5px'}} className="icon">
                           <img alt={'#'} src={back_icon} />
                        </span>
                           Upload History
                        </h5>
                     </div>

                     <div className="col-sm-6 d-flex justify-content-end">

                       
                        
                     
                        

                       

                                 
                     </div>
                  </div>
                  <hr />

         
            {listData.length > 0 ? (
               <>
                  

                  <div className="table-responsive px-30 py-15">
                     <table className="table table-hover" id="settingTbl">
                        <thead>
                           <tr>
                              
                              <th><b>File Name</b></th>
                              <th><b>Uploaded Mode</b></th>
                              <th><b>Upload Time</b></th>
                              <th><b>Record Count</b></th>
                              <th><b>Status</b></th>
                            
                              
                           </tr>
                        </thead>
                        <tbody>
                         
                           {listData &&
                              listData.map((row, index) => (
                                 <tr>
                                    
                                    <td>{row.file_name}</td>
                                    <td>Formatted CSV</td>
                                    <td>{row.created_at}</td>
                                    <td>{row.record_count}</td>
                                    <td>Completed</td>
                                    
                                   
                                    
                                   
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

export default ImportList;
