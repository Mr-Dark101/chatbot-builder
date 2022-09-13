import React, { useState, useEffect } from "react";
import RoleUser from "../../services/userList.service";





const RoleDetail = ({roleValue,roleSettting,loadEdit}) => {

    
   const [listData, setListData] = useState([]);

 
const retrieveListRole = () => {
    RoleUser.RoleUser(roleValue.id)
      .then(response => {
        setListData(response.data);
        
      })
      .catch(e => {
        console.log(e);
      });
  };
  

useEffect( () => {

    
    
    retrieveListRole();
  }, [roleValue.id]);

  return (
    <>
    <h4 className="mt-10">{roleValue.name}</h4>
    <div className="row">
    	   <div className="col-sm-12">
            <button className="btn btn-danger btn-sm mx-5">Add User</button> 
            <button className="btn btn-warning btn-sm  mx-5" onClick={() => loadEdit(roleValue)}  data-bs-toggle="modal" data-bs-target="#modal-fill-edit" >Edit Role</button> 
            <button type="button" onClick={() => roleSettting(roleValue.id,roleValue.name)} className="btn btn-success btn-sm  mx-5" >Role Setting</button>
         

            <table className="table table-striped table-hover mt-20">
                <thead className="bg-primary">
                 <tr>
                    <th>User</th>
                 </tr>
                 </thead>
                 <tbody>
                    {listData &&
            listData.map((rs, index) => (
                  <tr key={index}>
                        <td>{rs.full_name}</td>
                    </tr>
                     ))}
                 </tbody>
            </table>
         </div> 

    </div>
   
    </>
  );
};

export default RoleDetail;
