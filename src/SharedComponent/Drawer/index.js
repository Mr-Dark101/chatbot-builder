import React from 'react';
import {Drawer, ListItem, ListItemIcon} from '@mui/material';
import {useHistory} from "react-router-dom";

const DrawerComponent = ({open, direction = "left", toggleDrawer, data}) => {
    // const match = useLocation();
    const history = useHistory();
    // let {pathname} = match;
    // console.log(pathname)
    const handleRoute = ({route, isBlank}) => {
        if (!isBlank) {
            history.push(route)
        } else {
            window.open(route)
        }

    }
    const list = (data) => {
        return (
            data?.map(({icon, route, isBlank}, i) => {
                return (
                    <ListItem button key={i} className={`nav-text on`}>
                        <ListItemIcon onClick={(e) => {
                                 handleRoute({route, isBlank});
                                 e.stopPropagation();
                                 e.preventDefault();
                             }}>
                            <img alt={"#"} src={icon} style={{margin: 'auto'}} />
                        </ListItemIcon>
                        
                    </ListItem>
                )
            })
        )
    }

    return (
        <>

        
            <Drawer
                
                anchor={direction}
                open={open}
                onClose={toggleDrawer}
                className="left_navbar"
            >

                {list(data)}
            </Drawer>


            
                
               
            
        </>
    );
};

export default DrawerComponent;