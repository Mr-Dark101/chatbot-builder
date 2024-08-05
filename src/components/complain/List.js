import React, { useEffect, useState, useContext } from 'react';
import { STRINGS } from '../../utils/base';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CrudService from "../../services/crud.service";
import { CloseBotComposer, removingBreadcrumb, resetState } from './../Dashboard/slices/dashboard.slice';
import { Form, TextField, SelectFieldNoLabel,DatePicker, CustomSelectFieldNoLabel, NumberField } from './../crud/FormElements';
import {toast } from 'react-toastify';
import ModalPopup from '../common/modal/ModalPopup';
import Detail from './Detail'
import * as Yup from 'yup';
import moment from 'moment';
import { CSVLink } from "react-csv";
import ReactDataTables from '../../SharedComponent/DataTables';
import DateRangePicker from './DateRangePicker';
import toastr from 'toastr';
import { generateToast } from '../../utils';


const List = () => {
  const BASE_URL = process.env.REACT_APP_BACKEND_URl;
	const history = useHistory();
  const [open, setOpen] = useState(false);
	const dispatch = useDispatch();
	const [listData, setListData] = useState([]);
	const [listCatData, setListCatData] = useState([]);
  const [modalValue, setModalValue] = useState('');
  const [topicList, setTopicList] = useState([]);
  const [filter, setFilter] = useState({});

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const [initialStartDate, setInitialStartDate] = useState("");
  const [initialEndDate, setInitialEndDate] = useState("");
  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });
  const [formState, setFormState] = useState({
    ticket_id:'',
    priority:'',
    help_topic:'',
    status_id:'',
    requestor:'',
  });

  const pageSizes = [3, 6, 9];


	const handleBack = () => {
      history.push(`${STRINGS.ROUTES.ROOT}?org=${localStorage.getItem('userId')}`);
      dispatch(resetState());
      dispatch(removingBreadcrumb());
   };

   useEffect(() => {
    (async function(){
      const catList = await retrieveListCat();
      retrieveList(catList);
      retrieveMasterList('helptopicparent')
    })();
  }, [page, pageSize]);


  

  const downLoadCsv = () => {
      CrudService.exportData()
         .then((response) => {
               let orgUnitId = localStorage.getItem('org_unit_id');
               document.location.href= BASE_URL + '/export_ticket_' + orgUnitId + '.csv';
         })
         .catch((e) => {
            console.log(e);
         });
  }


   const retrieveMasterList = (url) => {
      CrudService.ListValue('master/list-value?type=' + url)
         .then((response) => {
            if (url == 'helptopicparent') {
              response.data.unshift({value:'',label:'Help Topic'
              // , isDisabled: true
            })
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

  const retrieveListCat = async() => {
   try{
    const response = await CrudService.getAll('helptopic',true);
    if(response) {
      console.log(response.data);
      setListCatData(response.data);
      return response.data;
    }
   }catch(err){
    console.log(err);

   }
  };
  

  const retrieveList = (catList) => {
    let params = getRequestParams(page, pageSize);
    let from  = moment(moment().subtract(1, 'month').startOf('month'));
    let to = moment();

    setSelectedRange({from, to });
    setInitialStartDate(from);
    setInitialEndDate(to);

    params = { ...params, from: from.format('YYYY-MM-DD'), to: to.format('YYYY-MM-DD')};

    CrudService.getAll('helpcomplain',true,params)
      .then(response => {


         let { dataRow, totalPages } = response.data;
         dataRow = dataRow?.map((row) => ({
          id: row.id,
          topic: getTopic(row, catList),
          detail: getDetail(row.complain_data),
          from: row.from,
          priority: getPriority(row, catList),
          department: getDepartment(row, catList),
          created_on: moment(row.created_at).format('DD MMMM, YYYY hh:mm:ss A'),
          status: printStatus(row.status_id),
          status_id: row.status_id,
          complain_data: row.complain_data,
          ...row,
         }))
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

  const getTopic = (rs, catList) => {
      const list = (listCatData.length)? listCatData: catList;
  		let cat = list.filter(rss => rss.id == rs.category_id)[0]?.name;
  		if(cat !== undefined && rs.sub_category_id != 0){
  			const subCat = list.find(rss => rss.id == rs.sub_category_id)?.name;

  			cat = cat + " > " + subCat;
  		} else {
        cat = (rs.sub_category_id !== 0)? rs.sub_category_id : rs.category_id;
        const subCat = list.find(rss => rss.id == cat)?.name;
        cat = subCat;
      }
  		return cat;
  }

  const getDepartment = (rs, catList) => {
  		let depart = "";
      const list = (listCatData.length)? listCatData: catList;
  		if(rs.sub_category_id != 0){
  			 depart = list.filter(rss => rss.id == rs.sub_category_id)[0]?.HelpDepartment?.name;
  		}else{
  			 depart = list.filter(rss => rss.id == rs.category_id)[0]?.HelpDepartment?.name;
  		}
      return (depart)? depart : "-";
    }

  const getPriority = (rs, catList) => {
      const list = (listCatData.length)? listCatData: catList;
  		let priority = "";
  		if(rs.sub_category_id != 0){
  			 priority = list.filter(rss => rss.id == rs.sub_category_id)[0]?.priority_id;
  		}else{
  			 priority = list.filter(rss => rss.id == rs.category_id)[0]?.priority_id;
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
  	return (priority)? priority : "-";
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
    return (status_id)? status_id : "-";
  }

  const [formData, setFormData] = useState({
    ticket_id:'',
    priority:'',
    help_topic:'',
    parent_id: "",
    status_id:'',
    from:'',
    date:'',
  });




  const handleChange = (e) => {
    const { name, value } = (e && e.target)? e.target : e;
    console.log(name, value );

    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    let from = "";
    let to = "";
    let data = {};

    const params = getRequestParams(page, pageSize);

    if(initialStartDate && initialEndDate){
      from = moment(initialStartDate).format('YYYY-MM-DD');
      to = moment(initialEndDate).format('YYYY-MM-DD');
      data = {...formState, from, to}
    }
    data[name] = (name === "priority")?Number(value) : value;
    console.log(data);
    debugger;
    if(data && data.help_topic){
      let topic = listCatData.find(res=> res.id === data.help_topic);
      if(topic){
        data.parent_id =  topic.parent_id;
      }
    }
    debugger;
    console.log(data);
    CrudService.getAllComplainFilter(data,params)
    .then(response => {
      let { dataRow, totalPages } = response.data;
      if(dataRow && dataRow.length){
        dataRow = dataRow?.map((row) => ({
          id: row.id,
          topic: getTopic(row),
          detail: getDetail(row.complain_data),
          from: row.from,
          priority: getPriority(row),
          department: getDepartment(row),
          created_on: moment(row.created_at).format('DD MMMM, YYYY hh:mm:ss A'),
          status: printStatus(row.status_id),
          status_id: row.status_id,
          complain_data: row.complain_data,
          ...row,
        }))
        setListData(dataRow);
        setCount(totalPages);
      } else {
        setListData([]);
        setCount(0);
      }
    })
    .catch(e => {
      console.log(e);
    });
  };


   const filterDate = (start, end) => {
    setSelectedRange({start, end });
    setInitialStartDate(start);
    setInitialEndDate(end);
    let from  = moment(start).format('YYYY-MM-DD');

    let to = moment(end).format('YYYY-MM-DD');

    const params = getRequestParams(page, pageSize);
    const values = { from, to };

    CrudService.getAllComplainFilter(values,params)
    .then(response => {
      let { dataRow, totalPages } = response.data;
      if(dataRow && dataRow.length){
        dataRow = dataRow?.map((row) => ({
          id: row.id,
          topic: getTopic(row),
          detail: getDetail(row.complain_data),
          from: row.from,
          priority: getPriority(row),
          department: getDepartment(row),
          created_on: moment(row.created_at).format('DD MMMM, YYYY hh:mm:ss A'),
          status: printStatus(row.status_id),
          status_id: row.status_id,
          complain_data: row.complain_data,
          ...row,
        }))
        setListData(dataRow);
        setCount(totalPages);
      } else {
        setListData([]);
        setCount(0);
      }
    })
    .catch(e => {
      console.log(e);
    });
    console.log(values)
  };

    const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
      let date = values.date;
      if(date !== "") {
        date = moment(date).format('YYYY-MM-DD');
        values.date = date;
      }

      setFilter(values);
      const params = getRequestParams(page, pageSize);
      CrudService.getAllComplainFilter(values,params)
      .then(response => {
        let { dataRow, totalPages } = response.data;
        dataRow = dataRow?.map((row) => ({
          id: row.id,
          topic: getTopic(row),
          detail: getDetail(row.complain_data),
          from: row.from,
          priority: getPriority(row),
          department: getDepartment(row),
          created_on: moment(row.created_at).format('DD MMMM, YYYY hh:mm:ss A'),
          status: printStatus(row.status_id),
          status_id: row.status_id,
          complain_data: row.complain_data,
          ...row,
        }))
        setListData(dataRow);
        setCount(totalPages);
      })
      .catch(e => {
        console.log(e);
      });
      console.log(values)
   };

   const FormSchema = Yup.object().shape({});
   const statusList = [
    { value: '', label: 'Status', 
    // isDisabled: true 
  },
    { value: 1, label: 'Open' },
    { value: 5, label: 'Hold' },
    { value: 10, label: 'Close' },
      
   ];

   const priorityList = [
    { value: '', label: 'Priority', 
    // isDisabled: true 
  },
    { value: '1', label: 'High' },
    { value: '2', label: 'Low' },
    { value: '3', label: 'Medium' },
      
   ];

   const onChange = (value,id) => {
    const saveData = {
      id:id,
      status_id: value,
    }

     CrudService.edit(saveData, 'helpcomplain', true).then(
      (response) => {
        //setModalValue('')

        generateToast('Ticket status has been updated', 'Success!');
        //retrieveList()

        let data = {};
        const params = getRequestParams(page, pageSize);

        if(initialStartDate !== undefined  && initialEndDate){
          let from = moment(initialStartDate).format('YYYY-MM-DD');
          let to = moment(initialEndDate).format('YYYY-MM-DD');
          data = {...formState, from, to}
        }
        debugger;
        console.log(data);
        if(data && data.help_topic){
          let topic = listCatData.find(res=> res.id === data.help_topic);
          if(topic){
            data.parent_id =  topic.parent_id;
          }
        }
        
        // values.date = date;
        CrudService.getAllComplainFilter(data,params)
        .then(response => {
          let { dataRow, totalPages } = response.data;
          console.log(dataRow)

          dataRow = dataRow?.map((row) => ({
            id: row.id,
            topic: getTopic(row),
            detail: getDetail(row.complain_data),
            from: row.from,
            priority: getPriority(row),
            department: getDepartment(row),
            created_on: moment(row.created_at).format('DD MMMM, YYYY hh:mm:ss A'),
            status: printStatus(row.status_id),
            status_id: row.status_id,
            complain_data: row.complain_data,
            ...row,
          }))

          setListData(dataRow);
          setCount(totalPages);
          
        })
        .catch(e => {
          console.log(e);
        });
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


const csvData = [
    ["Ticket #","Help Topic","Detials","From","Priority","Department","Created On ","Status"],
    ...listData?.map((row) => [
      row.id,
      row.topic,
      row.detail,
      row.from,
      row.priority,
      row.department,
      row.created_on,
      row.status
    ]),
  ];

	return (

  <>
  {modalValue}

      <div className="insight_page_section insight_field_section pt-20 pb-10 mb-30">
        <div className="d-flex justify-content-between align-items-center">
          <div className="field_section w_40 d-flex justify-content-between align-items-center w-100">
            <DateRangePicker
              onChange={filterDate}
              initialStartDate={initialStartDate}
              initialEndDate={initialEndDate}
            />
            <CSVLink className="btn export-btn" filename="ticket.csv" data={csvData}>
              <i class="fa fa-download"></i> Download Report
            </CSVLink>
          </div>
        </div>
      </div>


			<div className="ws-hld tickets-container">
        <Form enableReinitialize validationSchema={FormSchema} initialValues={formData} onSubmit={onSubmit}>
          <div className="search_box_section">
          <ul>
            <li style={{width: '100%'}}>
              <div className="field_section">                        
                <NumberField 
                  name="ticket_id" 
                  label="" 
                  placeholder="Search ticket" 
                  onChange={handleChange}
                  value={formState.ticket_id}
                />
              </div>
            </li>

            <li style={{width: '100%'}}>
              <div className="field_section">                        
                <CustomSelectFieldNoLabel 
                  name="help_topic"
                  label=""  
                  options={topicList}
                  placeholder="Help topic"
                  value={formState.help_topic}
                  onChange={handleChange}
                />
              </div>
            </li>

            <li style={{width: '100%'}}>
              <div className="field_section">                        
                <NumberField 
                  name="requestor" 
                  label="" 
                  placeholder="Search requestor" 
                  value={formState.requestor}
                  onChange={handleChange}
                />
              </div>
            </li>

            <li style={{width: '100%'}}>
              <div className="field_section">                        
                <CustomSelectFieldNoLabel 
                  name="priority"
                  label=""
                  id="priority"
                  options={priorityList}
                  placeholder="Priority"
                  value={formState.priority}
                  onChange={handleChange}
                />
              </div>
            </li>

            {/* <li style={{width: '12%'}}>
              <div className="field_section">                        
                  <DatePicker name="date" label="Date" placeholder="Date" />
              </div>
            </li> */}

            <li style={{width: '100%'}}>
              <div className="field_section">                        
                <CustomSelectFieldNoLabel 
                  name="status_id"
                  label=""
                  options={statusList}
                  value={formState.status_id}
                  placeholder="Status"
                  onChange={handleChange}
                />
              </div>
            </li>
            {/* 
            <li style={{width: '100%'}}>
              <button className="primary">Apply Filter</button>
            </li> */}
          </ul>
          </div>
        </Form> 

        <div className="page_data_setting">
        {
          // (listData?.length > 0) ? (
            <>

            <div className="complain_data_section">
              <div className="table-responsive table table-hover table-hover-animation dataTable no-footer">

              <ReactDataTables 
                  onChange={onChange}
                  viewDetail={ViewDetail}
                  data={listData}
                  statusList={statusList}
                  columns={
                  [{ data: "id", title: "Ticket #" },
                  { data: "topic", title: "Help Topic" },
                  { data: "detail", title: "Details" },
                  { data: "from", title: "Requestor" },
                  { data: "priority", title: "Priority" },
                  { data: "department", title: "Department" },
                  { data: "created_on", title: "Created On" },
                  { data: "status", title: "Status" }
                ]
              } />
{/*                         
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
                    { 
                      listData &&
                      listData?.map((row, index) => (
                        <tr>
                          <td className="text_center">
                            <a onClick={() => ViewDetail(row)}>
                              {row.id}
                            </a>
                          </td>
                          <td>{getTopic(row)}</td>
                          <td> {getDetail(row.complain_data)}
                          </td>
                          
                          <td>
                            {row.from}
                          </td>
                          <td>
                            <div className="badge_box">
                            {getPriority(row)}
                            </div>
                          </td>
                          <td>
                            {getDepartment(row)}
                          </td>
                          <td>{moment(row.created_at).format('DD-MMMM-YYYY')}</td>
                          <td>
                            <Select 
                              options={statusList}
                              defaultValue={statusList.find((option) => option.value === row.status_id)}
                              value={statusList.find((option) => option.value === row.status_id)}
                              onChange={(value) => onChange(value,row.id)}
                            />
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
*/}

              </div>
            </div>
            </>

          // ) : (

          //   <div>There is no ticket</div>


          // )
        }
            
       </div>


      </div>
  </>
  )
}

export default List;