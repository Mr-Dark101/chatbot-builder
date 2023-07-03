import React, { useState, useEffect } from 'react';
import CrudService from '../../../services/crud.service';
import ModalPopup from '../../common/modal/ModalPopup';
import SweetAlert from 'react-bootstrap-sweetalert';
import Create from './Create';
import Edit from './Edit';

import BlankMsg from '../../common/BlankMsg';
import { toast } from 'react-toastify';
import plus_icon from '../../../assets/built_add_icon.svg';
import api from '../../../assets/setting/api.png';
import editIcon from '../../../assets/edit.svg';
import deleteIcon from '../../../assets/deleteicon.svg';

const List = ({ rs, subPage, loadList }) => {
   const [listData, setListData] = useState([]);

   const [listTemplateData, setListTemplateData] = useState([]);

   const [modalValue, setModalValue] = useState('');
   const [show, setShow] = useState(true);
   const [showAlert, setShowAlert] = useState(false);
   const [successful, setSuccessful] = useState(false);
   const [message, setMessage] = useState();
   const [delId, setDelId] = useState(false);

   const API_URL = process.env.REACT_APP_BACKEND_URl;

   useEffect(() => {
      retrieveList();
      retrieveListTemplate();
   }, []);

   const retrieveListTemplate = () => {
      CrudService.getAll('api_template&build_type=T', true)
         .then((response) => {
            setListTemplateData(response.data);
         })
         .catch((e) => {
            console.log(e);
         });
   };

   const retrieveList = () => {
      CrudService.getAll('api_bot&build_type=C', true)
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

   const registerThisApi = (row) => {
      const data = row;

      CrudService.register(data, 'api_bot', true).then(
         (response) => {
            retrieveList();
         },
         (error) => {
            const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            setMessage(resMessage);
            setSuccessful(false);
         }
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
      CrudService.deleteRow(id, 'api_bot', true).then(
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

   return (
      <>
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
            title="Delete API"
            onConfirm={() => {
               setShowAlert(false);
               deleteRow(delId);
            }}
            onCancel={() => {
               setShowAlert(false);
            }}

             reverseButtons={true}
         >
         Are you sure you want to delete this API?
         </SweetAlert>  
         )}

         <div className="page_data_setting">
            <div className="row">
               <div className="col-sm-9 p-0">
                  <div className="api_list_page">
                     <div className="row px-30 py-20 media-center">
                        <div className="col-sm-3">
                           <h5 style={{ fontWeight: 800 }} className="box-title m-0">
                              My APIs
                           </h5>
                        </div>

                        <div className="col-sm-9">
                           <button type="button" onClick={() => subPage(<Create loadList={loadList} retrieveList={retrieveList} rs={rs} />)} className="btn primary float-end">
                              <img src={plus_icon} /> Create API
                           </button>
                        </div>
                     </div>

                     <div className="table-responsive mx-30">
                        <table className="table">
                           <thead>
                              <tr>
                                 <th>API NAME</th>
                                 <th>API TYPE</th>
                                 <th className='float-end'>ACTION</th>
                              </tr>
                           </thead>
                           <tbody>
                              {listData &&
                                 listData.map((row, index) => (
                                    <tr>
                                       <td>
                                          <div className="api_box_section">
                                             <div className="img_box">
                                                {row.build_type == 'C' ? (
                                                   <img src={'https://icons.veryicon.com/png/o/internet--web/internet-simple-icon/api-management.png'} width="40" />
                                                ) : (
                                                   <img src={`${API_URL}/uploads/platform/${row.Platform.logo}`} width="50" />
                                                )}
                                             </div>

                                             <div className="text_section">
                                                <h5>
                                                   <a href="#">{row.name}</a>
                                                </h5>
                                                <p>{row.description}</p>
                                             </div>
                                          </div>
                                       </td>
                                       <td style={{ fontFamily: 'Lexend Deca Light', fontSize:'12px' }}>{row.api_type}</td>
                                       <td>
                                          <div className="button_section">
                                             {row.build_type == 'C' ? (
                                                <a style={{ marginLeft: 5 }}   onClick={() => subPage(<Edit loadList={loadList} retrieveList={retrieveList} rs={row} />)}>
                                                <img alt={'#'} src={editIcon}  />
                                                </a>
                                             ) : null}

                                            
                                             <a style={{ marginLeft: 5 }}  onClick={() => deleteMe(row.id)}>
                                                <img alt={'#'} src={deleteIcon} width="20" />
                                             </a>
                                          </div>
                                       </td>
                                    </tr>
                                 ))}
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
               <div className="col-sm-3 ps-0 pe-10">
                  <div className="available_api_section">
                     <h5 class="box-title m-0" style={{ fontWeight: 800, height: '80px !important', fontSize: '19px !important', color: '#000', display: 'table-cell', verticalAlign: 'middle', overflow: 'hidden' }}>
                        Open APIs
                     </h5>

                     <table className="table" style={{ height: '400px',margin:'0', backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <div class="imgBg">
                           <img alt="" src="/static/media/api.0e97429d.svg" />
                        </div>
                        <div className="peraWrap">
                           <h5 style={{ fontSize: '15px', fontWeight: 800, color: '#000' }}>Open APIs feature coming soon!</h5>
                           <h6 style={{ fontSize: '12px', marginTop: '-10px' }}>We will notify you once this feature is available</h6>
                        </div>
                        {listTemplateData &&
                           listTemplateData.map((row, index) => (
                              <tr>
                                 <td>
                                    <div className="api_box_section">
                                       <div className="img_box">
                                          <img src={`${API_URL}/uploads/platform/${row.Platform.logo}`} width="50" />
                                       </div>

                                       <div className="text_section">
                                          <h5>
                                             <a href="#">{row.name}</a>
                                          </h5>
                                          <p>{row.description}</p>
                                       </div>
                                    </div>
                                 </td>

                                 <td>
                                    <p className="useless_link">
                                       <a href="#" onClick={() => registerThisApi(row)}>
                                          Use This API
                                       </a>
                                    </p>
                                 </td>
                              </tr>
                           ))}
                     </table>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default List;
