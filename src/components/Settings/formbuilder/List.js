import React, { useState, useEffect } from 'react';
import CrudService from '../../../services/crud.service';
import ModalPopup from '../../common/modal/ModalPopup';
import SweetAlert from 'react-bootstrap-sweetalert';
import Create from './Create';
import Edit from './Edit';
import FormDetail from './FormDetail';
import BlankMsg from '../../common/BlankMsg';
import { toast } from 'react-toastify';
import { Tooltip } from '@mui/material';
import editIcon from '../../../assets/edit.svg';
import deleteIcon from '../../../assets/deleteicon.svg';
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";


const BlueOnGreenTooltip = styled(({ className, ...props }) => (
   <Tooltip {...props} componentsProps={{ tooltip: { className: className } }} />
 ))(`
     color: white;
     background-color: black;
 `);

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
      CrudService.getAll('form_builder', true)
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
      CrudService.deleteRow(id, 'form_builder', true).then(
         (response) => {
            toast('Form has been deleted!', { type: toast.TYPE.SUCCESS });
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

            confirmBtnText="Delete"
            cancelBtnText="Cancel"
            confirmBtnBsStyle="primary"
            cancelBtnBsStyle="light"
            customIcon=""
            customClass="containerBoxAlert"
            title="Delete Form"
            onConfirm={() => {
               setShowAlert(false);
               deleteRow(delId);
            }}
            onCancel={() => {
               setShowAlert(false);
            }}

             reverseButtons={true}
         >
         Are you sure you want to delete this form?
         </SweetAlert>  
         )}

         <div className="page_data_setting">
            {listData.length > 0 ? (
               <>
                  <div className="row px-30 py-0 media-center">
                     <div className="col-sm-9">
                        <h5 className="box-title m-0" style={{ fontWeight: 800 }}>
                           My Forms
                        </h5>
                     </div>

                     <div className="col-sm-3">
                        <a class="dashboard_setting float-end p-2 mb-5" onClick={() => subPage(<Create loadList={loadList} retrieveList={retrieveList} rs={rs} />)}>
                           Create Form
                        </a>
                     </div>
                  </div>

                  <div className="table-responsive px-30">
                     <table className="table table-hover" id="settingTbl">
                        <thead className="bg-primary">
                           <tr>
                              <th width="21%" style={{fontFamily: 'Lexend Deca Medium', fontSize:'13px'}}>FORM NAME</th>
                              <th width="43%" style={{fontFamily: 'Lexend Deca Medium', fontSize:'13px'}}>FORM DESCRIPTION</th>
                              <th width="28%" style={{textAlign:'center',fontFamily: 'Lexend Deca Medium', fontSize:'13px'}}>FORM ENTRIES</th>
                              <th width="8%" style={{minWidth: '110px',textAlign:'start',fontFamily: 'Lexend Deca Medium', fontSize:'13px'}}>ACTION</th>
                           </tr>
                        </thead>
                        <tbody>
                           {listData &&
                              listData.map((row, index) => (
                                 <tr>
                                    <td width="21%" style={{fontFamily: 'Lexend Deca Light', fontSize:'13px'}}>{row.name}</td>
                                    <td width="43%" style={{ maxWidth: '110px', minWidth: '110px',fontFamily: 'Lexend Deca Light', fontSize:'13px' }}>{row.description}</td>
                                    <td width="28%" style={{textAlign:'center',fontFamily: 'Lexend Deca Light', fontSize:'13px'}}>
                                       {row.Forms.length > 0 ? (
                                          <a href="#" onClick={() => subPage(<FormDetail subPage={subPage} loadList={loadList} row={row} />)}>
                                             {row.Forms.length}
                                          </a>
                                       ) : (
                                          0
                                       )}
                                    </td>

                                    <td width="8%" style={{ textAlign: 'start' }}>
                                       <BlueOnGreenTooltip title={'View Form Data'}>
                                          <button className="btn btn-icon btn-icon" onClick={() => subPage(<FormDetail subPage={subPage} loadList={loadList} row={row} />)}>
                                             <i class="fa fa-external-link" aria-hidden="true" style={{ color: '#000', fontSize: '15px',marginTop: 2,marginLeft:'-8px' }}></i>
                                          </button>
                                       </BlueOnGreenTooltip>
                                       <a style={{ marginLeft: 2 }}  onClick={() => subPage(<Edit loadList={loadList} retrieveList={retrieveList} rs={row} />)}>
                                          
                                          <img alt={'#'} src={editIcon}  />
                                       </a>
                                       <a style={{ marginLeft: 5 }}  onClick={() => deleteMe(row.id)}>
                                          
                                          <img alt={'#'} src={deleteIcon} width="20" />
                                       </a>
                                      
                                    </td>
                                 </tr>
                              ))}
                        </tbody>
                     </table>
                  </div>
               </>
            ) : (
               <BlankMsg message="There is no form added" icon="mdi mdi-phone-plus" buttonName="Add Form" button={() => subPage(<Create loadList={loadList} retrieveList={retrieveList} rs={rs} />)} />
            )}
         </div>
      </>
   );
};

export default List;
