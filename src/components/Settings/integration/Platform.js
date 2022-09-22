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
      
      
       
         <div className="integration_list_section">
            
            <ul>
            {listData.map((rs,index) => (
                 
                <>
                    
                    <li onClick={() => subPage(<PlatformHeader subPage={subPage}  loadList={loadList} retrieveList={retrieveList} rs={rs} industry_name={row.name} />)}> <div className="section_box"><div className="img_box"><img src={`https://d23e-111-119-183-60.ngrok.io/uploads/platform/${rs.logo}`} / ></div></div></li>

                    
                 </>
            ))}
            </ul>
         </div> 
      
          
       
   
    </>
  );
};

export default Platform;
