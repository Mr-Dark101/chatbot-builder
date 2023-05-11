import React, { useState, useEffect } from 'react';
import CrudService from '../../../services/crud.service';
import ModalPopup from '../../common/modal/ModalPopup';
import SweetAlert from 'react-bootstrap-sweetalert';
import Create from './Create';
import Edit from './Edit';

import BlankMsg from '../../common/BlankMsg';
import { toast } from 'react-toastify';
import { Tooltip } from '@mui/material';

const List = ({ rs, subPage, loadList }) => {
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
      CrudService.getAll('trainbot', true)
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
                  <div className="row px-30 py-0 media-center">
                     <div className="col-sm-9">
                        <h5 className="box-title m-0" style={{ fontWeight: 800 }}>
                           Train Bot
                        </h5>
                     </div>

                     <div className="col-sm-3">

                        <a class="dashboard_setting float-end p-2" onClick={() => createJson()} style={{ marginLeft: '15px' }}>
                           Update Content
                        </a>

                        <a class="dashboard_setting float-end p-2" onClick={() => subPage(<Create loadList={loadList} retrieveList={retrieveList} rs={rs} />)}>
                           Add Training Data
                        </a>
                     </div>
                  </div>

                  <div className="table-responsive px-30">
                     <table className="table table-hover" id="settingTbl">
                        <thead className="bg-primary">
                           <tr>
                              <th>Question</th>
                              <th>Answer</th>
                              
                              <th style={{ textAlign: 'end', paddingRight: '40px' }}>Actions</th>
                           </tr>
                        </thead>
                        <tbody>
                           {listData &&
                              listData.map((row, index) => (
                                 <tr>
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

export default List;
