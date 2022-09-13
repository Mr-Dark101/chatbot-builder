import React, { useState, useEffect } from "react";
import Basic from "./Detail/Basic";
import ContactDetail from "./Detail/ContactDetail";
import User from "./Detail/User";


function Detail({clinicRs}){

	const [viewPage, setViewPage] = useState('basic');


	useEffect(() => {
		
   			 getSubPage('basic');
  }, []);

  const getSubPage = (pageName,param=0) => {
     loadPage(pageName,param)
  }
  const [activeClass, setActiveClass] = useState("basic");

  const loadPage = (pageName,paramValue) => {
      
      if(pageName === 'basic'){
         setViewPage(<Basic getSubPage={getSubPage} clinicRs={clinicRs} />)
      }
      if(pageName === 'contact-detail'){
         setViewPage(<ContactDetail getSubPage={getSubPage} clinicRs={clinicRs} />)
      }

      if(pageName === 'user'){
          setViewPage(<User getSubPage={getSubPage} clinicRs={clinicRs} />)
      }

      
  }


	return(
		<>
			
	  			<div className="container-full">  
					<div className="content-header">
						<div className="d-flex align-items-center">
							<div className="me-auto">
								<h3 className="h1">{clinicRs.name}</h3>
							</div>
				
						</div>
					</div>

					<div className="row">
						<div className="col-sm-3">
							<div className="patient_tabs_bg mb-30">
				            <ul className="patient_tabs_section">
				              <li className={(activeClass === 'basic') ? `active` : null}>
				                <i className="border_left"></i>
				                <a href="#" onClick={() => getSubPage('basic')}>Basic Info</a>
				              </li>

				              

				              <li className={(activeClass === 'user') ? `active` : null}>
				                <i className="border_left"></i>
				                <a href="#" onClick={() => getSubPage('user')}>User</a>
				              </li>

			              	</ul>
			            </div>
						</div>

						<div className="col-sm-9">
							{viewPage}
						</div>
					</div>  		  
	  			</div>
		 	
		</>
	);
}

export default Detail;