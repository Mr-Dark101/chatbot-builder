import React, { useState, useEffect } from "react";
import DataService from "../../services/code.service";
import { Link } from "react-router-dom";
const ParentCode = ({loadPage}) => {

    const [data, setData] = useState([]);
    

  useEffect(() => {
    retrieve();
  }, []);

  

  const retrieve = () => {
    DataService.getAll()
      .then(response => {
        setData(response.data);
        
      })
      .catch(e => {
        console.log(e);
      });
  };
 

  return (
    <>
    <div className="content-header">
      <div className="d-flex align-items-center">
        <div className="me-auto">
          <h3 className="h1">Code</h3>
          
        </div>
        
      </div>
    </div>

    <section className="content">
      <div className="row">       
        <div className="col-12">
          <div className="box">
          <div className="box-body">
            <h4 className="box-title">Code</h4>
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="bg-primary">
                 <tr>
                      <th>Code</th>
                      <th>Description</th>
                     
                    </tr>
                </thead>
                <tbody>
                {data &&
            data.map((rs, index) => (
                  <tr key={index}>
                      <td>
<a href="#" onClick={() => loadPage('SubCode',rs)} >
                      {rs.code}
                      </a></td>
                      <td>{rs.name}</td>
                     
                    </tr>  
                   ))}
                           
                </tbody>
                </table>
            </div>        
          </div>
          
          </div>
        </div>
      </div>
    </section>

   
    </>
  );
};

export default ParentCode;
