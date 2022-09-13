import React, { useState, useEffect } from "react";
import CrudService from "../../services/crud.service";
import SubGroupPermission from "../SubGroupPermission";




const RoleSetting = ({role_id,role_name}) => {

    const [roleDataa, setRoleDataa] = useState([]);

 const [isChecked, setIsChecked] = useState(true);
 const [listData, setListData] = useState([]);
 const [subGroup, setSubGroup] = useState();
   

const meCheckBox = () => {

    setIsChecked(!isChecked);
    //e.target.checked = 'dd'
}

 useEffect(() => {
   
    
    retrieveList();
    

  }, []);

   const retrieveList = () => {
    CrudService.getAll('permission_group?parent_id=0')
      .then(response => {
        setListData(response.data);

        
      })
      .catch(e => {
        console.log(e);
      });
  };

const retrieveListSub = (group_id) => {

    CrudService.getAll('permission_group_sub?parent_id=' + group_id + '&role_id=' + role_id)
      .then(response => {
        
          setSubGroup(<SubGroupPermission role_id={role_id} data={response.data} />);
        
      })
      .catch(e => {
        console.log(e);
      });
  };

const loadSub = (group_id) => {
    retrieveListSub(group_id);
}

  return (
    <>
    <div className="row">
               <div className="col-sm-3 setting_tabs">
                  <div className="d-flex align-items-center mx-20">
                      <div className="me-auto">
                        <h3 className="tabs_main_title">{role_name}</h3>
                      </div>
            
                   </div>

                  <ul className="left_tabs mt-5">

                   {listData.map((rs, index) => (
                    <li key={index}>
                       <a href="#" onClick={() => loadSub(rs.id)}>{rs.name}</a>
                    </li>
                    ))}
                    
                  </ul>
              </div>

              <div className="col-9">
               


                  {subGroup}
               </div>

      </div>

    
    </>
  );
};

export default RoleSetting;
