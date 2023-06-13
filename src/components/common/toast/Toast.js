import React from "react";







const Toast = ({ show, closeToast, msg, children,successful }) => {



  const type = (successful) ? 'success' : 'error';
  const title = (successful) ? 'Submit Training Data' : 'Error';
  return (
    <>
     {
     show ?
     
      <div  class="jq-toast-wrap top-right">
          <div class={`jq-toast-single jq-has-icon jq-icon-${type}`} >
            
            <span class="close-jq-toast-single" onClick={closeToast}>×</span>
            <h2 class="jq-toast-heading">{title}</h2>
              {msg}.
          </div>
      </div>
      : null
     }
  
    </>
  );
};

export default Toast;