import React, { useState, useEffect,useRef } from 'react';
import CrudService from '../../../services/crud.service';
import ModalPopup from '../../common/modal/ModalPopup';
import SweetAlert from 'react-bootstrap-sweetalert';

import editIcon from '../../../assets/edit.svg';
import deleteIcon from '../../../assets/deleteicon.svg';
import linkIcon from '../../../assets/link-icon.png';
import ConfirmModal from '../../../SharedComponent/ConfirmModal/Modal';

import Edit from './Edit';
import { toast } from 'react-toastify';
import LinkModal from './modal';
import moment from 'moment';
import { CircularProgress } from '@mui/material';
import { API } from '../../../utils/services';
import { STRINGS } from '../../../utils/base';
import { generateToast } from '../../../utils';
const List = ({ rs, subPage, loadList }) => {

const [listData, setListData] = useState([]);
const [listDataComplete, setListDataComplete] = useState([]);
const [modalValue, setModalValue] = useState('');
const [showAlert, setShowAlert] = useState(false);
const [successful, setSuccessful] = useState(false);
const [message, setMessage] = useState();
const [delId, setDelId] = useState(false);
const [showAlertAll, setShowAlertAll] = useState(false);
const [showAlertSuccess, setShowAlertSuccess] = useState(false);
const [showModalCls, setShowModalCls] = useState(false);
const [loader, setLoader] = useState(false)
const [isPublished, setIsPublished] = useState(false)
const modalRef = useRef(null);

const [modalText, setModalText] = useState([]);
const [modalType, setModalType] = useState([]);
const [modalTitle, setModalTitle] = useState([]);
const [okText, setOkText] = useState([]);
const [modalId, setModalId] = useState([]);



  const inputElement = useRef([]);
   useEffect(() => {
      
      isBotPublished();

   }, []);

   const isBotPublished = () => {
      setLoader(true);
      const userId = localStorage.getItem('userId');
      API.get(`/user-bot?org=${userId}`)
      .then((res) => {
         if (res.status === STRINGS.API_STATUS.SUCCESS) {
            if (res.data.status === 1) {
               const result = res.data.data.find(res=> res.published);
               console.log("result:", result);
               if(result && result !== undefined){
                  setIsPublished(true);
                  retrieveList();
               }else {
                  setLoader(false);
                  setIsPublished(false);
               }
            } else {
               setLoader(false);
               setIsPublished(false);
            }
         } else {
            setLoader(false);
         }
      })
      .catch((ex) => {
         setLoader(false);
      });
   }

   const retrieveList = () => {
      setLoader(true);
      CrudService.getQrCode()
         .then((response) => {
            if(response.data.data){
               setListDataComplete([response.data.data]);               
               setListData([response.data.data])
            }
            setLoader(false);
         })
         .catch((e) => {
            setLoader(false);
         });
   };
   
   const loadModal = (show, qrState) => {
      setModalValue(
         <LinkModal 
            show={show}
            loadLinkViewCls={retrieveList} 
            closeModal={closeModal} 
            modalTitle="Create Link" 
            retrieveList={retrieveList} 
            loadList={loadList} 
            data={listData} 
         />
      );
   };

   const closeModal = () => {
      loadModal(false);
   };

   const deleteMe = (id) => {
      setDelId(id);
      modalSettings("deleteModal", "Delete Qr Code", "Are you sure you want to delete this Qr Code?", "Delete");
   };

   const modalSettings = (modalId, title, desc, okText) => {
      setModalId(modalId);
      setModalTitle(title);
      setModalText(desc);
      setOkText(okText);
      setModalType(modalId);
   };
   
   const deleteRow = (id) => {
      CrudService.deleteQrCode({
         code: listData[0].CODE,
         org_unit_id: listData[0].ORG_UNIT_ID
   }).then(
         (response) => {
            generateToast('QR Code has been deleted!', 'Success!');

            setMessage(response.data.message);
            setSuccessful(true);
            setListData([]);
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
      generateToast('QR Code has been deleted!', 'Success!');

      retrieveList()

   }

   const importData = (qrState) => {
      loadModal(true, qrState)
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

         {/* Added DC COnfirmation Modal */}
         <ConfirmModal 
            modalText={modalText}
            handleOk={
               ()=>{
                  deleteRow(delId)
               }
            } 
            modalTitle={modalTitle}
            okText={okText}
            modalId={modalId}
          />

         <div className="page_data_setting">
            <>
               <div className="row px-30 py-15 media-center">
                  <div className="col-sm-3">
                     <h5 className="box-title m-0" style={{ fontWeight: 800,width:'200px' }}>
                        Message Link

                     </h5>
                  </div>
               </div>
               <hr />

               <div className="table-responsive px-30 py-15">  
                  {!loader && (
                     (listData && listData.length)? (
                     <table className="table table-hover" id="settingTbl">
                        <thead>
                          <tr>
                            <th width="450px" style={{ fontFamily: 'Lexend Deca Medium', fontSize: '12px' }}>
                              <b>LINK</b>
                            </th>
                            <th width="400px" style={{ fontFamily: 'Lexend Deca Medium', fontSize: '12px' }}>
                              <b>CREATED ON</b>
                            </th>
                            <th style={{ fontFamily: 'Lexend Deca Medium', fontSize: '12px' }}>
                              ACTIONS
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {listData &&
                            listData.map((row, index) => (
                              <tr key={index}>
                                <td style={{ fontFamily: 'Lexend Deca Light', fontSize: '12px' }}>
                                  {row.WA_URL}
                                </td>
                                <td style={{ fontFamily: 'Lexend Deca Light', fontSize: '12px' }}>
                                  {(row.created_at)? moment(row.created_at).format("MMM DD, YYYY hh:mm A"): ""}
                                </td>
                                <td>
                                  <a onClick={() => importData(true)}>
                                    <i class="fa fa-eye"></i>
                                  </a>
                                  <a style={{ marginLeft: 9, color: '#000' }}  href={row.QR_IMAGE_URL} download="QR_Code.png">
                                    <i class="fa fa-download"></i>
                                  </a>
                                  <a data-toggle="modal" data-target="#deleteModal" style={{ marginLeft: 9 }} onClick={() => deleteMe(row.ID)}>
                                    <img alt="#" src={deleteIcon} width="17" />
                                  </a>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                     ): (
                        <div className='qr-link-container column text-center mt-5 pt-5'>
                           <img src={linkIcon} />
                           <div className='qr-link-item'>
                              <h5>Create a Message Link</h5>
                              <p class="mb-4" style={{"fontWeight": "500"}}>Create a link to trigger your help desk bot flow.</p>
                              {
                                 isPublished?
                                 (<button class="primary" onClick={() => importData(false)}>
                                    Create message link
                                 </button>) :
                                 (<button class="disable-btn" disabled>
                                    Create message link
                                 </button>)
                              }
                              
                           </div>
                        </div>
                     )
                  )}
                  {loader && (
                     <div className='d-flex justify-content-center align-items-center'>
                        <CircularProgress />
                     </div>
                  )}
               </div>
            </>

         </div>
      </>
   );
};

export default List;
