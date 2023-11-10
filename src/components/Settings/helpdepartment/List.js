import React, { useState, useEffect } from "react";
import CrudService from "../../../services/crud.service";
import ModalPopup from "../../common/modal/ModalPopup";
import SweetAlert from 'react-bootstrap-sweetalert';
import Create from "./Create";
import Edit from "./Edit";
import BlankMsg from '../../common/BlankMsg';
import {toast } from 'react-toastify';

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
    CrudService.getAll('helpdepartment',true)
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
       
            CrudService.deleteRow(id,'helpdepartment',true).then(
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
                      <div className="row p-30 media-center">
                  <div className="col-sm-3">
                    <h3 className="page_heading m-0">Custom Field</h3>
                  </div>

                  <div className="col-sm-9">
                    <button type="button" onClick={() => subPage(<Create loadList={loadList} retrieveList={retrieveList} rs={rs} />)} className="btn primary float-end">Add New Custom Field</button>
                  </div>
                </div>

<div className="table-responsive mx-30">
                <table className="table table-striped table-hover">
                 <thead className="bg-primary">
                    <tr>
                      <th>Name</th>
                     
                      
                      <th></th>
                    </tr>
                    </thead>
 <tbody>
                    {listData &&
            listData.map((row, index) => (

                    <tr>
                      <td><a href="#">{row.name}</a></td>
                      
                     
                      <td>
                      <button className="warningsmall" onClick={() => subPage(<Edit  loadList={loadList} retrieveList={retrieveList} rs={row} />)} >Edit</button>
                      <button style={{marginLeft:5}} className="warningsmall" onClick={() => deleteMe(row.id)} >Delete</button>
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