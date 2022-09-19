import React, { useState, useEffect } from "react";
import CrudService from "../../services/crud.service";
import Platform from './integration/Platform';


const Integration = ({rs}) => {

const [listData, setListData] = useState([]);

useEffect(() => {
    
    retrieveList();
    
    
    
  }, []);


const retrieveList = () => {
   
   
    CrudService.getAll('industry',true)
      .then(response => {
        

        setListData(response.data);
       
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <>
      
      
       
         <div>
            <div>Industry</div>

            {listData.map((rs,index) => (
                 
                <>
                    <div><b>{rs.name}</b></div>

                    <Platform industry_id={rs.id} />
                 </>
            ))}
         </div> 
      
          
       
   
    </>
  );
};

export default Integration;
