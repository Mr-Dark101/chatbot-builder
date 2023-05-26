import React,{useState} from "react";

import SweetAlert from 'react-bootstrap-sweetalert';



const DataTable = ({ data,dataAttr,loadEdit,deleteRow,deleteAction,serviceUrl,retrieveRolePermission }) => {
   const [showAlert, setShowAlert] = useState(false);
  
    const [delId, setDelId] = useState(false);

const cancelAlert = () => {
          
            setShowAlert(false);
        
            
       
    }

    const deleteMe  = (id) => {
           
            setDelId(id)
            setShowAlert(true)
    }


  return (
    <>
{showAlert && (
    <SweetAlert
  custom
  showCancel
  showCloseButton
  confirmBtnText="Yes"
  cancelBtnText="No"
  confirmBtnBsStyle="primary"
  cancelBtnBsStyle="light"
  customIcon=""
  title="Are you sure?"

  
  onConfirm={() => {
        setShowAlert(false)
        deleteRow(delId)
    }
}
  onCancel={cancelAlert}
 
/>

)}
     <table className="table table-striped table-hover">
                <thead className="bg-primary">
                 <tr>
                 {Object.keys(dataAttr).map((head, index) => (

                    <th key={index}>{head}</th>

                 ))}
                    <th>Action</th>
                      
                    </tr>
                </thead>
                <tbody>
                {data &&
            data.map((rs, index) => (
                  <tr key={index}>
                  {Object.keys(dataAttr).map((tval, index) => (

                    <td key={index}>
                    {(tval == 'Role') ? rs.Role.name : (rs[dataAttr[tval]] == true) ? 'Yes' : ''}


                    {(tval === 'Category') ? rs.SocialCategory.name : null}
                    {(tval === 'Allergy Type') ? rs.AllergyType.name : null}
                  
                    {(tval === 'Provider Type') ? (rs.ProviderType) ? rs.ProviderType.name: '' : null}
                    {(tval === 'Group') ? rs.ProviderTypeGroup.name : null}



                    {(tval !== 'Category' && tval !== 'Allergy Type' && tval !== 'Provider Type' && tval !== 'Group') ? rs[dataAttr[tval]] : null}
                    
                    </td>

                 ))}

                     <td>
                     <button className="warningsmall" onClick={() => loadEdit(rs)}  data-bs-toggle="modal" data-bs-target="#modal-fill-edit">Edit</button>

                       {!deleteAction ? (
                         
                        <button style={{marginLeft:5}} className="warningsmall" onClick={() => deleteMe(rs.id)} >Delete</button>
                       
                       ) : null}


                       


                       {serviceUrl == 'roles' ? (
                        

                             <button style={{marginLeft:5}} className="btn btn-primary btn-sm" onClick={() => retrieveRolePermission(rs.id,rs.name)} data-bs-toggle="modal" data-bs-target="#modal-fill-permission">Set Permission</button>
                       ) : null}

                       
                     </td>
                     
                    </tr>  
                   ))}
                           
                </tbody>
                </table>
  
    </>
  );
};

export default DataTable;