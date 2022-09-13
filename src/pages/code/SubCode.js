import React, { useState, useEffect } from "react";
import DataService from "../../services/code.service";
import { useParams,Link } from "react-router-dom";

const SubCode = ({loadPage,pdata}) => {

    const [data, setData] = useState([]);
    

  useEffect(() => {
    retrieve(pdata.id);
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
                <h5 className="back_link"><Link onClick={() => loadPage('parent')}>Back to Categories</Link></h5>
                <h3 className="h1">ICD 10 Codes</h3>
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
                <button type="button" className="primary pull-right">Import</button>
              </div>
        
            </div>

            <div className="me-auto mrg_top_bot_25">
              <h3 className="h1">{pdata.code} - {pdata.name}</h3>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-3">
              <div className="page_data_clinic">
                <div className="text_section">
                  <h5 className="codes_main_heading">Includes</h5>
                  
                      

                       {pdata.include_data &&
                     JSON.parse(pdata.include_data).map((edata,index) => (
                  
                        <p className="codes_para">{edata}</p>
                    ))}
                    
                </div>
                
                <div className="text_section">
                  <h5 className="codes_main_heading">Additional Codes</h5>

                  {pdata.use_additional_code &&
                     JSON.parse(pdata.use_additional_code).map((edata,index) => (
                  
                        <p className="codes_para">{edata}</p>
                    ))}
                  
                </div>

                <div className="text_section">
                  <h5 className="codes_main_heading">Excludes 1</h5>
                  {pdata.exclude_data_1 &&
                     JSON.parse(pdata.exclude_data_1).map((edata,index) => (
                  
                        <p className="codes_para">{edata}</p>
                    ))}
                  
                </div>

                <div className="text_section">
                  <h5 className="codes_main_heading">Excludes 2</h5>
                 
                  <ul className="codes_list_section">
                  {pdata.exclude_data_2 &&
                     JSON.parse(pdata.exclude_data_2).map((edata,index) => (
                  
                    <li>{edata}</li>
                    ))}
                    
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-sm-9">
              <div className="page_data_clinic">
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
  <a  href="#" onClick={() => loadPage('SubSubCode',rs,pdata)}>
                        {rs.code}
                        </a>
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
