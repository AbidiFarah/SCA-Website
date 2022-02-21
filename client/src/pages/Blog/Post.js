import React from 'react'
import { Link } from 'react-router-dom';
import './Post.css';

function post() {
  return (
    <div className='post'>
        <img className='postImg' src='https://c4.wallpaperflare.com/wallpaper/555/34/486/digital-art-robot-3d-technology-wallpaper-thumb.jpg' alt='loading...'/>
        
    <div className="postInfo">
        <div className="postCats">
            <span className="postCat">IT</span>
            <span className="postCat">TECH</span>
        </div>

        <span className='postTitle'    >
            <Link className='link' to="/singlepost">some tech article</Link>

        </span>
        <hr/>
        <span className="postDate">
            1 hour ago
        </span>

        <p className='postDesc'>Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
            sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>




    </div>

   
  )
}

export default post
