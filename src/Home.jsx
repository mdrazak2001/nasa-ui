import React, {useState} from "react";

export const Home = (props) => {
    const handleLogout = (e) => {
        e.preventDefault();
        props.onFormSwitch('login');
        props.onLogoutSwitch();
    };
    return (
        <div className="auth-form-container">
            <h2>Hi, {props.name}</h2>
            <button className="link-btn" onClick={handleLogout}>Logout</button>
        </div>
    )
}