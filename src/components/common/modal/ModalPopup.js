import React from "react";
import ReactDOM from "react-dom";



const ModalPopup = ({ show, close, title, children }) => {


  return (
    <>
     {
     show ?
     
      
      <div className="modal fade bs-example-modal-lg show modal_popup_section" style={{display:'flex',alignItems:'center'}} tabIndex="-1" aria-labelledby="myLargeModalLabel"   aria-hidden="true">
    <div className="modal-dialog modal-lg">
    <div className="modal-content">
        <div className="modal-header px-15" style={{background:'#363a77'}}>
            <h6 style={{color:'#fff',margin:'0',fontFamily:'Lexend Deca Light', fontSize: '14px !important',fontWeight: 600,letterSpacing:'0.3px',lineHeight:'22px'}}>{title}</h6>


           {/* <button type="button" aria-label="Close" onClick={close} class="ant-modal-close"><span class="ant-modal-close-x"><span role="img" aria-label="close" class="anticon anticon-close ant-modal-close-icon"><svg viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg></span></span></button> */}
            
        </div>
      <div className="modal-body px-15" style={{minWidth:'500px'}}  >
              
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

export default ModalPopup;