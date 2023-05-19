


import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // const history = useHistory();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate backend validation
    const userData = {
      username: 'user123',
      password: 'password123',
    };

    if (username === userData.username && password === userData.password) {
      // Successful login
      console.log('Login successful');
      // Reset form fields
      setUsername('');
      setPassword('');
      setError('');
      // Redirect to home page
      // history.push('/home');
    } else {
      // Invalid credentials
      setError('Username or password does not match.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;


