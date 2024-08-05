import React from 'react';
import Modal from 'react-bootstrap/Modal';

const ConfirmModalPublish = ({visible, modalTitle, modalText, onHide, okText, modalInfo, isDelete, handleOk, handleCancel }) => {
    return (
        <div>
            <Modal
            onHide={onHide}
            show={visible}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            > 
                <div class="modal-content modalBorderRadius">

                    <div class="modal-header bg-white modalBorderRadius" style={{padding: "0.5rem 1rem"}}>
                        <h4 class="modal-title ">{modalTitle}</h4>
                        <button type="button" class="close createuser-close text-dark mr-0 pt-25 shadow-none font-weight-light" onClick={handleCancel}>&times;</button>
                    </div>
                    <div class="modalBorderSpacer mx-2"></div>
                    <div class="modal-body">
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

                    
                    <div class="modal-footer">
                        <button type="button" class="btn-sm border border-primary customfontWeight bg-white rounded-pill" onClick={handleCancel}>Cancel</button>
                        {
                            isDelete?
                            <button type="submit" class="btn-sm btn-danger customfontWeight border create-team-btn rounded-pill" onClick={handleOk}>
                                {(modalTitle) ? okText : "Yes"}
                            </button>:	
                            <button type="submit" class="btn-sm btn-primary customfontWeight border create-team-btn rounded-pill" onClick={handleOk}>
                                {(modalTitle) ? okText : "Yes"}
                            </button>		

                        }
                    </div>
                </div>
            
            </Modal>
        </div>
    );
};

export default ConfirmModalPublish;