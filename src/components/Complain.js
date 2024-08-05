import React, { useEffect, useState, useContext } from 'react';
import { STRINGS } from '../utils/base';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CrudService from "../services/crud.service";
import { CloseBotComposer, removingBreadcrumb, resetState } from './Dashboard/slices/dashboard.slice';
import { Form, TextField, SelectField } from './crud/FormElements';
import * as Yup from 'yup';
import List from './complain/List';
import Insight from './complain/Insight';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import back_icon from '../assets/back-icon.svg';

function Complain(){
  const history = useHistory();
  const dispatch = useDispatch();

  const handleBack = () => {
    history.push(`${STRINGS.ROUTES.ROOT}?org=${localStorage.getItem('userId')}`);
    dispatch(resetState());
    dispatch(removingBreadcrumb());
 };

  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  }
  return (

      <div className="ws-hld">
        {/* <div className="head">
            <div className="head-rt">
               <div className="txt" style={{"marginLeft": "2rem", fontSize: "18px !important"}}>Insights | Help Desk</div>
            </div>

            <div className="head-lft">
               <div className="btn-hld"></div>
            </div>
        </div> */}
        <div className="row px-30 py-25 media-center">
            <div className="head-rt">
              <h5 class="box-title m-0" style={{"font-weight": "800", "width": "200px"}}>Insights</h5>
            </div>
        </div>
        <hr />
        <div className="m-30">
          <Tabs defaultIndex={0} onSelect={(index) => console.log(index)} >
            <TabList className="tab_list_section mb-20">
              <Tab value="1" >Overview</Tab>
              <Tab value="2">Tickets</Tab>
            </TabList>

            <TabPanel value="1">
              <Insight />
            </TabPanel>
            <TabPanel value="2">
              <List />
            </TabPanel>
          </Tabs>
        </div>
      </div>

    )
}

export default Complain;