import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { FaEnvelope, FaLock, FaSun, FaMoon } from 'react-icons/fa';
import './App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setMessage('Registration successful!');
        setIsError(false);
      } else {
        throw new Error('Registration failed. Please try again.');
      }
    } catch (error) {
      setMessage(error.message);
      setIsError(true);
    }

    setTimeout(() => {
      setMessage('');
    }, 3000); // Clear the message after 3 seconds
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'login-container dark-mode' : 'login-container'}>
      <div className="dark-mode-toggle">
        <button onClick={toggleDarkMode} className="btn btn-secondary">
          {/* {darkMode ? <FaSun /> : <FaMoon />} */}
        </button>
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="text-center">Login</h2>
        {message && (
          <div className={`alert ${isError ? 'alert-danger' : 'alert-success'}`}>
            {message}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
          Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
             Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Register
        </button>
      </form>
    </div>
  );
}

export default Login;
