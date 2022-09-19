import React, { useState, useEffect } from "react";
import CrudService from "../../../services/crud.service";

const Platform = ({industry_id}) => {

const [listData, setListData] = useState([]);

useEffect(() => {
    
    retrieveList();
    
    
    
  }, []);


const retrieveList = () => {
   
   
    CrudService.getAll('platform&industry_id=' + industry_id,true)
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
            

            {listData.map((rs,index) => (
                 
                <>
                    <div><b>{rs.name}</b></div>

                    
                 </>
            ))}
         </div> 
      
          
       
   
    </>
  );
};

export default Platform;
