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
	return (

			<div className="ws-hld">

          <div className="insight_page_section">
            <div className="complain_box_section">
              <ul>
                <li>
                  <div className="complain_box">
                    <h1>1000</h1>

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

            <div className="chart_section">
              <p>Complaints Count by Status</p>

              <div className="chart_box"> 
                  <CountStatus />
              </div>
            </div>

            <div className="d-flex">
              <div className="chart_section me-30" style={{width: '50%'}}>
                <div className="d-flex justify-content-between">
                  <p>Complaints by Help Topic</p>

                  <p>Complaints by Help Topic</p>
                </div>

                <div className="chart_box"> 
                  <HelpTopic />
                </div>
              </div>

              <div className="chart_section" style={{width: '50%'}}>
                <p>Complaints by Department</p>

                <div className="chart_box"> 
                  <Department />
                </div>
              </div>
            </div>
          </div>
      </div>
		)
}

export default Insight;