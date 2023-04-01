import React, {useState, useEffect} from 'react';
import './App.css';
import { Login } from './Login';
import { Register } from './Register';
import { Home } from './Home';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentForm, setCurrentForm] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    
    const searchParams = new URLSearchParams(location.search);
    if(searchParams.get('user')) {
      console.log('searchParams', searchParams.get('user'));
      setName(searchParams.get('user'));
      const token = searchParams.get('token');
      localStorage.setItem('authToken', token);
    }

    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      console.log('authToken', authToken);
      setIsLoggedIn(true);
    }

    if(searchParams.get('failure')) {
      toast.error(searchParams.get('failure'), {
        toastId: 'success1',
     })
     navigate('/');
    }   


    

  }, [location.search]);

  const handleName = (name) => {
    setName(name);
  }


  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  function handleLogout() {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    window.location.href = "https://nasa-ui.vercel.app/";
  }

  return (
    <div className="App"> 
      <ToastContainer />
      {
        isLoggedIn ? <Home name={name} onLogoutSwitch={() => handleLogout()} onFormSwitch={toggleForm}/> :
        currentForm === 'login' ? <Login setname={handleName} onFormSwitch={toggleForm} onLoginSwitch={() => setIsLoggedIn(true)}/> : <Register onFormSwitch={toggleForm} onLoginSwitch={() => setIsLoggedIn(true)}/>
      }
    </div>
  );
}
function AppWithRouter() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
export default AppWithRouter;
