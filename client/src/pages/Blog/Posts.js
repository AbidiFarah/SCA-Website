import React from 'react';
import  Post  from './Post';
import './Posts.css';
import {Link} from 'react-router-dom'



function Posts() {
  return (
    <div>
      <div className='button-container'>
        <Link to="/writepost">
        <button className='button'>Create A Post</button>
        </Link>
       
      </div>
  


    <div className='posts'>

      

        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
    </div>
    </div>
  )
}

export default Posts