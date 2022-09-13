import React from 'react';
import {STRINGS} from "../../utils/base";

const Footer = () => {
    return (
        <div className="footer-box">
            <div className="footer-lft">
                <div className="txt-hld">
                    <div className="lg-txt">{STRINGS.DEFAULTS.COPY_RIGHTS}</div>
                    {/*<div className="sm-txt"></div>*/}
                </div>
            </div>
            <div className="footer-rt">
                <div className="lg-txt drk">{STRINGS.DEFAULTS.VERSION}</div>
            </div>
        </div>
    );
};

export default Footer;