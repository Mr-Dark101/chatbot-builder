import React, { useState, useEffect } from "react";
import DataService from "../../services/cptcode.service";
import { Link } from "react-router-dom";
import Modal from "../../components/common/modal/Modal";
import {toast } from 'react-toastify';
import { generateToast } from "../../utils";
const List = ({loadPage}) => {

    const [data, setData] = useState([]);
    const [successful, setSuccessful] = useState(false);

  const [message, setMessage] = useState();

  const [modal, setModal] = useState(true);
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
const [isSelected, setIsSelected] = useState(false)

  const Toggle = () => setModal(!modal);

  const closeModal = () => {

      setSuccessful(false)
      setMessage('')
  }
    

  useEffect(() => {
    retrieve();
  }, []);

  

  const retrieve = () => {
    DataService.getAll()
      .then(response => {
        setData(response.data);
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  const handleSubmission = () => {
    const formData = new FormData();

    formData.append('file', selectedFile);

   // data.append('file', this.state.selectedFile)

    DataService.importdata(formData).then(
        (response) => {
          setMessage(response.data.message);
          //setSuccessful(true);         
          generateToast(response.data.message, 'Success!');

          retrieve();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
         
          generateToast(resMessage, 'Failed!', false);

        }
      );
  };
 

  return (
    <>

    <Modal show={modal} title={'Import CPT Codes'} close={closeModal}>
     {!successful && (
            

              <div>
      <input type="file" name="file" onChange={changeHandler} />
      {isSelected ? (
        <div>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Size in bytes: {selectedFile.size}</p>
          <p>
            lastModifiedDate:{' '}
            {selectedFile.lastModifiedDate.toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
      <div>
        <button onClick={handleSubmission}>Submit</button>
      </div>
    </div>



            )}
            {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
    </Modal>
    <div className="content-header">
      <div className="d-flex align-items-center">
        <div className="me-auto">
          <h3 className="h1">CPT Codes</h3>
          
        </div>
        
      </div>
    </div>

    <section className="content">
      <div className="row">       
        <div className="col-12">
          <div className="box">
          <div className="box-body">


          <div className="row">
                
                <div className="col-12 text-end">
                  <button className="primary" data-bs-toggle="modal" data-bs-target="#modal-fill">Import Codes</button>
                </div>
            </div>
            <br />
            
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="bg-primary">
                 <tr>
                      <th>Code</th>
                      <th>Description</th>
                     
                    </tr>
                </thead>
                <tbody>
                {data &&
            data.map((rs, index) => (
                  <tr key={index}>
                      <td>

                      {rs.code}
                      </td>
                      <td>{rs.code_name}</td>
                     
                    </tr>  
                   ))}
                           
                </tbody>
                </table>
            </div>        
          </div>
          
          </div>
        </div>
      </div>
    </section>

   
    </>
  );
};

export default List;
