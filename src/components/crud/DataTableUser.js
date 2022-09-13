import React,{useState} from "react";

import SweetAlert from 'react-bootstrap-sweetalert';



const DataTableUser = ({ data,dataAttr,loadEdit,deleteRow,deleteAction,serviceUrl,retrieveRolePermission,loadPage,masterValue }) => {
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
  customIcon="https://raw.githubusercontent.com/djorg83/react-bootstrap-sweetalert/master/demo/assets/thumbs-up.jpg"
  title="Are you sure delete this record.?"

  
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
                 

                    <th >Name</th>
                    <th >Email</th>

                
                    <th>Action</th>
                      
                    </tr>
                </thead>
                <tbody>
                {data &&
            data.map((rs, index) => (
                  <tr key={index}>
                 

                    <td>{rs.name}</td>
                    <td>{rs.email}</td>
                    

                 

                     <td>

                     <button className="warningsmall" onClick={() => loadPage('master',masterValue,rs)}>Detail</button>

                     <button className="warningsmall" onClick={() => loadEdit(rs)}  data-bs-toggle="modal" data-bs-target="#modal-fill-edit">Edit</button>

                       {!deleteAction ? (
                         
                        <button style={{marginLeft:5}} className="warningsmall" onClick={() => deleteMe(rs.id)} >Delete</button>
                       
                       ) : null}


                       


                      

                       
                     </td>
                     
                    </tr>  
                   ))}
                           
                </tbody>
                </table>
  
    </>
  );
};

export default DataTableUser;