import React, {useState, useEffect} from 'react';
import './App.css';
import { Login } from './Login';
import { Register } from './Register';
import { Home } from './Home';

function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      console.log('authToken', authToken);
      setIsLoggedIn(true);
    }
  }, []);
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  function handleLogout() {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  }

  return (
    <div className="App"> 
      {
        isLoggedIn ? <Home onLoginSwitch={() => handleLogout()} onFormSwitch={toggleForm}/> :
        currentForm === 'login' ? <Login onFormSwitch={toggleForm} onLoginSwitch={() => setIsLoggedIn(true)}/> : <Register onFormSwitch={toggleForm} onLoginSwitch={() => setIsLoggedIn(true)}/>
      }
    </div>
  );
}

export default App;
