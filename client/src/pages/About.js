import React from 'react';
import '../styles/About.css';
import pink from '../assets/wpink.jpg';



function About(props) {
    

    return (
        <div className='about'>
            <div className='aboutTop' style={{ backgroundImage: `url(${pink})` }} >
             
            </div>
            <div className='aboutBottom'>
                <h1>About Us</h1>
                <p>We provide suppppport through our diverse offline and online communities.
                     With amazing programs and initiatives to always keep you engaged,
                     you never run out of network, resources and mentorship.
                     We provide resources and monitor your growth every step of the way
                     through regular check-ins to ensure you are hitting your personal and career goals.

                </p>
            </div>
            
          

        </div>
    )
}

export default About;
