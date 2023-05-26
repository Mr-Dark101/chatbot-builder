import React, { useState, useEffect } from 'react';
import CrudService from '../../../services/crud.service';
import ModalPopup from '../../common/modal/ModalPopup';
import SweetAlert from 'react-bootstrap-sweetalert';
import Create from './Create';
import CreateCat from './CreateCat';
import Edit from './Edit';

import BlankMsg from '../../common/BlankMsg';
import { toast } from 'react-toastify';
import { Tooltip } from '@mui/material';

const CatList = ({ rs, subPage, loadList,id,ref,toggleCheck,checked }) => {

   
   const [listData, setListData] = useState([]);

   const [modalValue, setModalValue] = useState('');
   const [show, setShow] = useState(true);
   const [showAlert, setShowAlert] = useState(false);
   const [successful, setSuccessful] = useState(false);
   const [message, setMessage] = useState();
   const [delId, setDelId] = useState(false);

 

   useEffect(() => {
      retrieveList();
   }, []);

   const retrieveList = () => {
      CrudService.getAll('trainbot&category_id=' + id, true)
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
                  

                  <div className="table-responsive px-30">
                     <table className="table table-hover" id="settingTbl">
                        
                        <tbody>
                           {listData &&
                              listData.map((row, index) => (
                                 <tr>
                                    <td width="100">
                                       
                                    


                                       <input
          type="checkbox"
          name={row.id}
          onChange={() => toggleCheck(row.id)}
          checked={checked[row.id]}
          />

                                    </td>
                                    <td>{row.question}</td>
                                    <td>{row.answer}</td>
                                   
                                    
                                    <td style={{ textAlign: 'end' }}>
                                      
                                       <button style={{ marginLeft: 5 }} className="btn btn-icon btn-icon rounded-circle btn-custom" onClick={() => subPage(<Edit loadList={loadList} retrieveList={retrieveList} rs={row} />)}>
                                          <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                       </button>
                                       <button style={{ marginLeft: 5 }} className="btn btn-icon btn-icon rounded-circle btn-danger" onClick={() => deleteMe(row.id)}>
                                          <i class="fa fa-trash" aria-hidden="true"></i>
                                       </button>
                                    </td>
                                 </tr>
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

export default CatList;
