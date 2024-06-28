import React, { useEffect, useState, useContext } from 'react';

import CrudService from '../../services/crud.service';
import  DateRangePicker from './DateRangePicker';
import CountStatus from './charts/CountStatus';
import HelpTopic from './charts/HelpTopic';
import Department from './charts/Department';
import * as Yup from 'yup';
import moment from 'moment';
import { Form } from './../crud/FormElements';
import { CircularProgress } from '@mui/material';


const Insight = (onChange) => {
  const [listData, setListData] = useState({});
  const [open, setOpen] = useState(false);
  const [initialStartDate, setInitialStartDate] = useState("");
  const [initialEndDate, setInitialEndDate] = useState("");
  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    console.log(selectedRange);
    const startDate =moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
    const endDate = moment().format('YYYY-MM-DD');     
    loadData(startDate, endDate);
  }, []);

  const loadData = (from, to) => {
    setLoader(true);
    CrudService.dashboardData(from, to)
      .then((response) => {
        setListData(response.data.data);
        setLoader(false);
      })
      .catch((e) => {
        console.log(e);
        setLoader(false);
      });
  };

  const onSubmit = (start, end) => {
    setSelectedRange({start, end });
    setInitialStartDate(start);
    setInitialEndDate(end);
    let from  = moment(start).format('YYYY-MM-DD');

    let to = moment(end).format('YYYY-MM-DD');

    loadData(from, to);
  };

  return (
    <div className="ws-hld">
      <div className="insight_page_section insight_field_section pt-20 pb-10 mb-30">
        <div className="d-flex justify-content-between align-items-center">
          <div className="field_section w_40 d-flex justify-content-between align-items-center w-100">
            <DateRangePicker
              onChange={onSubmit}
              initialStartDate={initialStartDate}
              initialEndDate={initialEndDate}
            />
            {/* <a className="btn export-btn" href='#'><i class="fa fa-download"></i> Export</a> */}
          </div>
        </div>
      </div>

      <div className="complain_box_section">
        <ul className=''>
          <li className="col-12 col-lg-3 complain_box">
            <div>
              <p>Total Tickets</p>
              {
                loader ? 
                <div class="mt-2"><CircularProgress size="30px" /></div> :
                <h1>{listData?.total_complain}</h1>
              }
            </div>
          </li>

          <li className="col-12 col-lg-3 complain_box">
            <div>
              <p>Open Tickets</p>
              {
                loader ? 
                <div class="mt-2"><CircularProgress size="30px" /></div> :
                <h1>{listData?.complain_Open}</h1>
              }
            </div>
          </li>

          <li className="col-12 col-lg-3 complain_box">
            <div>
              <p>Closed Tickets</p>
              {
                loader ? 
                <div class="mt-2"><CircularProgress size="30px" /></div> :
                <h1>{listData?.complain_close}</h1>
              }
            </div>
          </li>

          <li className="col-12 col-lg-3 complain_box">
            <div>
              <p>On Hold Tickets</p>
              {
                loader ? 
                <div class="mt-2"><CircularProgress size="30px" /></div> :
                <h1>{listData?.complain_hold}</h1>
              }
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
          <div className="insight_page_section me-30" style={{ width: '50%' }}>
            <div className="chart_section">
              <div className="d-flex justify-content-between">
                <p>Complaints by Help Topic</p>
              </div>

              <div className="chart_box">
                <HelpTopic listData={listData} />
              </div>
            </div>
          </div>

          <div className="insight_page_section" style={{ width: '50%' }}>
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
  );
};

export default Insight;
