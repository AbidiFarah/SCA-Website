import React,{useState} from 'react';
import Logo from '../assets/logo.png';
import { Link} from 'react-router-dom';
import '../styles/Navbar.css';
import ReorderIcon from '@material-ui/icons/Reorder';
import { Button } from '@material-ui/core';

function Navbar() {
    
    const [openLinks, setOpenLinks] = useState(false);

    const toggleNavbar = () => {
        setOpenLinks(!openLinks);
      };
    return (
        <div className='navbar'>
         <div className='leftSide' id={openLinks ? "open" : "close"}>

             <img src={Logo} alt='loading...' />
             
         </div>

         <div className='rightSide'>
             <Link to='/'>Home</Link>
             <Link to='/about'>About</Link>
             <Link to='/donate'>Donate</Link>
             <Link to='/articles'>Articles</Link>

             <div class="dropdown">
             <Link to='/workshops'>Programs  <i class="fa fa-caret-down"></i></Link>
     
             <div class="dropdown-content">
             <Link to='/Posts'>Blog  </Link>
             </div>

             </div>
             
             <Link to='/contact'>ContactUs</Link>
               <Button onClick={toggleNavbar}>
                   <ReorderIcon/>
               </Button>
               
         </div>

        </div>
    )
}

export default Navbar;
