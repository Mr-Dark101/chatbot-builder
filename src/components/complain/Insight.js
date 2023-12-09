import React, { useEffect, useState, useContext } from 'react';
import back_icon from '../../assets/back-icon.svg';
import { STRINGS } from '../../utils/base';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CrudService from "../../services/crud.service";
import { CloseBotComposer, removingBreadcrumb, resetState } from './../Dashboard/slices/dashboard.slice';
import CountStatus from './charts/CountStatus'
import HelpTopic from './charts/HelpTopic'
import Department from './charts/Department'
import * as Yup from 'yup';
import moment from 'moment';
import { Form, TextField, SelectField,DatePicker,SubmitButton } from './../crud/FormElements';

const Insight = () => {
const [listData, setListData] = useState({});
const [open, setOpen] = useState(false);
useEffect(() => {
    loadData();
   
  }, []);


const loadData = (from,to) => {
    CrudService.dashboardData(from,to)
      .then(response => {
        setListData(response.data.data);
        
      })
      .catch(e => {
        console.log(e);
      });
  };

const [formData, setFormData] = useState({
     
      from:'',
      to:'',
    
   });

const FormSchema = Yup.object().shape({
      from: Yup.string().required('Required'),
      to: Yup.string().required('Required'),
      
   });

const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
      let from = values.from;

      from = moment(from).format('YYYY-MM-DD');

      let to = values.to;

      to = moment(to).format('YYYY-MM-DD');
      
      
      setSubmitting(false)
      loadData(from,to)
   };

	return (

			<div className="ws-hld"> 
          <Form validationSchema={FormSchema} initialValues={formData} onSubmit={onSubmit}>
          <div className="insight_page_section insight_field_section py-0 mb-30">
            <div className="d-flex justify-content-between align-items-center">
              <div className="field_section w_40">                        
                 



               <DatePicker name="from" label="From" placeholder="From" />

               <DatePicker name="to" label="To" placeholder="To" />

               <SubmitButton title="Filter" className="btn btn-primary" />

              </div>

              <div>
                <button className="btn_export">Export</button>
              </div>
            </div> 
          </div>
          </Form>
        
          <div className="complain_box_section">
            <ul>
              <li>
                <div className="complain_box">
                  <h1>{listData?.total_complain}</h1>

                  <p>Total Tickets</p>
                </div>
              </li>

              <li>
                <div className="complain_box">
                  <h1>{listData?.complain_Open}</h1>

                  <p>Open Tickets</p>
                </div>
              </li>

              <li>
                <div className="complain_box">
                  <h1>{listData?.complain_close}</h1>

                  <p>Closed Tickets</p>
                </div>
              </li>

              <li>
                <div className="complain_box">
                  <h1>{listData?.complain_hold}</h1>

                  <p>On Hold Tickets</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <div className="insight_page_section mb-30">
              <div className="chart_section">
                <p>Complaints Count by Status</p>

                <div className="chart_box"> 
                    <CountStatus listData={listData} />
                </div>
              </div>
            </div>

            <div className="d-flex">
              <div className="insight_page_section me-30" style={{width: '50%'}}>
                <div className="chart_section">
                  <div className="d-flex justify-content-between">
                    <p>Complaints by Help Topic</p>

                    <p>Complaints by Help Topic</p>
                  </div>

                  <div className="chart_box"> 
                    <HelpTopic listData={listData} />
                  </div>
                </div>
              </div>  

              <div className="insight_page_section" style={{width: '50%'}}>
                <div className="chart_section">
                  <p>Complaints by Department</p>

                  <div className="chart_box"> 
                    <Department listData={listData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
		)
}

export default Insight;