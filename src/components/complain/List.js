import React, { useEffect, useState, useContext } from 'react';
import back_icon from '../../assets/back-icon.svg';
import { STRINGS } from '../../utils/base';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CrudService from "../../services/crud.service";
import { CloseBotComposer, removingBreadcrumb, resetState } from './../Dashboard/slices/dashboard.slice';
import { Form, TextField, SelectField } from './../crud/FormElements';
import Select from 'react-select';
import {toast } from 'react-toastify';
import ModalPopup from '../common/modal/ModalPopup';
import Detail from './Detail'
import * as Yup from 'yup';
import Pagination from "@material-ui/lab/Pagination";
import {
    Formik,
    Form as FormikForm,
    Field,
    ErrorMessage,
    useFormikContext,
    useField,
    useFormik
} from 'formik';

const List = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [listData, setListData] = useState([]);
	const [listCatData, setListCatData] = useState([]);
  const [modalValue, setModalValue] = useState('');
  const [topicList, setTopicList] = useState([]);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const pageSizes = [3, 6, 9];


	const handleBack = () => {
      history.push(`${STRINGS.ROUTES.ROOT}?org=${localStorage.getItem('userId')}`);
      dispatch(resetState());
      dispatch(removingBreadcrumb());
   };

   useEffect(() => {
   	retrieveListCat();
    retrieveList();
    retrieveMasterList('helptopicparent')
  }, [page, pageSize]);


   const retrieveMasterList = (url) => {
      CrudService.ListValue('master/list-value?type=' + url)
         .then((response) => {
           

            if (url == 'helptopicparent') {
               
               setTopicList(response.data);
               
               
               
            }
            

           
         })
         .catch((e) => {
            console.log(e);
         });
   };


   const loadModal = (title, children) => {
      setModalValue(
         <ModalPopup show={'true'} close={closeModal} title={title} >
            {children}
         </ModalPopup>
      );
   };
   const closeModal = () => {
      setModalValue('');
   };

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
    const params = getRequestParams(page, pageSize);
    CrudService.getAll('helpcomplain',true,params)
      .then(response => {


         const { dataRow, totalPages } = response.data;
         console.log(dataRow)
        setListData(dataRow);
        setCount(totalPages);
        
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
  			return "High";
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

  		if(status_id == 5){
  			return 'Hold'
  		}
      if(status_id == 10){
        return 'Close'
      }
  }

  const [formData, setFormData] = useState({
     
      ticket_id:'',
      priority:'',
      help_topic:'',
      status_id:'',
      from:'',
      date:'',
      
   });
const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
        const params = getRequestParams(page, pageSize);
        CrudService.getAllComplainFilter(values,params)
      .then(response => {
       

        const { dataRow, totalPages } = response.data;
         console.log(dataRow)
        setListData(dataRow);
        setCount(totalPages);
        
      })
      .catch(e => {
        console.log(e);
      });
        console.log(values)
      
   };
   const FormSchema = Yup.object().shape({
      
     
   });

   const statusList = [
      { value: 1, label: 'Open' },
      { value: 5, label: 'Hold' },
      { value: 10, label: 'Close' },
      
   ];

   const priorityList = [
      { value: '1', label: 'High' },
      { value: '2', label: 'Low' },
      { value: '3', label: 'Medium' },
      
   ];

   const onChange = (value,id) => {
    const saveData = {
      id:id,
      status_id:value.value
    }
     CrudService.edit(saveData, 'helpcomplain', true).then(
         (response) => {
            //setModalValue('')
            toast("Ticket status has been updated",{type: toast.TYPE.SUCCESS,fontWeight:600})
            //loadList();
            //setMessage(response.data.message);
            //setSuccessful(true);

            
         },
         (error) => {
            const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            //setMessage(resMessage);
            //setSuccessful(false);
         }
      );
  };

  const ViewDetail = (rs) => {
   
      
      loadModal('View Detail',<Detail getDepartment={getDepartment} getTopic={getTopic} getDetail={getDetail} closeModal={closeModal} rs={rs} title="View Detail"  />)
 }


 const getRequestParams = (page, pageSize) => {
    let params = {};

    

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

    const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };




	return (

  <>
  {modalValue}

			<div className="ws-hld">
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
                         

                         <SelectField 
                                     name="help_topic"
                                     label="Help Topic"
                                     options={topicList}
                                   />
                      </div>
                    </li>

                    <li style={{width: '15%'}}>
                      <div className="field_section">                        
                         
                          <TextField name="from" label="From" placeholder="" />
                          
                      </div>
                    </li>

                    <li style={{width: '10%'}}>
                      <div className="field_section">                        
                         

                         <SelectField 
                                     name="priority"
                                     label="Priority"
                                     options={priorityList}
                                   />

                      </div>
                    </li>

                    <li style={{width: '12%'}}>
                      <div className="field_section">                        
                         <TextField name="date" label="Date Range" placeholder="" />
                      </div>
                    </li>

                    <li style={{width: '10%'}}>
                      <div className="field_section">                        
                         <SelectField 
                                     name="status_id"
                                     label="Status"
                                     options={statusList}
                                   />
                      </div>
                    </li>

                    <li style={{width: '12%'}}>
                      <button className="primary">Apply Filter</button>
                    </li>
                  </ul>
                 </div>
                </Form>

		         <div className="page_data_setting">
      {
                  (listData?.length > 0) ? (
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
            listData?.map((row, index) => (

                    <tr>
                      <td className="text_center">

                      <a onClick={() => ViewDetail(row)}>
                      {row.id}
                      </a>
                      </td>
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
                      	
                        
                        <Select 
                          options={statusList}
                          defaultValue={statusList.find((option) => option.value === row.status_id)}
                          value={statusList.find((option) => option.value === row.status_id)}
                          onChange={(value) => onChange(value,row.id)}
                        />
                      </td>
                    </tr>
                    ))}
</tbody>
                  
                  </table>



                  <Pagination
            className="my-3"
            count={count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />


                  </div>
                  </div>
                    </>


                  ) : (

                    <div>There is no ticket</div>


                  )
                }
            
       </div>


		     </div>
         </>
		)
}

export default List;