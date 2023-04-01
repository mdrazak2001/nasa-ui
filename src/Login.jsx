import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleLoginButton  } from "react-social-login-buttons";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = { email, password };
        fetch('https://nasa-server.onrender.com/loginUser', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((data) => {
            // console.log(data.user.name);
            const authToken = data.token;
            localStorage.setItem('authToken', authToken); // store the token in local storage
            props.setname(data.user.name);
            props.onLoginSwitch();
          })
          .catch((error) => {
            console.error("Enter valid credentials");
            toast.error("Enter valid credentials", {
              toastId: 'success1',
           })
            navigate('/');
          });
      };
    const handleGoogleSignIn = (e) => {
      window.location.href = "https://nasa-server.onrender.com/auth/google";
    };

    return (       
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit = {handleSubmit}>
                <label htmlFor="email">Email</label>
                <input required value={email} onChange = {(e) => setEmail(e.target.value)} type="email" placeholder="Email" name="email" id="email"/>
                <label htmlFor="password">Password</label>
                <input required value={password} onChange = {(e) => setPassword(e.target.value)} type="password" placeholder="Password" name="password" id="password"/>    
                <br />
                <Button variant="success" type="submit">
                  Log In
                </Button>
                <div className="login__google">
                    <GoogleLoginButton onClick={handleGoogleSignIn} />
                </div>
            </form>
            

            {/* <button className="link-btn" onClick={() => props.onFormSwitch('register')}>No Account Sign Up</button> */}
            <Button variant="primary" onClick={() => props.onFormSwitch('register')}>No Account? Register</Button>{' '}
      </div>
    )
}