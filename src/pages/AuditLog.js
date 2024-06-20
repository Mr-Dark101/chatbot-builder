import React, { useState, useEffect } from "react";
import List from "./clinic/List";
import Create from "./clinic/Create";
import ClinicOwner from "./clinic/ClinicOwner";
import Detail from "./clinic/Detail";
import { useParams } from 'react-router';
import { useHistory} from 'react-router-dom';
import AuditLogService from "../services/auditlog.service";
const AuditLog = () => {
const [listData, setListData] = useState([]);

useEffect(() => {
    retrieveData();
  }, []);



 const retrieveData = () => {
    AuditLogService.getAll()
      .then(response => {
        setListData(response.data);
       
      })
      .catch(e => {
        console.log(e);
      });
  };

// const fieldValue = (diff) => {
//     return ( 
//       <>
        
//             {Object.keys(diff).forEach((key) => {
//                 (<div>{key}</div>)
//             }); 
//           }
        
//       </>  
//     )

// }


 // Object.keys(changedKeys).forEach((key) => {

 //    if (!isEqual(obj1[key], obj2[key])) diffObj[key] = [obj1[key], obj2[key]];
 //  });

  return (
    <>

<div className="content-header">
      <div className="d-flex align-items-center">
        <div className="me-auto">
          <h3 className="h1">Audit Log</h3>
          </div>
          </div>
          </div>


 <table className="table table-striped table-hover">
                <thead className="bg-primary">
                 <tr>
                 

                    <th>Function</th>
                    <th>Event</th>
                    <th>User</th>
                    <th>Field Name</th>
                    <th>New Value</th>
                    <th>Old Value</th>

                 
                  
                      
                    </tr>
                </thead>
                <tbody>
                {listData &&
            listData.map((rs, index) => (
                  <tr key={index}>
                  

                    <td>{rs.versionableType}</td>
                    <td>{rs.event}</td>
                    <td>{rs.user.full_name}</td>
                    <td>{rs.field_name}</td>
                    <td>{rs.new_value}</td>
                    <td>{rs.old_value}</td>

                     
                    </tr>  
                   ))}
                    
                           
                </tbody>
                </table>
  







   
    </>
  );
};

export default AuditLog;
