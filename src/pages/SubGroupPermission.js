import React, { useState, useEffect,useRef } from "react";
import RolePermissionService from "../services/roles_permission.service";


const SubGroupPermission = ({data,role_id}) => {



const inputRef = useRef([]);


const meClick = (id,permissionID) => {
  inputRef.current[permissionID].checked = (inputRef.current[permissionID].checked) ? true : false;


  RolePermissionService.updatePermission(role_id,permissionID,inputRef.current[permissionID].checked).then(
        (response) => {
       
          
          
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          
        }
      );
  
  
}
useEffect(() => {
   console.log(data)
    data.map((rs, index) => {
        rs.p.map((prs, indexp) => {
            
            if(prs.permission_id){
                inputRef.current[prs.id].checked = true
            }
            
        })
    })
    

  }, [data]);

  return (
    <>

    
      {data &&
            data.map((rs, index) => (
            <div>

            <div className="d-flex align-items-center">
        <div className="me-auto">
            <h3 className="tabs_main_title">{rs.groupName}</h3>
        </div>
                        
    </div>
            <ul className="left_tabs mt-5">

            {rs.p &&
            rs.p.map((prs, indexp) => (
                <div className="row">
                    <div className="col-10">{prs.name}</div>

                    <div className="col-2">



                   
                          <input type="checkbox"  ref={el => inputRef.current[prs.id] = el} onClick={() => meClick(prs.id,prs.id)}  id={`md_checkbox_${prs.id}`} value={prs.id}    />
                      
                          
                          <label for={`md_checkbox_${prs.id}`}></label>


                    </div>

               
                </div>

            
      
      ))}
      </ul>
            </div>

            
      
      ))}
    </>
  );
};

export default SubGroupPermission;
