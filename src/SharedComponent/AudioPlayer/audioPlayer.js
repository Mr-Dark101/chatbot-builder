import React from 'react';


const AudioPlayerDefault = (props) => {
    let {src} = props;
    return (
        <audio
            style={{margin:"0.5rem 0"}}
            controls
            src={src}>
            Your browser does not support the
            <code>audio</code> element.
        </audio>
    );
};

export default AudioPlayerDefault;