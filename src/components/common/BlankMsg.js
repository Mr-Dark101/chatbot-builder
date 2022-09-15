import React from "react";

const BlankMsg = ({message,icon,button,buttonName}) => {



  return (
    <>
      
      
       
          

        <div className="text-center p-40 page_not_data_section">
                <i className={`${icon}`}></i>
                <p className="mt-10 mb-30">{message}</p>
                <button type="button" onClick={button} className="btn primary">{buttonName}</button>
              </div>
       
   
    </>
  );
};

export default BlankMsg;
