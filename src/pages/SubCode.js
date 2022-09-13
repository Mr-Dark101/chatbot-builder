import React, { useState, useEffect } from "react";
import DataService from "../services/code.service";
import { useParams,Link } from "react-router-dom";

const SubCode = () => {

    const [data, setData] = useState([]);
    const { id } = useParams();

  useEffect(() => {
    retrieve(id);
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
    <div className="">
          <div className="container-full">  
          <div className="content-header">
            <div className="row">
              <div className="me-auto col-sm-4">
                <h5 className="back_link"><a href="#">Back to Categories</a></h5>
                <h3 className="page-title">ICD 10 Codes</h3>
              </div>

              <div className="col-sm-4">
                <form className="codes_search_form">
                  <div class="input-group">
                    <input type="search" class="form-control" placeholder="Search ICD 10 Code or by Name" aria-label="Search" aria-describedby="button-addon2" />
                    <div class="input-group-append">
                    <button class="btn" type="submit" id="button-addon3"><i class="fa fa-search"></i></button>
                    </div>
                  </div>
                </form>
              </div>
              

              <div className="col-sm-4">
                <button type="button" className="btn btn_update btn-default pull-right">Import</button>
              </div>
        
            </div>

            <div className="me-auto mrg_top_bot_25">
              <h3 className="page-title">A00-B99 - Certain Infectious and Parasitic Diseases</h3>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-3">
              <div className="page_data_clinic">
                <div className="text_section">
                  <h5 className="codes_main_heading">Includes</h5>
                  <p className="codes_para">diseases generally recognized as communicable or transmissible</p>
                </div>
                
                <div className="text_section">
                  <h5 className="codes_main_heading">Additional Codes</h5>
                  <p className="codes_para">code to identify resistance to antimicrobial drugs (Z16.-)</p>
                </div>

                <div className="text_section">
                  <h5 className="codes_main_heading">Excludes 1</h5>
                  <p className="codes_para">certain localized infections - see body system-related chapters</p>
                </div>

                <div className="text_section">
                  <h5 className="codes_main_heading">Excludes 2</h5>
                  <ul className="codes_list_section">
                    <li>carrier or suspected carrier of infectious disease (Z22.-)</li>
                    <li>infectious and parasitic diseases complicating pregnancy, childbirth and the puerperium (O98.-)</li>
                    <li>infectious and parasitic diseases specific to the perinatal period (P35-P39)</li>
                    <li>influenza and other acute respiratory infections (J00-J22</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-sm-9">
              <div className="page_data_clinic_detail">
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
  <Link to={`/app/code/sub/${rs.id}`}>
                        {rs.code}
                        </Link>
                        </td>
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
      </div>
    

   
    </>
  );
};

export default SubCode;
