import React, { useEffect, useState, useContext } from 'react';
import back_icon from '../assets/back-icon.svg';
import { STRINGS } from '../utils/base';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CrudService from "../services/crud.service";
import { CloseBotComposer, removingBreadcrumb, resetState } from './Dashboard/slices/dashboard.slice';
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


		         <div className="page_data_setting">
      {
                  (listData.length > 0) ? (
                    <>
                      <div className="row p-30 media-center">
                  <div className="col-sm-3">
                    <h3 className="page_heading m-0">Complain</h3>
                  </div>

                  <div className="col-sm-9">
                    
                  </div>
                </div>

<div className="table-responsive mx-30">
                <table className="table table-striped table-hover">
                 <thead className="bg-primary">
                    <tr>
                      <th>Ticket #</th>
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
                      <td>{row.id}</td>
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