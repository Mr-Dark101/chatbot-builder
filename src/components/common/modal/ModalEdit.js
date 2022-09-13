import React from "react";
import ReactDOM from "react-dom";



const ModalEdit = ({ show, close, title, children }) => {
  return (
    <>
     {
     show ?
     
      <div className="modal fade bs-example-modal-lg show modal_popup_section" style={{display:'block'}} tabIndex="-1" aria-labelledby="myLargeModalLabel"   aria-hidden="true">
    <div className="modal-dialog modal-lg">
    <div className="modal-content">
        <div className="modal-header px-35">
            <h5 className="h3">{title}</h5>
            <button type="button" onClick={close} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
      <div className="modal-body px-35">
              
          {children}
          
       


      </div>
      
    </div>
    </div>
  </div>
      : null
     }
  
    </>
  );
};

export default ModalEdit;