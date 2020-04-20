import React from "react";

const Dashboard = () => { 
    const username = localStorage.getItem('username');

    return (
        <div>
            <h2>Hello, {username}</h2>
            Dashboard
        </div>
    )
}

export default Dashboard;