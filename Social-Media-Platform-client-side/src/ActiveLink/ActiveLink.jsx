import React from 'react';
import './ActiveLink.css'
import { NavLink } from 'react-router-dom';

const ActiveLink = ({ to, children }) => {
     return (
          <div className='activeLink'>
               <NavLink
                    to={to}
                    className={({ isActive }) => isActive ? "active" : "noActive"}
               >
                    {children}
               </NavLink>
          </div>
     );
};

export default ActiveLink;