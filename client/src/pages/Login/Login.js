import React, {useState} from 'react';
import login1 from './../../assets/login.jpg';
import './style.css';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";







function Login() {

  const navigate = useNavigate();
const [registerInfo, setRegisterInfo] = useState({
  username: "",
  email: "",
  password: "",
  confirm: "",
});

const [errors, setErrors] = useState({
  username: "",
  email: "",
  password: "",
  confirm: "",
});

const regChangeHandler = (e) => {
  setRegisterInfo({
    ...registerInfo,
    [e.target.name]: e.target.value,
  });
};



  return (
    <div className='base-container'>
      <div className='header'>
        login

      </div>
      <div className='content'>
        <div className='image'>
          <img src={login1} alt={'loading...'} />

        </div>
        <div className='form'>
          <div className="form-group">
            <label htmlFor='username'>Username</label>
            <input onChange={regChangeHandler} type='text' name='username' placeholder='username'   />

            {errors.username ? (
              <p className="text-danger">{errors.username.message}</p>
            ) : (
              ""
            )}

          </div>

          <div className="form-group">
            <label htmlFor='password'>Password</label>
            <input onChange={regChangeHandler} type='password' name='password' placeholder='password'   />
            {errors.username ? (
              <p className="text-danger">{errors.username.message}</p>
            ) : (
              ""
            )}
          </div>
         
          <div className="form-group">
            <label>Don't have an account ?</label>
            <Link to="/register">
            Register
          </Link>
         
          </div>

        </div>

      </div>
      <div className="foter">
        <button type='button'  className="btn">Login</button>
        
      </div>
      <hr/>
      <hr/>
      
    </div>



    
  )
}

export default Login;