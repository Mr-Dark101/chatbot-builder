import React, { useState, useEffect } from "react";
import Crud from "../../../components/crud/Crud";
import CrudService from "../../../services/crud.service";
import SweetAlert from 'react-bootstrap-sweetalert';
const Detail = ({id,change,detailUrl,editForm,retrieveList,closeModal,row}) => {

const [listData2, setListData2] = useState([]);
const [showAlert, setShowAlert] = useState(false);
const [delId, setDelId] = useState(false);

useEffect(() => {
    
    retrieveList2();
   
    
  }, [id,change]);

const deleteRow = (id) => {
        
            CrudService.deleteRow(id,detailUrl,true).then(
            (response) => {
              closeModal()  
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
const retrieveList2 = () => {
   
    
    CrudService.getAll(detailUrl + '&category_id=' + id + '&spec_cat_id=' + row.id,true)
      .then(response => {
        

        setListData2(response.data);
       
        
      })
      .catch(e => {
        console.log(e);
      });
  };
 
 const deleteMe  = (id) => {
           
            setDelId(id)
            setShowAlert(true)
    }
    const cancelAlert = () => {
          
            setShowAlert(false);
        
            
       
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
  onCancel={cancelAlert}
 
/>

)}
        {listData2 &&
                                listData2.map((rs, index) => (
                                <tr>
                                  

                                    <td >{(detailUrl === 'review_system_pre_template') ? rs.Symptom.name : rs.name}</td>
                                    <td className='text-end'>
                                        <button className="secondarysmall" onClick={() => editForm(rs)}   >Edit</button>
                                        <button style={{marginLeft:5}} className="secondarysmall" onClick={() => deleteMe(rs.id)} >Delete</button>
                                    </td>
                                </tr>
                            ))}
    </>
  );
};

export default Detail;
