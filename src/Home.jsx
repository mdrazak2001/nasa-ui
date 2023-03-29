import React, {useState} from "react";

export const Home = (props) => {
    const handleLogout = (e) => {
        e.preventDefault();
        props.onLoginSwitch();
    };
    return (
        <div className="auth-form-container">
            <h2>Home</h2>
            <button className="link-btn" onClick={handleLogout}>Logout</button>
        </div>
    )
}