import React, { useState, useEffect,useRef } from "react";
import {MenuItem, Select} from '@mui/material';
import {  TextField, SelectField, SubmitButton,CheckBoxField,TextGroupField,TextAreaField,SwtichField } from '../../crud/FormElements';
import * as Yup from 'yup';
import CrudService from "../../../services/crud.service";
import { Link } from "react-router-dom";
import { useDownloadExcel } from 'react-export-table-to-excel';



const FormDetail = ({row,loadList}) => {

  const tableRef = useRef(null);
  
const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: `${row.name}`,
        sheet: 'Users'
    })

  return (
    <>
    

    
      <div className="page_data_setting">

          <div className="row p-30 media-center">
                  <div className="col-sm-6">
                    <h3 className="box-title m-0">Form {row.name} - Entries</h3>
                  </div>
                  <div className="col-sm-6 text-end">


                   
                  <button type="button" className="btn btn-secondary me-10">Back</button>
                   <button type="button" className="btn btn-danger" onClick={onDownload}> Export excel </button>

               
                  </div>

          </div>

          
            <div className="table-responsive mx-30">
              


              <table className="table table-striped table-hover" ref={tableRef}>
                 <thead className="bg-primary">
                 <tr>
                    
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
