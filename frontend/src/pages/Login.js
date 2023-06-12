import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
// import loginImage from '.\loginImage.png'
// import userProfileImage from '.loginImage-userPofile.png';
import "./Login.css"



const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
    <BrowserRouter>
      <div className='signIn'>
        <div className='signIn-page-image' style={{ width: "50%" }}>

          <img style={{
            height: "100%",
            width: "100%",
            objectFit: "cover"
          }} src=".\loginImage.png" alt="LoginImage" />
        </div>
        <div className='signIn-form' style={{ width: "50%" }}>
          <div >
            <h2 className='login' style={{ textAlign: "center" }}>Sign In</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
               <div>

                <input placeholder='Enter Username' style={{ borderBottom: "5px solid #AFD3E2", borderTop: "none", borderLeft: "none", borderRight: "none", marginBottom: "20px",  backgroundImage:'url(./loginImage-userPofile.png)', backgroundRepeat: 'no-repeat', backgroundSize:'20px' }} type="text" value={username} onChange={handleUsernameChange} />
              </div>
              <div> 
                <input className='inputUserName' placeholder='Enter Password' style={{ borderBottom: "5px solid #AFD3E2", borderTop: "none", borderLeft: "none", borderRight: "none", marginBottom: "20px", backgroundImage:'url(./loginImage-userPassword.png)', backgroundRepeat: 'no-repeat', backgroundSize:'25px' }} type="password" value={password} onChange={handlePasswordChange}  /> 
              </div>
              <div style={{ position: "relative", left: "54px", fontWeight: "bold", cursor: 'pointer',fontSize: '13px' }} >Forget Password ?</div>
              <button type="submit">Login</button>
            </form>
          </div>
        </div>

      </div>

    </BrowserRouter>
  );
};

export default LoginForm;
