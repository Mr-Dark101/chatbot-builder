import React, { useState, useEffect } from "react";
import CrudService from "../../../services/crud.service";
import Platform from './Platform';


const List = ({rs,loadList,subPage}) => {

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

                    <Platform row={rs} subPage={subPage} loadList={loadList} industry_id={rs.id} />
                 </>
            ))}
         </div> 
      
          
       
   
    </>
  );
};

export default List;
