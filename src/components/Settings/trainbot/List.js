import React, { useState, useEffect,useRef } from 'react';
import CrudService from '../../../services/crud.service';
import ModalPopup from '../../common/modal/ModalPopup';
import SweetAlert from 'react-bootstrap-sweetalert';
import Create from './Create';
import CreateCat from './CreateCat';
import CreateImport from './CreateImport';

import CatList from './CatList';

import Edit from './Edit';

import BlankMsg from '../../common/BlankMsg';
import { toast } from 'react-toastify';
import { Tooltip } from '@mui/material';
const BASE_URL = process.env.REACT_APP_BACKEND_URl;
const List = ({ rs, subPage, loadList }) => {

   const ref = useRef([]);

   const [listData, setListData] = useState([]);

   const [modalValue, setModalValue] = useState('');
   const [show, setShow] = useState(true);
   const [showAlert, setShowAlert] = useState(false);
   const [successful, setSuccessful] = useState(false);
   const [message, setMessage] = useState();
   const [delId, setDelId] = useState(false);

   const [checkedAll, setCheckedAll] = useState(false);
  const [checked, setChecked] = useState(false);

   useEffect(() => {
      retrieveList();
   }, []);

   const retrieveList = () => {

      CrudService.getAll('gptcat', true)
         .then((response) => {
            setListData(response.data);
            console.log(response.data);
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
      CrudService.deleteRow(id, 'trainbot', true).then(
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

   const deleteRowAll = async (id) => {
      await CrudService.deleteRow(id, 'trainbot', true)

      
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

   const deleteAll = () => {

      for (const inputName in checked) {

          if(checked[inputName]){
               deleteRowAll(inputName)
          }
          


      }

      
      retrieveList();
   }

   const toggleCheck = (inputName) => {
    setChecked((prevState) => {
      const newState = { ...prevState };
      newState[inputName] = !prevState[inputName];
      return newState;
    });
  };

  const downLoadTemplate = () => {
      document.location.href= BASE_URL + '/template.csv';
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
               customIcon=""
               title="Are you sure?"
               onConfirm={() => {
                  setShowAlert(false);
                  deleteRow(delId);
               }}
               onCancel={() => {
                  setShowAlert(false);
               }}
            />
         )}

         <div className="page_data_setting">
            {listData.length > 0 ? (
               <>
                  <div className="row px-30 py-15 media-center">
                     <div className="col-sm-4">
                        <h5 className="box-title m-0" style={{ fontWeight: 800 }}>
                           Train Bot
                        </h5>
                     </div>

                     <div className="col-sm-8 d-flex justify-content-end">
                        <a class="danger" style={{ marginLeft: '15px', textAlign: 'center' }} 

                           onClick={() => deleteAll()}>
                           Delete All
                        </a> 
                        
                        
                        <div class="dropdown" style={{ marginLeft: '15px' }}>
                          <button class="btn secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Action
                          </button>
                          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                           <li><a class="dropdown-item" onClick={() => subPage(<CreateCat loadList={loadList} retrieveList={retrieveList} rs={rs} />)} href="#">Add Category</a></li>
                            <li><a class="dropdown-item" href="#"

                              onClick={() => downLoadCsv()}

                            >Download Training Data</a></li>
                            <li><a class="dropdown-item" href="#"

                            onClick={() => subPage(<CreateImport loadList={loadList} retrieveList={retrieveList} rs={rs} />)}
                            >Import Training Data</a></li>
                            <li><a class="dropdown-item" href="#"
                              onClick={() => downLoadTemplate()}

                            >Download CSV Template</a></li>
                          </ul>
                        </div>

                        <a class="secondary" style={{ marginLeft: '15px', textAlign: 'center' }} 

                        onClick={() => subPage(<Create loadList={loadList} retrieveList={retrieveList} rs={rs} />)}>
                           Add Training Data
                        </a>

                        <a class="primary" onClick={() => createJson()} style={{ marginLeft: '15px', textAlign: 'center' }}>
                           Update Content
                        </a>                   
                     </div>
                  </div>
                  <hr />
                  <div className="table-responsive px-30 py-15">
                     <table className="table table-hover" id="settingTbl">
                        
                        <tbody>
                           {listData &&
                              listData.map((row, index) => (
                              <>
                                 <tr style={{backgroundColor:'#363A77',color:'#fff'}}>
                                    <td>{row.name}</td>
                                    
                                 </tr>
                                 <tr>
                                    <CatList id={row.id} checked={checked} toggleCheck={toggleCheck} rs={rs} subPage={subPage} loadList={loadList} />
                                 </tr> 
                                 </>
                              ))}
                        </tbody>
                     </table>
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
