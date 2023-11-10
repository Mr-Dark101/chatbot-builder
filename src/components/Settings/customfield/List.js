import React, { useState, useEffect } from "react";
import CrudService from "../../../services/crud.service";
import ModalPopup from "../../common/modal/ModalPopup";
import SweetAlert from 'react-bootstrap-sweetalert';
import Create from "./Create";
import Edit from "./Edit";
import BlankMsg from '../../common/BlankMsg';
import {toast } from 'react-toastify';
import editIcon from '../../../assets/edit.svg';
import deleteIcon from '../../../assets/deleteicon.svg';

const List = ({rs,subPage,loadList}) => {
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
    CrudService.getAll('helpcustomfield',true)
      .then(response => {
        setListData(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
const loadModal = (title,children) => {
      
        setModalValue(
         
        <ModalPopup show={'true'} close={closeModal} title={title} >
            {children}
        </ModalPopup>
        
        )
    
 }

const closeModal = () => {

      
      setModalValue('')
  }

const deleteMe  = (id) => {
           
            setDelId(id)
            setShowAlert(true)
    }

    const deleteRow = (id) => {
       
            CrudService.deleteRow(id,'helpcustomfield',true).then(
            (response) => {
              toast("Record has been deleted!",{type: toast.TYPE.SUCCESS})
              setMessage(response.data.message);
              setSuccessful(true);
              retrieveList();
            },
            (error) => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();

              //setMessage(resMessage);
              //setSuccessful(false);
            }
          );
    }


  return (
    <>
      
      {showAlert && (
    <SweetAlert
  custom
  showCancel
  confirmBtnText="Yes"
  cancelBtnText="No"
  confirmBtnBsStyle="primary"
  cancelBtnBsStyle="light"
  customIcon=""
  title="Are you sure?"

  
  onConfirm={() => {
        setShowAlert(false)
        deleteRow(delId)
    }
}
/>

)}
       
          
      <div className="page_data_setting">
      {
                  (listData.length > 0) ? (
                    <>
                      <div className="row px-30 py-15 media-center">
                        <div className="col-sm-3">
                          <h5 className="box-title m-0" style={{ fontWeight: 800,width:'200px' }}>Custom Field</h5>
                        </div>

                        <div className="col-sm-9">
                          <button type="button" onClick={() => subPage(<Create loadList={loadList} retrieveList={retrieveList} rs={rs} />)} className="btn primary float-end">Add New Custom Field</button>
                        </div>
                      </div>

                      <hr />

<div className="table-responsive px-30 py-15">
                <table className="table table-hover">
                 <thead className="bg-primary">
                    <tr>
                      <th style={{fontFamily: 'Lexend Deca Medium', fontSize: '12px'}}>Name</th>
                     
                      
                      <th style={{fontFamily: 'Lexend Deca Medium', fontSize: '12px'}}></th>
                    </tr>
                    </thead>
 <tbody>
                    {listData &&
            listData.map((row, index) => (

                    <tr>
                      <td><a style={{fontFamily: 'Lexend Deca Light', fontSize:'12px',color: '#000',fontWeight: 400}} href="#">{row.name}</a></td>
                      
                     
                      <td style={{ textAlign: 'end' }}>
                                      
                         <a style={{ marginLeft: 5 }}  onClick={() => subPage(<Edit  loadList={loadList} retrieveList={retrieveList} rs={row} />)}>
                            
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

                  <BlankMsg message="There are no custom field added" icon="mdi mdi-phone-plus" buttonName="Add Custom Field" button={ () => subPage(<Create loadList={loadList} retrieveList={retrieveList} rs={rs} />)} />


                  )
                }
            
       </div>
   
    </>
  );
};

export default List;