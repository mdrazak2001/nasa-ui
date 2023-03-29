import React, {useState} from "react";

export const Register = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = { name, email, password };
        // console.log(formData);
        fetch('http://localhost:5000/registerUser', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            // handle success or error response
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };
    const handleGoogleSignUp = (e) => {
      e.preventDefault();
      console.log("hello");
        
    };

    return (
        <div className="auth-form-container">
            <form className="register-form" onSubmit = {handleSubmit}>
                <h2>Register</h2>
                <label htmlFor="name">Name</label>
                <input value={name} onChange = {(e) => setName(e.target.value)} type="text" placeholder="Name" name="name" id="name"/>
                <label htmlFor="email">Email</label>
                <input value={email} onChange = {(e) => setEmail(e.target.value)} type="email" placeholder="Email" name="email" id="email"/>
                <label htmlFor="password">Password</label>
                <input value={password} onChange = {(e) => setPassword(e.target.value)} type="password" placeholder="Password" name="password" id="password"/>    
                <button type="submit">Register</button>
                <div className="signup__google">
                    <button onClick={handleGoogleSignUp}>Sign Up with Google</button>
                </div>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already Registered ? Login</button>
        </div>
    )
}