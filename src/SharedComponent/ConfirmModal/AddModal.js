import React, { useState } from 'react';


const AddModal = ({modalText, handleOk, modalTitle, okText, modalId}) => {
    const [category, setCategory] = useState("");
    return (
        <>      
            <div class="modal fade" id={modalId}>
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content modalBorderRadius">

                        <div class="modal-header bg-white modalBorderRadius" style={{padding: "0.5rem 1rem"}}>
                        <h4 class="modal-title ">{modalTitle}</h4>
                        <button type="button" class="close createuser-close modal-close text-dark mr-0 pt-25 shadow-none font-weight-light" data-dismiss="modal">&times;</button>
                        </div>
                        <hr />
                        <div class="modalBorderSpacer mx-2"></div>
                        <div class="modal-body">
                            <label>Name</label>
                            <input type="text" name="cateogry" value={category} onChange={(e)=> setCategory(e.target.value)} />
                        </div>

                        
                        <div class="modal-footer">
                            <button type="button" class="btn-sm border border-primary customfontWeight bg-white rounded-pill" data-dismiss="modal">Cancel</button>
                            <button type="submit" class="btn-sm btn-primary customfontWeight border create-team-btn rounded-pill" data-dismiss="modal" onClick={handleOk} disabled={!category}>{okText}</button>		
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default AddModal;