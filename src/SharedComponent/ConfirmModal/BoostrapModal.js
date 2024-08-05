import React from 'react';
import Modal from 'react-bootstrap/Modal';

function BootstrapModal(props) {
    const {show, modalTitle, modalText, onHide, okText, list, isDelete, handleOk } = props;
  return (
    <Modal
      onHide={onHide}
      show={show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    > 
        <div class="modal-content modalBorderRadius">

            <div class="modal-header bg-white modalBorderRadius" style={{padding: "0.5rem 1rem"}}>
            <h4 class="modal-title ">{modalTitle}</h4>
            <button type="button" class="close createuser-close text-dark mr-0 pt-25 shadow-none font-weight-light" onClick={onHide}>&times;</button>
            </div>
            <div class="modalBorderSpacer mx-2"></div>
            <div class="modal-body">
                <p>{modalText}</p>
                {
                    list && list.length && 
                    (<div>
                        <p style={{color: "rgb(54, 58, 119)", fontWeight: "bolder"}}>Here's some information before you go ahead.</p>
                        <div>
                            <ul>
                                {
                                    list.map((res, index)=>{
                                        return <li key={index}>{res}</li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>)
                }
            </div>

            
            <div class="modal-footer">
                <button type="button" class="btn-sm border border-primary customfontWeight bg-white" onClick={onHide}>Cancel</button>
                {
                    isDelete?
                    <button type="submit" class="btn-sm btn-danger customfontWeight border create-team-btn" onClick={onHide}>{okText}</button>:	
                    <button type="submit" class="btn-sm btn-primary customfontWeight border create-team-btn" onClick={handleOk}>{okText}</button>		

                }
            </div>
        </div>
      
    </Modal>
  );
}

export default BootstrapModal;