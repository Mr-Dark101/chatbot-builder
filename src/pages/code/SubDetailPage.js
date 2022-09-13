import React, { useState, useEffect } from "react";

import { useParams,Link } from "react-router-dom";



const SubDetailPage = ({ddata}) => {

    const [data, setData] = useState([]);
   

 

  



  return (
    <>
    	
<div className="page_data_clinic_detail">
                <div className="heading_section">
                  <div className="row">
                    <div className="col-sm-10">
                      <h3 className="page_heading">{ddata.code} {ddata.name}</h3>
                    </div>

                    <div className="col-sm-2">
                      {ddata.billable == 'Billable/Specific Code' ? 
                      	<button type="button" className="billable_button">{ddata.billable}</button>
                      	:
                      	<button type="button" className="non_billable_button">{ddata.billable}</button>
                  	}
                    </div>
                  </div>
                </div>

                <div className="content_section">

                  <div className="text_section">
                    <h5 className="codes_main_heading">Applicable To</h5>
                    <div dangerouslySetInnerHTML={{__html: ddata.applicable}} />
                  </div>

                  <div className="text_section approximate_section">
                    <h5 className="codes_main_heading"> Approximate Synonyms </h5>
                    <div dangerouslySetInnerHTML={{__html: ddata.approx}} />
                  </div>
                  
                    <div className="text_section">
                    <h5 className="codes_main_heading">Clinical Information</h5>
                    <div dangerouslySetInnerHTML={{__html: ddata.clinic_info}} />
                  </div>

                  <div className="text_section">
                    <h5 className="codes_main_heading">
                    <div dangerouslySetInnerHTML={{__html: ddata.dr_title}} />
                    </h5>

                    <div dangerouslySetInnerHTML={{__html: ddata.dr_group}} />
                  </div>
                </div>      
                
    </div>
   
    </>
  );
};

export default SubDetailPage;
