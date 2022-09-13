import React, { useState, useEffect } from "react";

import { useParams,Link } from "react-router-dom";



const DetailPage = ({ddata}) => {

    const [data, setData] = useState([]);
   

 

  



  return (
    <>
    <div className="page_data_clinic">
    	<div className="row">
                      <div className="col-sm-6">
                        <h3 className="page_heading">{ddata.name} {ddata.code}</h3>
                      </div>

                      <div className="col-sm-6">
                      {ddata.billable == 'Billable/Specific Code' ? 
                      	<button type="button" className="billable_button">{ddata.billable}</button>
                      	:
                      	<button type="button" className="non_billable_button">{ddata.billable}</button>
                  	}
                        
                      </div>
                    </div>
                
                    <div className="text_section">
                      <h5 className="codes_main_heading">Clinical Information</h5>
                      <div dangerouslySetInnerHTML={{__html: ddata.clinic_info}} />
                    </div>      

    </div>
   
    </>
  );
};

export default DetailPage;
