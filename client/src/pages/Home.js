import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/Home.css';
import img from '../assets/background.jpg';
import Home2 from './Home2';


function Home() {
    

    return (
        <>
        <div className="home" style={{ backgroundImage: `url(${img})` }}>
        <div className="headerContainer">
          <h1> Women In TECH </h1>
          <p> Recognize and embrace your uniqueness...</p>
          <Link to="/login">
            <button >JOIN US</button>
          </Link>
        </div>

      </div>
      <Home2/>
      </>

   
    )
}
export default Home;