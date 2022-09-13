import React, { useState, useEffect } from "react";
import DataService from "../../services/code.service";
import { useParams,Link } from "react-router-dom";
import SubDetail from "../SubDetail";
import DetailPage from "./DetailPage";
import SubDetailPage from "./SubDetailPage";

const SubSubCode = ({loadPage,pdata,preData}) => {

    const [data, setData] = useState([]);
    const [detailPageData, setDetailPageData] = useState('');
   

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

  const loadDetailPage = (data,type) => {
    console.log(type)
      if(type == 'main'){
        setDetailPageData(<DetailPage ddata={data} />)
      }
      if(type == 'sub'){
        setDetailPageData(<SubDetailPage ddata={data} />)
      }
      
  }
 

  return (
    <>
    <div className="codes_categories_detail_page">
          <div className="container-full">  
          <div className="content-header">
            <div className="row">
              <div className="me-auto col-sm-4">
                <h5 className="back_link"><Link onClick={() => loadPage('SubCode',preData)}>Back to Categories</Link></h5>
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
                
              </div>
        
            </div>

            <div className="me-auto mrg_top_bot_25">
              <h3 className="back_page-title">{preData.code} - {preData.name}</h3>
              <h3 className="h1">{pdata.code} - {pdata.name}</h3>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-3">
              <div className="page_data_clinic">

                <div id="navpills-1" class="tab-pane active">           
              
              <div class=" tab-pane animation-fade active" id="category-1" role="tabpanel">
                <div class="panel-group panel-group-simple panel-group-continuous" id="accordion2"
                aria-multiselectable="true" role="tablist">
                
                
                {data &&
            data.map((rs, index) => (
                   
                   

                <div class="panel">
                  <div class="panel-heading" id="question-5" role="tab">
                  <a class="panel-title" onClick={() => loadDetailPage(rs,'main')} aria-controls={`answer-${rs.id}`} aria-expanded="false" data-bs-toggle="collapse" href={`#answer-${rs.id}`} data-parent="#accordion${rs.id}">
                    {rs.code} {rs.name}
                    </a>
                  </div>
                  <div class="panel-collapse collapse" id={`answer-${rs.id}`} aria-labelledby="question-${rs.id}" role="tabpanel" data-bs-parent="#category-${rs.id}">
                  <div class="panel-body">
                    <SubDetail loadDetailPage={loadDetailPage} getId={rs.id} />
                    
                  </div>
                  </div>
                </div>
                ))}
               
                
                </div>
              </div>
              
            </div>
                

                
              </div>
            </div>

            <div className="col-sm-9">
              

                    {detailPageData}
               
            </div>
          </div>        
          </div>
      </div>
    

    
   
    </>
  );
};

export default SubSubCode;
