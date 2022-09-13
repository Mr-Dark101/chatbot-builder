import React from "react";

const Variable = () => {

  return (
    <>
    <div className="variable_data_bg">
      
      <h3 className="variable_main_heading">Variable</h3>

      <div class="accordion" id="accordionPanelsStayOpenExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="panelsStayOpen-headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
              Patient Information
            </button>
          </h2>
          <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
            <div class="accordion-body">
              <div className="accordion_text_section">
                <h4>Patient Name</h4>
                <p>%%Patient-Name%%</p>
              </div>

              <div className="accordion_text_section">
                <h4>Patient Name</h4>
                <p>%%Patient-Name%%</p>
              </div>

              <div className="accordion_text_section">
                <h4>Patient Name</h4>
                <p>%%Patient-Name%%</p>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
              Clinic Information
            </button>
          </h2>
          <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
            <div class="accordion-body">
              <div className="accordion_text_section">
                <h4>Patient Name</h4>
                <p>%%Patient-Name%%</p>
              </div>

              <div className="accordion_text_section">
                <h4>Patient Name</h4>
                <p>%%Patient-Name%%</p>
              </div>

              <div className="accordion_text_section">
                <h4>Patient Name</h4>
                <p>%%Patient-Name%%</p>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="panelsStayOpen-headingThree">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
              Health Record Data
            </button>
          </h2>
          <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
            <div class="accordion-body">
              <div className="accordion_text_section">
                <h4>Patient Name</h4>
                <p>%%Patient-Name%%</p>
              </div>

              <div className="accordion_text_section">
                <h4>Patient Name</h4>
                <p>%%Patient-Name%%</p>
              </div>

              <div className="accordion_text_section">
                <h4>Patient Name</h4>
                <p>%%Patient-Name%%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Variable;
