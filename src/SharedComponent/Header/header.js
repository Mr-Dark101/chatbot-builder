import React from 'react';
import {STRINGS} from "../../utils/base";
import {useDispatch, useSelector} from "react-redux";
import {toggleNavbar} from "../NavBar/slices/navbar.slice";

import {
  BrowserRouter as Router,
  Switch,
  useLocation,
  Link
} from "react-router-dom";

const Header = () => {


    const navbar = useSelector(({Reducers}) => Reducers.navbar)
    let {open} = navbar;

    const dispatch = useDispatch();
    
    const toggleDrawer = () => {
        dispatch(toggleNavbar(true))
    }
   
    return (
        <>



            <Link to="/settings">Api</Link>
                
     </>
    );
};

export default Header;