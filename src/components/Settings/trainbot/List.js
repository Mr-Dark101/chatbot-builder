import React, { useState, useEffect,useRef } from 'react';
import CrudService from '../../../services/crud.service';
import ModalPopup from '../../common/modal/ModalPopup';
import SweetAlert from 'react-bootstrap-sweetalert';
import Create from './Create';
import CreateCat from './CreateCat';
import EditCat from './EditCat';
import CreateImport from './CreateImport';
import editIcon from '../../../assets/edit.svg';
import deleteIcon from '../../../assets/deleteicon.svg';
import { Form, TextField, SelectField, SubmitButton, CheckBoxField, TextGroupField, TextAreaField } from '../../crud/FormElements';


import CatList from './CatList';
import ImportList from './ImportList';

import Edit from './Edit';

import BlankMsg from '../../common/BlankMsg';
import { toast } from 'react-toastify';
import { Tooltip } from '@mui/material';
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

  const inputElement = useRef([]);
   useEffect(() => {
      retrieveMasterList('gptcat');
      retrieveList();

   }, []);

   const retrieveMasterList = (url) => {
      CrudService.ListValue('master/list-value?type=' + url)
         .then((response) => {
            let parsedData = response.data;
            parsedData.push({"label":"Default","value":0});
            if (url == 'gptcat') {
               setGptCatList(parsedData);
            }

           
         })
         .catch((e) => {
            console.log(e);
         });
   };

   const retrieveList = () => {
      setSuccessful(false);
      CrudService.getAll('trainbot', true)
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
      setShowAlert(true);
   };

   const deleteRow = (id) => {
      CrudService.deleteRow(id, 'trainbot', true).then(
         (response) => {
            toast('Training data has been deleted!', { type: toast.TYPE.SUCCESS });
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
      await CrudService.deleteRow(id, 'trainbot', true)

      
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

      setShowAlertAll(true);
     
     
      
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
      toast('Training data has been deleted!', { type: toast.TYPE.SUCCESS });
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

 

 const importData = () => {
      
      loadModal('Upload Training Data',<CreateImport closeModal={closeModal} title="Upload Training Data" retrieveList={retrieveList} loadList={loadList} />)
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
               title="Delete Training Data"
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


         

         <div className="page_data_setting">
            {setListDataComplete.length > 0 ? (
               <>
                  <div className="row px-30 py-15 media-center">
                     <div className="col-sm-3">
                        <h5 className="box-title m-0" style={{ fontWeight: 800,width:'200px' }}>
                           Training Data
                        </h5>
                     </div>

                     <div className="col-sm-9 d-flex justify-content-end">

                        {deleteShow && 

                           <a class="danger" style={{ marginLeft: '15px', textAlign: 'center' }} 

                           onClick={() => deleteAll()}>
                           Delete All
                        </a> 

                        }
                        
                        
                        
                        

                        <a class="primary" style={{ marginLeft: '15px', textAlign: 'center' }} 

                        onClick={() => subPage(<Create loadList={loadList} retrieveList={retrieveList} rs={rs} />)}>
                           Add Training Data
                        </a>

                        <a class="primary" style={{ marginLeft: '15px', textAlign: 'center' }} 
                        onClick={() => importData()}>
                           Upload Training Data
                        </a>
                        
                        <a class="secondary" onClick={() => createJson()} style={{ marginLeft: '15px', textAlign: 'center' }}>
                           Submit Training Data
                        </a>                   
                     </div>
                  </div>
                  <hr />

                  
                  <div className="table-responsive px-30 py-15">

                  
                  <div className="row">
                      <div className="col-sm-4">
                        <input style={{padding: '5px !important', maxHeight:'30px !important', minHeight:'10px !important', minWidth: '400px !important'}}  type="text" className="form-control custom-input"
                         onChange={(e) => searchData(e)}
                         placeholder="Search here" />
                      </div>
                      <div className="col-sm-4">
                      <div class="dropdown" style={{ marginTop: '-15px' }}>
                          <a style={{fontSize:'35px', color:'#000000', marginBottom:'25px !important',position: 'relative',top: '-8px'}} id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            ...
                          </a>
                          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
						   <li><a class="dropdown-item" onClick={() => subPage(<CatList  loadList={loadList} subPage={subPage} />)} href="#">Manage Data Categories</a></li>
                          <li><a class="dropdown-item" href="#" onClick={() => downLoadCsv()}>Download Training Data</a></li>                                         
                          <li><hr /></li>
                          
                          <li><a class="dropdown-item" onClick={() => subPage(<ImportList  loadList={loadList} />)} href="#">Upload History</a></li>
                          
                           
                          </ul>
                        </div>
                      </div>
                      <div className="col-sm-3">
                      
                           <select style={{padding: '5px', maxHeight:'30px !important', minHeight:'10px !important', backgroundColor:'#ffffff'}} onChange={(e) => selCat(e)}>
                              <option value="">Select Data Category</option>
                              {gptCatList && gptCatList.map((rsCat) => {


                              
                                    return <option value={rsCat.label}>{rsCat.label}</option>

                               })
                              }
                           </select>
                      </div>

                  </div>
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
                              <th style={{fontFamily: 'Lexend Deca Medium', fontSize: '12px'}}><b>USER QUESTION</b></th>
                              <th style={{fontFamily: 'Lexend Deca Medium',fontSize: '12px'}}><b>BOT RESPONSE</b></th>
                              <th style={{fontFamily: 'Lexend Deca Medium',fontSize: '12px'}}><b>CATEGORY</b></th>
                              <th style={{fontFamily: 'Lexend Deca Medium',fontSize: '12px'}}><b>ACTION</b></th>
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
                                    <td width="32%" style={{fontFamily: 'Lexend Deca Light', fontSize:'12px'}}>{row.question}</td>
                                    <td width="55%" style={{fontFamily: 'Lexend Deca Light', fontSize:'12px'}}>{row.answer}</td>
                                    <td width="10%" style={{fontFamily: 'Lexend Deca Light', fontSize:'12px'}}>{(row.GptCat )  ? row.GptCat.name : 'Default'}</td>
                                    
                                    <td style={{ textAlign: 'end' }}>
                                      
                                       <a style={{ marginLeft: 5 }}  onClick={() => subPage(<Edit loadList={loadList} retrieveList={retrieveList} rs={row} />)}>
                                          
                                          <img alt={'#'} src={editIcon}  />
                                       </a>
                                       <a style={{ marginLeft: 5 }}  onClick={() => deleteMe(row.id)}>
                                          
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
               <BlankMsg message="There is no record added" icon="mdi mdi-phone-plus" buttonName="Add New Record" button={() => subPage(<CreateCat loadList={loadList} retrieveList={retrieveList} rs={rs} />)} />
            )}
         </div>
      </>
   );
};

export default List;
