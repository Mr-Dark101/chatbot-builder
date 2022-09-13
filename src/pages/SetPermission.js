import React, { useState, useRef,useEffect } from "react";
import CrudService from "../services/crud.service";
import SubGroupPermission from "./SubGroupPermission";


const SetPermission = ({getRoleId,closeModal,roleName}) => {
 
 

const [roleDataa, setRoleDataa] = useState([]);

 const [isChecked, setIsChecked] = useState(true);
 const [listData, setListData] = useState([]);
 const [subGroup, setSubGroup] = useState();

 

  const [total, setTotal] = useState(0);



const meCheckBox = () => {

    setIsChecked(!isChecked);
    //e.target.checked = 'dd'
}
 

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

    CrudService.getAll('permission_group_sub?parent_id=' + group_id + '&role_id=' + getRoleId)
      .then(response => {
          setSubGroup(<SubGroupPermission role_id={getRoleId} data={response.data} />);
        
      })
      .catch(e => {
        console.log(e);
      });
  };


useEffect(() => {
   
    
    retrieveList();
    loadSub(1)

  }, []);
  
const loadSub = (group_id) => {
    retrieveListSub(group_id);
}
  
  return (
    <>
    <h5 className="modal-title">Set Permission for {roleName} Role</h5>
    <section className="content">
      <div className="row">       
        <div className="col-12">
          <div className="box">
          <div className="box-body">
            <div className="row">
              <div className="col-2">
                    {listData.map((rs, index) => (

                    <div key={index}>
                        <a href="#" onClick={() => loadSub(rs.id)}>{rs.name}</a></div>

                    ))}
               </div>

               <div className="col-10">
               


                  {subGroup}
               </div>
               
            </div>
               


            <div className="table-responsive">

          

              
              
            </div>        
          </div>
          
          </div>
        </div>
      </div>
    </section>


    </>
  );
};

export default SetPermission;
