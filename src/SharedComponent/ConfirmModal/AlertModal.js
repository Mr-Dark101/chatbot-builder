import React from 'react';
import Modal from 'react-bootstrap/Modal';

const ConfirmModal = ({ visible, modalTitle, modalText, onHide, okText, modalInfo, handleOk, handleCancel }) => {
   return (
      <Modal
         onHide={onHide}
         show={visible}
         size="md"
         aria-labelledby="contained-modal-title-vcenter"
         centered
      > 
          <div className="modal-content modalBorderRadius">

              <div className="modal-header bg-white modalBorderRadius" style={{padding: "0.5rem 1rem"}}>
                  <h4 className="modal-title ">{modalTitle}</h4>
                  <button type="button" className="close createuser-close text-dark mr-0 pt-25 shadow-none font-weight-light" onClick={handleCancel}>&times;</button>
              </div>
              <div className="modalBorderSpacer mx-2"></div>
              <div className="modal-body">
                  <p className="fw-normal">{modalText}</p>
                  {
                      (modalInfo && modalInfo.length)?
                      (<div>
                          <p style={{color: "rgb(54, 58, 119)", fontWeight: "bolder"}}>Here's some information before you go ahead.</p>
                          <div>
                              <ul>
                                  {
                                      modalInfo.map((res, index)=>{
                                          return <li key={index}>{res}</li>
                                      })
                                  }
                              </ul>
                          </div>
                      </div>):
                      ""
                  }
              </div>

              
              <div className="modal-footer">
                  <button type="button" className="btn-sm border border-primary customfontWeight bg-white rounded-pill" onClick={handleCancel}>Cancel</button>
                  <button type="submit" className="btn-sm btn-primary customfontWeight border create-team-btn rounded-pill" onClick={handleOk}>
                     {(modalTitle) ? okText : "Yes"}
                  </button>	
              </div>
          </div>
      
      </Modal>
   );
};

export default ConfirmModal;
