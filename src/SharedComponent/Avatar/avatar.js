import React from 'react';
import {Avatar} from "@mui/material";
import default_avatar from "../../assets/user_default.jpg";

const Av = ({size = 24, src, alt}) => {
    return (
        <div>
            <Avatar
                alt={alt}
                src={src === undefined || "" ? default_avatar : src}
                sx={{width: size, height: size}}
            />
        </div>
    );
};

export default Av;