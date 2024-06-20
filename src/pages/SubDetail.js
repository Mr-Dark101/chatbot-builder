import React, { useState, useEffect } from "react";
import DataService from "../services/code.service";
import { useParams,Link } from "react-router-dom";

const SubDetail = ({getId,loadDetailPage}) => {

    const [data, setData] = useState([]);
    //const { id } = useParams();

  useEffect(() => {
    retrieve(getId);
  }, []);

  

  const retrieve = (id) => {
    DataService.getAll(id)
      .then(response => {
        setData(response.data);
        
      })
      .catch(e => {
        console.log(e);
      });
  };
 

  return (
    <>
    {data &&
            data.map((rs, index) => (
    <p><a href="#" onClick={() => loadDetailPage(rs,'sub')}>{rs.code} {rs.name}</a></p>
    ))}
                    

   
    </>
  );
};

export default SubDetail;
