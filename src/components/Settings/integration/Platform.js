import React, { useState, useEffect } from "react";
import CrudService from "../../../services/crud.service";
import PlatformHeader from './PlatformHeader';
import placeholder from '../../../assets/setting/placeholder.png';
const Platform = ({industry_id,subPage,loadList,row}) => {

const [listData, setListData] = useState([]);
const bUrl = process.env.REACT_APP_BACKEND_URl;
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
                    
                    <li onClick={() => subPage(<PlatformHeader subPage={subPage}  loadList={loadList} iRs={rs.Integration} rs={rs} industry_name={row.name} />)}> 
                    <div className="section_box">
                        <div className="img_box">
                            <img src={`${bUrl}/uploads/platform/${rs.logo}`} / >

                </div></div></li>

                    
                 </>
            ))}

            <li> 
                    <div className="section_box">
                        <div className="img_box">
                            <img src={placeholder} / >

                </div></div></li>
            </ul>

            
         </div> 
      
          
       
   
    </>
  );
};

export default Platform;
