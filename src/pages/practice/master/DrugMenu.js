import React,{useState} from "react";

const DrugMenu = ({loadPage}) => {

 
   
  
  
const [activeClass, setActiveClass] = useState("");
  
 

  return (
    <>
      

<div className="left_tabs_menu_section">
      <ul className="left_tabs">
              <li className={(activeClass === 'drug_list') ? `active` : null}>
                <i className="border_left"></i>
                <a href="#" onClick={() => loadPage('drugs')}><div className="img_box"><img className="img-responsive" src="/app/images/setting_setting_icon.png" /></div> Drug List</a>
              </li>

               <li className={(activeClass === 'drug_form') ? `active` : null}>
                <i className="border_left"></i>
                <a href="#" onClick={() => loadPage('Master','Forms','drug_form')}><div className="img_box"><img className="img-responsive" src="/app/images/setting_setting_icon.png" /></div> Form</a>
              </li>

               <li className={(activeClass === 'drug_route') ? `active` : null}>
                <i className="border_left"></i>
                <a href="#" onClick={() => loadPage('Master','Routes','drug_route')}><div className="img_box"><img className="img-responsive" src="/app/images/setting_setting_icon.png" /></div> Routes</a>
              </li>

               <li className={(activeClass === 'drug_sponser') ? `active` : null}>
                <i className="border_left"></i>
                <a href="#" onClick={() => loadPage('Master','Sponser','drug_sponser')}><div className="img_box"><img className="img-responsive" src="/app/images/setting_setting_icon.png" /></div> Sponser</a>
              </li>

              <li className={(activeClass === 'marketing_status') ? `active` : null}>
                <i className="border_left"></i>
                <a href="#" onClick={() => loadPage('Master','Marketing Status','marketing_status')}><div className="img_box"><img className="img-responsive" src="/app/images/setting_setting_icon.png" /></div> Mareting Status</a>
              </li>


             

            </ul>
</div>
   
    </>
  );
};

export default DrugMenu;
