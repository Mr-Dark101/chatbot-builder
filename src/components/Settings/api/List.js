import React, { useState, useEffect } from "react";
import CrudService from "../../../services/crud.service";
import ModalPopup from "../../common/modal/ModalPopup";
import SweetAlert from 'react-bootstrap-sweetalert';
import Create from "./Create";
import Edit from "./Edit";
import BlankMsg from '../../common/BlankMsg';
import {toast } from 'react-toastify';
import plus_icon from '../../../assets/built_add_icon.svg';
import shopify from '../../../assets/setting/shopify.svg';
import edit_icon from '../../../assets/Custom Size - 4/edit.svg';
import delete_icon from '../../../assets/Custom Size - 4/Icon metro-cancel.svg';

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
    CrudService.getAll('api_bot',true)
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
       
            CrudService.deleteRow(id,'patient_insurance',true).then(
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
  showCloseButton
  confirmBtnText="Yes"
  cancelBtnText="No"
  confirmBtnBsStyle="primary"
  cancelBtnBsStyle="light"
  customIcon="https://raw.githubusercontent.com/djorg83/react-bootstrap-sweetalert/master/demo/assets/thumbs-up.jpg"
  title="Are you sure delete this record.?"

  
  onConfirm={() => {
        setShowAlert(false)
        deleteRow(delId)
    }
}
/>

)}
       
          
      <div className="page_data_setting">
      <div className="row">
      <div className="col-sm-8 p-0">
      <div className="api_list_page">
      {
                  (listData.length > 0) ? (
                    <>
                      <div className="row px-30 py-20 media-center">
                  <div className="col-sm-3">
                    <h3 className="page_heading m-0">My API’s</h3>
                  </div>

                  <div className="col-sm-9">
                    <button type="button" onClick={() => subPage(<Create loadList={loadList} retrieveList={retrieveList} rs={rs} />)} className="btn btn_custom_api pull-right"><img src={plus_icon} /> Add New Custom Api</button>
                  </div>
                </div>

<div className="table-responsive ms-10">
                <table className="table">
                 <thead>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      
                      <th></th>
                    </tr>
                    </thead>
 <tbody>
                    {listData &&
            listData.map((row, index) => (

                    <tr>
                      <td>
                      <div className="api_box_section">
                        <div className="img_box">
                          <img src={shopify} />
                        </div>

                        <div className="text_section">
                          <h5><a href="#">{row.name}</a></h5>
                          <p>A small brief about this API goes here.</p>
                        </div>
                      </div></td>
                      <td>{row.api_type}</td>
                     
                      <td>
                      <div className="button_section">
                        <button className="api_edit_button" onClick={() => subPage(<Edit  loadList={loadList} retrieveList={retrieveList} rs={row} />)} ><img src={edit_icon} /></button>
                        <button style={{marginLeft:5}} className="api_edit_button" onClick={() => deleteMe(row.id)} ><img src={delete_icon} /></button>
                      </div>
                      </td>
                    </tr>
                    ))}
</tbody>
                  
                  </table>
                  </div>
                    </>


                  ) : (

                  <BlankMsg message="There are no api details added" icon="mdi mdi-phone-plus" buttonName="Add API" button={ () => subPage(<Create loadList={loadList} retrieveList={retrieveList} rs={rs} />)} />


                  )
                }
                </div>
                </div>
                <div className="col-sm-4 ps-0 pe-10">
                  <div className="available_api_section">
                    <h5>Available API’s</h5>

                    <table className="table">
                      <tr>
                        <td>
                          <div className="api_box_section">
                            <div className="img_box">
                              <img src={shopify} />
                            </div>

                            <div className="text_section">
                              <h5><a href="#">Order Search</a></h5>
                              <p>A small brief about this API goes here.</p>
                            </div>
                          </div>
                        </td>

                        <td>
                          <p className="useless_link"><a href="#">Use This API</a></p>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div className="api_box_section">
                            <div className="img_box">
                              <img src={shopify} />
                            </div>

                            <div className="text_section">
                              <h5><a href="#">Order Search</a></h5>
                              <p>A small brief about this API goes here.</p>
                            </div>
                          </div>
                        </td>

                        <td>
                          <p className="useless_link"><a href="#">Use This API</a></p>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div className="api_box_section">
                            <div className="img_box">
                              <img src={shopify} />
                            </div>

                            <div className="text_section">
                              <h5><a href="#">Order Search</a></h5>
                              <p>A small brief about this API goes here.</p>
                            </div>
                          </div>
                        </td>

                        <td>
                          <p className="useless_link"><a href="#">Use This API</a></p>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div className="api_box_section">
                            <div className="img_box">
                              <img src={shopify} />
                            </div>

                            <div className="text_section">
                              <h5><a href="#">Order Search</a></h5>
                              <p>A small brief about this API goes here.</p>
                            </div>
                          </div>
                        </td>

                        <td>
                          <p className="useless_link"><a href="#">Use This API</a></p>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
        </div>
            
       </div>
   
    </>
  );
};

export default List;