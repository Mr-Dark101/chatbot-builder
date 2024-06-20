import React, { useState, useEffect } from "react";
import DataService from "../services/code.service";
import { useParams,Link } from "react-router-dom";
import SubDetail from "./SubDetail";

const SubSubCode = () => {

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
    <div className="codes_categories_detail_page">
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
                
              </div>
        
            </div>

            <div className="me-auto mrg_top_bot_25">
              <h3 className="back_page-title">A00-B99 - Certain Infectious and Parasitic Diseases</h3>
              <h3 className="page-title">A00-A09 - Intestinal infectious diseases </h3>
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
                  <a class="panel-title" aria-controls={`answer-${rs.id}`} aria-expanded="false" data-bs-toggle="collapse" href={`#answer-${rs.id}`} data-parent="#accordion${rs.id}">
                    {rs.code} {rs.name}
                    </a>
                  </div>
                  <div class="panel-collapse collapse" id={`answer-${rs.id}`} aria-labelledby="question-${rs.id}" role="tabpanel" data-bs-parent="#category-${rs.id}">
                  <div class="panel-body">
                    <SubDetail getId={rs.id} />
                    
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
              <div className="page_data_clinic">

                <div className="row">
                  <div className="col-sm-6">
                    <h3 className="page_heading">Cholera A00</h3>
                  </div>

                  <div className="col-sm-6">
                    <button type="button" className="non_billable_button">Non-Billable/Non-Specific Code</button>
                  </div>
                </div>
                
                  <div className="text_section">
                  <h5 className="codes_main_heading">Clinical Information</h5>
                  <ul className="codes_list_section">
                    <li>Acute diarrheal disease endemic in India and southeast Asia whose causative agent is vibrio cholerae; can lead to severe dehydration in a matter of hours unless quickly treated.</li>
                    <li>An acute diarrheal disease endemic in India and southeast Asia whose causative agent is vibrio cholerae. This condition can lead to severe dehydration in a matter of hours unless quickly treated.</li>
                    <li>Cholera is a bacterial infection that causes diarrhea. The cholera bacterium is usually found in water or food contaminated by feces . Cholera is rare in the United States. You may get it if you travel to parts of the world with inadequate water treatment and poor sanitation, and lack of sewage treatment. Outbreaks can also happen after disasters. The disease is not likely to spread directly from one person to another. Often the infection is mild or without symptoms, but sometimes it can be severe. Severe symptoms include profuse watery diarrhea, vomiting, and leg cramps. In severe cases, rapid loss of body fluids leads to dehydration and shock. Without treatment, death can occur within hours. Doctors diagnose cholera with a stool sample or rectal swab. Treatment includes replacing fluid and salts and sometimes antibiotics. Anyone who thinks they may have cholera should seek medical attention immediately. Dehydration can be rapid so fluid replacement is essential. Centers for Disease Control and Prevention.</li>
                  </ul>
                </div>      
                </div>
            </div>
          </div>        
          </div>
      </div>
    <div className="content-header">
      <div className="d-flex align-items-center">
        <div className="me-auto">
          <h3 className="page-title">Sub Sub Code</h3>
          
        </div>
        
      </div>
    </div>

    <section className="content">
      <div className="row">       
        <div className="col-12">
          <div className="box">
          <div className="box-body">
            <h4 className="box-title">Sub Code</h4>
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
<Link to={`/app/code/${rs.id}`}>
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
    </section>

   
    </>
  );
};

export default SubSubCode;
