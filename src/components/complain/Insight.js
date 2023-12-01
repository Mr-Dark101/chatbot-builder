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

const Insight = () => {
const [listData, setListData] = useState({});
useEffect(() => {
    loadData();
   
  }, []);


const loadData = () => {
    CrudService.dashboardData()
      .then(response => {
        setListData(response.data.data);
        
      })
      .catch(e => {
        console.log(e);
      });
  };

	return (

			<div className="ws-hld">
        
          <div className="insight_page_section">
            <div className="complain_box_section">
              <ul>
                <li>
                  <div className="complain_box">
                    <h1>{listData?.total_complain}</h1>

                    <p>Total Tickets</p>
                  </div>
                </li>

                <li>
                  <div className="complain_box" style={{borderWidth: 1,borderColor: '#FF7272'}}>
                    <h1>{listData?.complain_Open}</h1>

                    <p>Open Tickets</p>
                  </div>
                </li>

                <li>
                  <div className="complain_box" style={{borderWidth: 1,borderColor: '#00BC57'}}>
                    <h1>{listData?.complain_close}</h1>

                    <p>Closed Tickets</p>
                  </div>
                </li>

                <li>
                  <div className="complain_box" style={{borderWidth: 1,borderColor: '#DD9F00'}}>
                    <h1>{listData?.complain_hold}</h1>

                    <p>On Hold Tickets</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="chart_section">
              <p>Complaints Count by Status</p>

              <div className="chart_box"> 
                  <CountStatus listData={listData} />
              </div>
            </div>

            <div className="d-flex">
              <div className="chart_section me-30" style={{width: '50%'}}>
                <div className="d-flex justify-content-between">
                  <p>Complaints by Help Topic</p>

                  <p>Complaints by Help Topic</p>
                </div>

                <div className="chart_box"> 
                  <HelpTopic listData={listData} />
                </div>
              </div>

              <div className="chart_section" style={{width: '50%'}}>
                <p>Complaints by Department</p>

                <div className="chart_box"> 
                  <Department listData={listData} />
                </div>
              </div>
            </div>
          </div>
      </div>
		)
}

export default Insight;