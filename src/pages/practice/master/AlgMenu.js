import React,{useState} from "react";

const AlgMenu = ({loadPage}) => {

 
   
  
  
const [activeClass, setActiveClass] = useState("");
  
 

  return (
    <>
      
      <div className="left_tabs_menu_section">

        <ul className="left_tabs">
         <li className={(activeClass === 'allergy_type') ? `active` : null}>
            <i className="border_left"></i>
            <a href="#" onClick={() => loadPage('Master','Allergy Type','allergy_type')}><div className="img_box"><img className="img-responsive" src="/app/images/setting_setting_icon.png" /></div> Allergy Type</a>
          </li>

           <li className={(activeClass === 'reactant') ? `active` : null}>
            <i className="border_left"></i>
            <a href="#" onClick={() => loadPage('Reactant','Reactants','reactant')}><div className="img_box"><img className="img-responsive" src="/app/images/setting_setting_icon.png" /></div> Reactants</a>
          </li>

           <li className={(activeClass === 'symptoms') ? `active` : null}>
            <i className="border_left"></i>
            <a href="#" onClick={() => loadPage('Master','Symptoms','symptoms')}><div className="img_box"><img className="img-responsive" src="/app/images/setting_setting_icon.png" /></div> Symptoms</a>
          </li>

           <li className={(activeClass === 'severity') ? `active` : null}>
            <i className="border_left"></i>
            <a href="#" onClick={() => loadPage('Master','Severity','severity')}><div className="img_box"><img className="img-responsive" src="/app/images/setting_setting_icon.png" /></div> Severity</a>
          </li> 
         

        </ul>

      </div>
    </>
  );
};

export default AlgMenu;
