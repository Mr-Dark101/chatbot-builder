import React, { useState } from 'react';


const ConfirmModal = ({modalText, handleOk, modalTitle, okText, modalId, isDelete}) => {
    const isDeleteModal = (isDelete != "" && isDelete != undefined)? isDelete: "true";
    const [category, setCategory] = useState("");
    return (
        <>      
            <div className="modal fade" id={modalId}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content modalBorderRadius">

                        <div className="modal-header bg-white modalBorderRadius" style={{padding: "0.5rem 1rem"}}>
                        <h4 className="modal-title ">{modalTitle}</h4>
                        <button type="button" className="close createuser-close modal-close text-dark mr-0 pt-25 shadow-none font-weight-light" data-dismiss="modal">&times;</button>
                        </div>
                        {/* <hr /> */}
                        <div className="modalBorderSpacer mx-2"></div>
                        <div className="modal-body">
                            <p className="fw-normal">{modalText}</p>
                        </div>

                        
                        <div className="modal-footer">
                            <button type="button" className="btn-sm border border-primary customfontWeight bg-white rounded-pill" data-dismiss="modal">Cancel</button>
                            {
                                isDeleteModal === "true"? 
                                <button type="submit" className="btn-sm btn-danger customfontWeight border create-team-btn rounded-pill" data-dismiss="modal" onClick={handleOk}>{okText}</button>:	
                                <button type="submit" className="btn-sm btn-primary customfontWeight border create-team-btn rounded-pill" data-dismiss="modal" onClick={handleOk}>{okText}</button>		
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ConfirmModal;