import React, { useEffect, useState } from 'react';
import './Login.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import helper from './helper';

const Login = () => {
  const history = useNavigate();
  const [credentials, setcredentials] = useState({ username: '', password: '' });

  useEffect(() => {
    
    if (localStorage.getItem('logincallsdata') !== 'null') {
      history("/CallsData");
    }
  },[])

  const submit = () => {
    axios.post(`https://frontend-test-api.aircall.io/auth/login`, credentials
    ).then(async (res) => {
      if (res.status == 201) {
        localStorage.setItem('logincallsdata', res.data.access_token)
        localStorage.setItem('usernamecallsdata', credentials.username)
        localStorage.setItem('passCallsdata', credentials.password)
        localStorage.setItem('idcallsdata', res.data.user.id)
        history('/CallsData')
        helper.toastNotification('Login Successfully.', "SUCCESS_MESSAGE");
      }
      else {
        helper.toastNotification('Unable to process request.', "FAILED_MESSAGE");
      }
    })
      .catch((error) => {
        helper.toastNotification('Unable to process request.', "FAILED_MESSAGE");
        console.log(error, 'error')
      });
  }

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">LogIn</div>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="name" required onChange={e => setcredentials({ ...credentials, username: e.target.value })} />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required onChange={e => setcredentials({ ...credentials, password: e.target.value })} />
        </div>
        <div className="button-container">
          <input type='submit' onClick={submit} />
        </div>
      </div>
    </div>
  );
}

export default Login;