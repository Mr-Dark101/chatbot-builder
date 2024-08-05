import React, { useState, useEffect,useRef } from 'react';
import CrudService from '../../../services/crud.service';
import ModalPopup from '../../common/modal/ModalPopup';
import SweetAlert from 'react-bootstrap-sweetalert';
import Create from './Create';

import editIcon from '../../../assets/edit.svg';
import deleteIcon from '../../../assets/deleteicon.svg';
import { Form, TextField, SelectField, SubmitButton, CheckBoxField, TextGroupField, TextAreaField } from '../../crud/FormElements';
import ConfirmModal from '../../../SharedComponent/ConfirmModal/Modal';





import Edit from './Edit';

import BlankMsg from '../../common/BlankMsg';
import { toast } from 'react-toastify';
import { Tooltip } from '@mui/material';
import { generateToast } from '../../../utils';
const BASE_URL = process.env.REACT_APP_BACKEND_URl;
const List = ({ rs, subPage, loadList }) => {

   const ref = useRef([]);

   const [listData, setListData] = useState([]);
   const [listDataComplete, setListDataComplete] = useState([]);
   const [gptCatList, setGptCatList] = useState([]);
   const [refresh, setRefresh] = useState(false);
   const [modalValue, setModalValue] = useState('');
   const [show, setShow] = useState(true);
   const [showAlert, setShowAlert] = useState(false);
   const [successful, setSuccessful] = useState(false);
   const [message, setMessage] = useState();
   const [delId, setDelId] = useState(false);
   const [showAlertAll, setShowAlertAll] = useState(false);
   const [checkedAll, setCheckedAll] = useState(false);
  const [checked, setChecked] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);

  const [showAlertSuccess, setShowAlertSuccess] = useState(false);

  const [customFieldList, setCustomFieldList] = useState([]);

  const [modalText, setModalText] = useState([]);
  const [modalType, setModalType] = useState([]);
  const [modalTitle, setModalTitle] = useState([]);
  const [okText, setOkText] = useState([]);
  const [modalId, setModalId] = useState([]);

  const inputElement = useRef([]);
   useEffect(() => {
      
      retrieveList();

   }, []);


  
   

   const retrieveList = () => {
      setSuccessful(false);
      CrudService.getAll('helpcustomfield', true)
         .then((response) => {
            setListDataComplete(response.data);
            
            setListData(response.data)

         })
         .catch((e) => {
            
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
      modalSettings("deleteModal", "Delete Record", "Are you sure you want to delete this record?", "Delete");
   };


   const modalSettings = (modalId, title, desc, okText) => {
      setModalId(modalId);
      setModalTitle(title);
      setModalText(desc);
      setOkText(okText);
      setModalType(modalId);
   };

   const deleteRow = (id) => {
      debugger;
      CrudService.deleteRow(id, 'helpcustomfield', true).then(
         (response) => {
            generateToast("Custom Field has been deleted!", 'Success!');

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


  

   const deleteRowAll = async (id) => {
      await CrudService.deleteRow(id, 'helpcustomfield', true)

      
   };

   const createJson = () => {
      CrudService.createJsonData().then(
         (response) => {
            setShowAlertSuccess(true)
            
         },
         (error) => {
            alert("Error")
         }
      );
   }

   const deleteAll = async () => {     
      modalSettings("deleteAllModal", "Delete Record", "Are you sure you want to delete selected record?", "Delete");      
   }


   const deleteAllSeleted = async () => {

      
      for (let i = 0; i < inputElement.current.length; i++) {
         if(inputElement.current[i]){
               if(inputElement.current[i].checked){
                  await deleteRowAll(inputElement.current[i].value)
               }
         }
      }
      setSuccessful(true);
      generateToast("Custom fields has been deleted!", 'Success!');

      retrieveList()
      //setMessage("Training data has been deleted");
     // setSuccessful(true);
     
      
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


   const toggleCheck = (inputName) => {
   
    setChecked((prevState) => {
      const newState = { ...prevState };
      newState[inputName] = !prevState[inputName];
      return newState;
    });
  };

  const downLoadTemplate = () => {
      document.location.href= BASE_URL + '/sampletrainingdata.csv';
  }

  const downLoadCsv = () => {
      CrudService.exportData()
         .then((response) => {
               let orgUnitId = localStorage.getItem('org_unit_id');
               document.location.href= BASE_URL + '/export_' + orgUnitId + '.csv';
         })
         .catch((e) => {
            console.log(e);
         });
  }

 const searchData = (e) => {
     const query = e.target.value;

     const filteredRepositories = listDataComplete.filter((value) => {
         return (
            value?.question?.toLowerCase().includes(query?.toLowerCase())
           
         );
      });
     
     
    
      setListData(filteredRepositories);
 }

const selCat = (e) => {
     const query = e.target.value;

    
     let filteredRepositories = listDataComplete.filter((value) => {
         
         
               if(!value.GptCat){
                  value.GptCat = {name:"Default"}
               }


               return (
            
                  value?.GptCat?.name?.toLowerCase().includes(query?.toLowerCase())
           
               );

         
         
      });
     
     if(query == ""){
          filteredRepositories = listDataComplete
     }
    
      setListData(filteredRepositories);
 }

 const getCustomfield = (value) => {
      const valueData = (value  == '') ? [] :JSON.parse(value);
      const dataReturn = valueData?.map(item => {
            
         return customFieldList.filter(rss => rss.value == item)[0]?.label

      })
      return dataReturn;
 }

 
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
               title="Delete Record"
               onConfirm={() => {
                  setShowAlert(false);
                  deleteRow(delId);
               }}
               onCancel={() => {
                  setShowAlert(false);
               }}

                reverseButtons={true}
            >
            Are you sure you want to delete this record?
            </SweetAlert>
         )}


         {showAlertSuccess && (
             <SweetAlert
               custom
               hideCancel
               confirmBtnText="Close"
               
               confirmBtnBsStyle="primary"
               cancelBtnBsStyle="light"
               customIcon=""
               customClass="containerBoxAlert"
               title="Submit Training Data"
               onConfirm={() => {
                  setShowAlertSuccess(false);
               }}
               onCancel={() => {
                  setShowAlertSuccess(false);
               }}

                reverseButtons={true}

                closeOnCancel={false}
            >
            Data has been successfully submitted for training to OpenAI
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
               title="Delete Record"
               onConfirm={ () => {
                  setShowAlertAll(false);
                  deleteAllSeleted();
                  
               }}
               onCancel={() => {
                  setShowAlertAll(false);
               }}

               reverseButtons={true}
            >
             Are you sure you want to delete selected record?
            </SweetAlert>
         )}

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


         <div className="page_data_setting">
            {setListDataComplete.length > 0 ? (
               <>
                  <div className="row px-30 py-15 media-center">
                     <div className="col-sm-3">
                        <h5 className="box-title m-0" style={{ fontWeight: 800,width:'200px' }}>
                          Custom Field

                        </h5>
                     </div>

                     <div className="col-sm-9 d-flex justify-content-end">

                        {deleteShow && 

                           <a 
                              class="danger" 
                              style={{ marginLeft: '15px', textAlign: 'center' }} 
                              data-toggle="modal" data-target="#deleteAllModal" 
                              onClick={deleteAll}
                              >
                              Delete All
                           </a> 

                        }
                        
                        
                        
                        

                        <a class="primary" style={{ marginLeft: '15px', textAlign: 'center' }} 

                        onClick={() => subPage(<Create loadList={loadList} retrieveList={retrieveList} rs={rs} />)}>
                           Add Field
                        </a>

                             
                     </div>
                  </div>
                  <hr />

                  
                  <div className="table-responsive px-30 py-15">

                  
                  
                  {!successful && (
                     <table className="table table-hover" id="settingTbl">
                        
                        <thead>
                           <tr>
                              <th>


                              <input type="checkbox" 
                                    name={`c_all`}
                                    onChange={(event) => selectAll(event.target.checked,event.target.value)}
                                    value='all'

                                     />

                              </th>
                              <th style={{fontFamily: 'Lexend Deca Medium', fontSize: '12px'}}  width="20%"><b>NAME</b></th>
                             <th style={{fontFamily: 'Lexend Deca Medium', fontSize: '12px'}}><b>STATUS</b></th>
                              <th style={{fontFamily: 'Lexend Deca Medium',fontSize: '12px', textAlign: 'right'}}>ACTIONS</th>
                           </tr>
                        </thead>
                        <tbody>
                           {listData &&
                              listData.map((row, index) => (
                              <>
                                 <tr >
                                    <td width="3%">
                                   

                                          <input
                                           type="checkbox"
                                           name={`r_${row.id}`}
                                           value={row.id}
                                           id={`${row.id}`}
                                          onChange={(event) => checkDelete()}
                                           ref={(element) => { inputElement.current[row.id] = element }}
                                           />

                                    </td>
                                    <td width="20%" style={{fontFamily: 'Lexend Deca Light', fontSize:'12px'}}>{row.name}</td>
                                    <td
                                       width="100%"
                                       style={{ fontFamily: 'Lexend Deca Light', fontSize: '12px' }}
                                    >
                                       <p className={row.status_id == 1 ? 'priority-field field-active' : 'priority-field priority-high'}>{row.status_id == 1 ? 'Active' : 'Inactive'}</p>
                                    </td>

                                    <td>
                                      
                                       <a style={{ marginLeft: 5 }}  onClick={() => subPage(<Edit loadList={loadList} retrieveList={retrieveList} rs={row} />)}>
                                          
                                          <img alt={'#'} src={editIcon}  />
                                       </a>

                                       <a data-toggle="modal" data-target="#deleteModal" style={{ marginLeft: 5 }}  onClick={() => deleteMe(row.id)}>
                            
                                          <img alt={'#'} src={deleteIcon} width="20" />
                                       </a>
                                      
                                    </td>
                                    
                                 </tr>
                                 
                                 </>
                              ))}
                        </tbody>
                     </table>
                  )}
                  {successful && (
                        <div className="form-group">
                           <div className={successful ? 'alert alert-success' : 'alert alert-danger'} role="alert">
                              {message}
                                
                              
                           </div>

                           <button type="button" className="btn primary" onClick={() => retrieveList()}>Back</button>
                        </div>
                     )}
                  </div>
               </>
            ) : (
               <BlankMsg message="There is no record added" icon="mdi mdi-phone-plus" buttonName="Add New Record" button={() => subPage(<Create loadList={loadList} retrieveList={retrieveList} rs={rs} />)} />
            )}
         </div>
      </>
   );
};

export default List;
