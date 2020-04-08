import React from 'react';

const Loader = () => {
    return (
        <div className="loader">
            <svg xmlns="http://www.w3.org/2000/svg" width="150px" height="150px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" xlink="http://www.w3.org/1999/xlink">
                <g>
                    <circle cx="72.5125" cy="50" r="4" fill="#e15b64">
                        <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="-0.67s"/>
                        <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1" begin="-0.67s"/>
                    </circle>
                    <circle cx="92.9125" cy="50" r="4" fill="#e15b64">
                        <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="-0.33s"/>
                        <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1" begin="-0.33s"/>
                    </circle>
                    <circle cx="52.7125" cy="50" r="4" fill="#e15b64">
                        <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="0s"/>
                        <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1" begin="0s"/>
                    </circle>
                </g>
                <g transform="translate(-15 0)">
                    <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#f8b26a" transform="rotate(90 50 50)"/>
                    <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#f8b26a" transform="rotate(26.5687 50 50)">
                        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;45 50 50;0 50 50" keyTimes="0;0.5;1"/>
                    </path>
                    <path d="M50 50L20 50A30 30 0 0 1 80 50Z" fill="#f8b26a" transform="rotate(-26.5687 50 50)">
                        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;-45 50 50;0 50 50" keyTimes="0;0.5;1"/>
                    </path>
                </g>
            </svg>
        </div>
    )
}

export default Loader;