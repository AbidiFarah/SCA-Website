import React ,{ useState } from 'react';
import login1 from './../../assets/login.jpg';
import './register.css';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Register() {

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
      register

    </div>
    <div className='content'>
      <div className='image'>
        <img src={login1} alt={'loading...'}/>

      </div>
      <div className='form'>

        <div className="form-group">
          <label htmlFor='username'>Username</label>
          <input  onChange={regChangeHandler} type='text' name='username' placeholder='username'   />

          {errors.username ? (
              <p className="text-danger">{errors.username.message}</p>
            ) : (
              ""
            )}
        </div>

        <div className="form-group">
          <label htmlFor='email'>Email</label>
          <input onChange={regChangeHandler} type='email' name='email' placeholder='email' />

          {errors.email ? (
              <p className="text-danger">{errors.email.message}</p>
            ) : (
              ""
            )}
          


        </div>

        <div className="form-group">
          <label htmlFor='password'>Password</label>
          <input onChange={regChangeHandler}  type='password' name='password' placeholder='password'   />

          {errors.email ? (
              <p className="text-danger">{errors.email.message}</p>
            ) : (
              ""
            )}
        </div>

        <div className="form-group">
          <label >You have an account ?</label>
          <Link to="/login">
            Login
          </Link>
        </div>

      </div>
    </div>

    <div className="foter">
      <button type='button'  className="btn">Register</button>
    </div>
    <hr/>
    <hr/>



  </div>
  )
}

export default Register