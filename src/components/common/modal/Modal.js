import React from "react";
import ReactDOM from "react-dom";



const Modal = ({ show, close, title, children }) => {
  return (
    <>
     {
     show ?
     
      <div className="modal modal-fill fade" data-backdrop="false" id="modal-fill" tabIndex="-1">
    <div className="modal-dialog">
    <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={close} data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
      <div className="modal-body">
              
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

export default Modal;