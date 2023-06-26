import React, { useState, useEffect,useRef } from "react";
import {MenuItem, Select} from '@mui/material';
import {  TextField, SelectField, SubmitButton,CheckBoxField,TextGroupField,TextAreaField,SwtichField } from '../../crud/FormElements';
import * as Yup from 'yup';
import CrudService from "../../../services/crud.service";
import { Link } from "react-router-dom";
import { useDownloadExcel } from 'react-export-table-to-excel';
import List from './List.js'



const FormDetail = ({row,loadList,subPage}) => {

  const [contentPage, setContentPage] = useState('');

  const tableRef = useRef(null);
  
const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: `${row.name}`,
        sheet: 'Users'
    })


  const getFormData = (data,label) => {
      const dataValue = JSON.parse(data)
      let obj = dataValue.find(o => o.key === label);
      return  obj?.value
  }

  return (
    <>
    

    
      <div className="page_data_setting">

          <div className="row p-30 media-center">
                  <div className="col-sm-6">
                    <h4 className="box-title m-0" style={{fontWeight:800}}>{row.name} - Entries</h4>
                  </div>
                  <div className="col-sm-6 text-end">


                   
                  <button type="button" onClick={() => subPage(<List rs={loadList} subPage={subPage}  />)} className="btn btn-outline-danger me-10" style ={{borderColor: "#dc3545 !important"}}>Back</button>
                   <button type="button" className="btn btn-primary" onClick={onDownload}> Export to excel </button>

               
                  </div>

          </div>

          
            <div className="table-responsive mx-30">
              
              

              <table className="table table-hover" ref={tableRef}>
                 <thead className="bg-primary">
                 <tr>
                    
                    {
                      JSON.parse(row.form_data).map((rs, index) => (
                        <>
                          <th>{rs.label}</th>
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
                       
                        JSON.parse(row.form_data).map((rsHead, indexHead) => (
                          <>
                            <td style= {{fontFamily: 'Lexend Deca Light'}}>{getFormData(rs.form_data,rsHead.label)}</td>
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
