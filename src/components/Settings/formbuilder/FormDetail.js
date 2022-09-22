import React, { useState, useEffect } from "react";
import {MenuItem, Select} from '@mui/material';
import {  TextField, SelectField, SubmitButton,CheckBoxField,TextGroupField,TextAreaField,SwtichField } from '../../crud/FormElements';
import * as Yup from 'yup';
import CrudService from "../../../services/crud.service";
import { Link } from "react-router-dom";




const FormDetail = ({row,loadList}) => {


  

  return (
    <>
    

    
      <div className="page_data_setting">

          <div className="row p-30 media-center">
                  <div className="col-sm-3">
                    <h3 className="page_heading m-0">Form {row.name} - Entries</h3>
                  </div>

          </div>
            <div className="table-responsive mx-30">
              


              <table className="table table-striped table-hover">
                 <thead className="bg-primary">
                 <tr>
                    <th>Mobile</th>
                    {
                      JSON.parse(row.Forms[0].form_data).map((rs, index) => (
                        <>
                          <th>{rs.key}</th>
                        </>

                      ))
                    }
                    </tr>
                    </thead>
 <tbody>
                    {
                      row.Forms.map((rs, index) => (

                    <tr>
                      <td>{rs.mobile_no}</td>
                      {
                       
                        JSON.parse(rs.form_data).map((ll,i) => (
                          <>
                            <td>{ll.value}</td>
                          </>

                        ))
                      }
                     
                    </tr>
                    ))}
</tbody>
                  
                  </table>
          
          </div>

      </div>

    

   
    </>
  );
};

export default FormDetail;
