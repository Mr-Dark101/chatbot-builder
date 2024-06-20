import React, {useState} from 'react';
import {IconButton, Menu, MenuItem} from "@mui/material";
import more_opt_white from "../../assets/more-option-blue.svg";

const MenusComponent = ({options, onSelect}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = (opt) => {
        onSelect(opt.value)
        setAnchorEl(null)
    }
    return (
        <div>
            <IconButton
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <img alt={"#"} src={more_opt_white}/>
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {
                    options?.map((opt, i) =>
                        <MenuItem key={i} onClick={() => handleClose(opt)}>{opt.text}</MenuItem>
                    )
                }
            </Menu>
        </div>
    );
};

export default MenusComponent;