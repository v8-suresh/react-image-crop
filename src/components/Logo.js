import React, {Component} from 'react';

// We need a better logo, this was taken from https://design.google.com/icons/#ic_crop
class Logo extends Component {
    render() {
        return (
            <svg className="logo" fill="#ffffff" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M17 15h2V7c0-1.1-.9-2-2-2H9v2h8v8zM7 17V1H5v4H1v2h4v10c0 1.1.9 2 2 2h10v4h2v-4h4v-2H7z"/>
            </svg>
        );
    }
}

export default Logo;
