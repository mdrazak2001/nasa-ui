import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export const Home = (props) => {
    const [imageData, setImageData] = useState({});
    const handleLogout = (e) => {
        e.preventDefault();
        props.onFormSwitch('login');
        props.onLogoutSwitch();
    };
    const fetchImage = async () => {
        try {
            const response = await axios.get('https://nasa-server.onrender.com/api/image');
            setImageData(response.data);
          } catch (error) {
            console.log(error);
          }
    };
  
    useEffect(() => {
        fetchImage();
    }, []);

    return (
        <div className="auth-form-container">
            <Navbar bg="light" expand="lg">
                <Container fluid>
                <Navbar.Brand href="#"><img class="usa-logo-img" src="https://api.nasa.gov/assets/img/favicons/favicon-192.png" alt="NASA logo" width="44px" /></Navbar.Brand>
                    <Nav className="justify-content-end">
                    <NavDropdown title={props.name} id="basic-nav-dropdown">
                        <NavDropdown.Item href="#" onClick={handleLogout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
            <br />
            {imageData && (
        <div>
          <h3>{imageData.title}</h3>
          <p>{imageData.explanation}</p>
          <img src={imageData.url} alt={imageData.title} />
        </div>
      )}
    </div>
    )
}