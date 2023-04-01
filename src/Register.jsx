import React, {useState} from "react";
import { GoogleLoginButton  } from "react-social-login-buttons";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Register = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = { name, email, password };
        // console.log(formData);
        fetch('https://nasa-server.onrender.com/registerUser', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((data) => {
            // console.log(data);
            const authToken = data.token; // assuming the token is returned in the 'token' field
            localStorage.setItem('authToken', authToken); // store the token in local storage
            props.setname(data.user.name);
            // props.onLoginSwitch();
            navigate('/');
            toast.success("Successfully Registered! Now Login.", {
              toastId: 'success2',
            })
            
          })
          .catch((error) => {
          //   toast.error("This Email Alredy exists!", {
          //     toastId: 'failure2',
          //  })
          });
          
      };
    const handleGoogleSignUp = (e) => {
      window.location.href = "https://nasa-server.onrender.com/auth/google/register";
    };

    return (
        <div className="auth-form-container">
            <form className="register-form" onSubmit = {handleSubmit}>
                <h2>Register</h2>
                <label htmlFor="name">Name</label>
                <input required value={name} onChange = {(e) => setName(e.target.value)} type="text" placeholder="Name" name="name" id="name"/>
                <label htmlFor="email">Email</label>
                <input required value={email} onChange = {(e) => setEmail(e.target.value)} type="email" placeholder="Email" name="email" id="email"/>
                <label htmlFor="password">Password</label>
                <input required value={password} onChange = {(e) => setPassword(e.target.value)} type="password" placeholder="Password" name="password" id="password"/>    
                {/* <button type="submit">Register</button> */}
                <br />
                <Button variant="success" type="submit">
                  Register
                </Button>
                <div className="signup__google">
                    <GoogleLoginButton onClick={handleGoogleSignUp}> Sign Up with Google </GoogleLoginButton>
                </div>
            </form>
            <Button variant="primary" onClick={() => props.onFormSwitch('login')}>Already Registered? Login</Button>{' '}
        </div>
    )
}