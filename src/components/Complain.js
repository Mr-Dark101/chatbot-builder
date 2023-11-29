import React, { useEffect, useState, useContext } from 'react';
import back_icon from '../assets/back-icon.svg';
import { STRINGS } from '../utils/base';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CrudService from "../services/crud.service";
import { CloseBotComposer, removingBreadcrumb, resetState } from './Dashboard/slices/dashboard.slice';
import { Form, TextField, SelectField } from './crud/FormElements';
import * as Yup from 'yup';
import {
    Formik,
    Form as FormikForm,
    Field,
    ErrorMessage,
    useFormikContext,
    useField,
    useFormik
} from 'formik';

const Complain = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [listData, setListData] = useState([]);
	const [listCatData, setListCatData] = useState([]);
	const handleBack = () => {
      history.push(`${STRINGS.ROUTES.ROOT}?org=${localStorage.getItem('userId')}`);
      dispatch(resetState());
      dispatch(removingBreadcrumb());
   };

   useEffect(() => {
   	retrieveListCat();
    retrieveList();
  }, []);


  const retrieveListCat = () => {
    CrudService.getAll('helptopic',true)
      .then(response => {
        setListCatData(response.data);
        
      })
      .catch(e => {
        console.log(e);
      });
  };
  

  const retrieveList = () => {
    CrudService.getAll('helpcomplain',true)
      .then(response => {
        setListData(response.data);
        
      })
      .catch(e => {
        console.log(e);
      });
  };
  const getDetail = (detail) => {

  		const detailData = JSON.parse(detail)[0].value;
  		return detailData;
  }

  const getTopic = (rs) => {
  		let cat = listCatData.filter(rss => rss.id == rs.category_id)[0]?.name;
  		if(rs.sub_category_id != 0){
  			const subCat = listCatData.filter(rss => rss.id == rs.sub_category_id)[0]?.name;

  			cat = cat + " > " + subCat;
  		}
  		return cat;
  }

  const getDepartment = (rs) => {
  		let depart = "";
  		if(rs.sub_category_id != 0){
  			 depart = listCatData.filter(rss => rss.id == rs.sub_category_id)[0]?.HelpDepartment?.name;

  			
  		}else{
  			 depart = listCatData.filter(rss => rss.id == rs.category_id)[0]?.HelpDepartment?.name;
  		}
  		return depart;
  }

  const getPriority = (rs) => {
  		let priority = "";
  		if(rs.sub_category_id != 0){
  			 priority = listCatData.filter(rss => rss.id == rs.sub_category_id)[0]?.priority_id;

  			
  		}else{
  			 priority = listCatData.filter(rss => rss.id == rs.category_id)[0]?.priority_id;
  		}
  		if(priority == 1){
  			return "Hight";
  		}

  		if(priority == 2){
  			return "Low";
  		}

  		if(priority == 3){
  			return "Medium";
  		}
  		
  }
  const printStatus = (status_id) => {
  		if(status_id == 1){
  			return 'Open'
  		}

  		if(status_id == 10){
  			return 'Hold'
  		}
  }

  const [formData, setFormData] = useState({
     
      ticket_id:'',
      priority:'',
      help_topic:'',
      status:'',
      from:'',
      date:'',
      
   });
const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
      
   };
   const FormSchema = Yup.object().shape({
      ticket_id: Yup.string().required('Required'),
     
   });

	return (

			<div className="ws-hld">
		         <div className="head">
		            <div className="head-rt">
		               <div onClick={handleBack} className="icon">
		                  <img style ={{ padding: "5px"}}alt={'#'} src={back_icon} />
		               </div>
		               <div className="txt">Complain</div>
		            </div>

		            <div className="head-lft">
		               <div className="btn-hld"></div>
		            </div>
		         </div>

             <div className="complain_box_section">
                  <ul>
                    <li>
                      <div className="complain_box">
                        <h1>10000</h1>

                        <p>Total Tickets</p>
                      </div>
                    </li>

                    <li>
                      <div className="complain_box" style={{borderWidth: 1,borderColor: '#FF7272'}}>
                        <h1>100</h1>

                        <p>Open Tickets</p>
                      </div>
                    </li>

                    <li>
                      <div className="complain_box" style={{borderWidth: 1,borderColor: '#00BC57'}}>
                        <h1>850</h1>

                        <p>Closed Tickets</p>
                      </div>
                    </li>

                    <li>
                      <div className="complain_box" style={{borderWidth: 1,borderColor: '#DD9F00'}}>
                        <h1>50</h1>

                        <p>On Hold Tickets</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <Form enableReinitialize validationSchema={FormSchema} initialValues={formData} onSubmit={onSubmit}>
                 <div className="search_box_section">
                  <ul>
                    <li style={{width: '10%'}}>
                      <div className="field_section">                        
                         <TextField name="ticket_id" label="Ticket #" placeholder="" />
                      </div>
                    </li>

                    <li style={{width: '20%'}}>
                      <div className="field_section">                        
                         <TextField name="help_topic" label="Help Topic" placeholder="" />
                      </div>
                    </li>

                    <li style={{width: '15%'}}>
                      <div className="field_section">                        
                         <TextField name="from" label="From" placeholder="" />
                      </div>
                    </li>

                    <li style={{width: '10%'}}>
                      <div className="field_section">                        
                         <TextField name="priority" label="Priority" placeholder="" />
                      </div>
                    </li>

                    <li style={{width: '12%'}}>
                      <div className="field_section">                        
                         <TextField name="date" label="Date Range" placeholder="" />
                      </div>
                    </li>

                    <li style={{width: '10%'}}>
                      <div className="field_section">                        
                         <TextField name="status" label="Status" placeholder="" />
                      </div>
                    </li>

                    <li style={{width: '12%'}}>
                      <button className="primary">Apply Filter</button>
                    </li>
                  </ul>
                 </div>
                </Form>

		         <div className="page_data_setting mx-30">
      {
                  (listData.length > 0) ? (
                    <>

                <div className="complain_data_section">
<div className="table-responsive">
                <table className="table table-hover">
                 <thead className="bg-primary">
                    <tr>
                      <th className="text_center">Ticket #</th>
                      <th>Help Topic</th>
                      
                      <th>Details</th>
                      <th>From</th>
                      <th>Priority</th>
                      <th>Department</th>
                      <th>Created On</th>
                      <th>Status</th>
                    </tr>
                    </thead>
 <tbody>
                    {listData &&
            listData.map((row, index) => (

                    <tr>
                      <td className="text_center">{row.id}</td>
                      <td>{getTopic(row)}</td>
                      <td>

                      		{getDetail(row.complain_data)}
                      </td>
                     	
                      <td>
                      	{row.from}
                      </td>
                      <td>
                      	{getPriority(row)}
                      </td>
                      <td>
                      	{getDepartment(row)}
                      </td>
                      <td>{row.created_at}</td>
                      <td>
                      	{printStatus(row.status_id)}
                      </td>
                    </tr>
                    ))}
</tbody>
                  
                  </table>
                  </div>
                  </div>
                    </>


                  ) : (

                    <div>There is no ticket</div>


                  )
                }
            
       </div>


		     </div>
		)
}
export default Complain