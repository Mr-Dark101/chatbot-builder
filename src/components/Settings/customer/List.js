import React, { useState, useEffect } from "react";
import CustomerDataService from "../../../services/customer.service";

import { useHistory} from 'react-router-dom';
import {Button,LinkCustom} from "../../common/button/button";
const List = ({getPage}) => {

    const [clinicData, setClinicData] = useState([]);
const history = useHistory();
  useEffect(() => {
    retrieveCustomer();
  }, []);

  

  const retrieveCustomer = () => {
    CustomerDataService.getAll()
      .then(response => {
        setClinicData(response.data);
       
      })
      .catch(e => {
        console.log(e);
      });
  };

  const createDomain = (rs) => {
      getPage('owner',rs);
  }

  const detailPage = (rs) => {
     //history.push('/app/clinicdetail/' + rs.id)
      getPage('detail',rs);
  }
 

  return (
    <>
    
    

    <section className="content box-body">

    <div className="content-header">
      <div className="d-flex align-items-center">
        <div className="me-auto">
          <h4 className="box-title">Customer</h4>
          
        </div>
        
      </div>
    </div>
      <div className="row">       
        <div className="col-12">
          <div className="box">
          <div className="box-body">
            
             <div className="row media-center mb-20">
                <div className="col-8">
                  <h4 className="box-title">Customer</h4>
                </div>
                <div className="col-4 text-end">
                  <Button permissionKey="clinic-create" className="btn primary" onClick={() => getPage('create')} title="Create New Customer" />
                  
                </div>
            </div>

            <div class="table-responsive rounded card-table">
              <table className="table table-striped table-hover">
                <thead className="bg-primary">
                 <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      
                      
                   
                    
                    </tr>
                </thead>
                <tbody>
                {clinicData &&
            clinicData.map((rs, index) => (
                  <tr key={index}>
                      <td>

                        <LinkCustom   permissionKey="clinic-edit" onClick={() => detailPage(rs)} title={rs.name} />
                      </td>
                      <td>{rs.email}</td>
                      <td>{rs.phone}</td>
                      
                      
                      
                    
                     
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

export default List;
