import React, { useState, useEffect } from "react";
import CrudService from "../../../services/crud.service";
import PlatformHeader from './PlatformHeader';
const Platform = ({industry_id,subPage,loadList,row}) => {

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
            
            <ul>
            {listData.map((rs,index) => (
                 
                <>
                    
                    <li onClick={() => subPage(<PlatformHeader subPage={subPage}  loadList={loadList} retrieveList={retrieveList} rs={rs} industry_name={row.name} />)}> <img src={`http://localhost:3050/uploads/platform/${rs.logo}`} / ><br/><b>{rs.name}</b></li>

                    
                 </>
            ))}
            </ul>
         </div> 
      
          
       
   
    </>
  );
};

export default Platform;
