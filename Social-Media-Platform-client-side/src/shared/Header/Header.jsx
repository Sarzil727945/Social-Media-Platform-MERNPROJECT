import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ActiveLink from '../../ActiveLink/ActiveLink';
import { FaShoppingCart } from 'react-icons/fa';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import useCard from '../../hooks/useCard';
import './Header.css'


const Header = () => {
     const { user, logOut } = useContext(AuthContext)
     console.log(user);
     const [card] = useCard()
     // logOut part start
     const handelLogOut = () => {
          logOut()
               .then(() => {
                    // Sign-out successful.
               })
               .catch((error) => {
                    // An error happened.
               });
     }
     // logOut part end


     return (
          <div>
               <div className="navbar fixed z-10 bg-opacity-60 bg-black text-white ">
                    <div className="navbar-start">
                         <div className="dropdown">
                              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                              </label>
                              <ul tabIndex={0} className="menu menu-compact dropdown-content mt-5 p-2 shadow bg-opacity-60 bg-black rounded-box w-56">
                                   <li><ActiveLink to='/'>Home</ActiveLink></li>
                                   <li><ActiveLink to='ourMenu'>Our Menu</ActiveLink></li>
                                   <li><ActiveLink to='order'>Our Order</ActiveLink></li>
                              </ul>
                         </div>
                         <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                         <ul className="menu menu-horizontal px-1">
                              <></>
                              <li><ActiveLink to='/'>Home</ActiveLink></li>
                              <li><ActiveLink to='ourMenu'>Our Menu</ActiveLink></li>
                              <li><ActiveLink to='order'>Our Order</ActiveLink></li>
                              <li>
                                   <Link to='/dashboard/myCard'>
                                        <button className="btn gap-2">
                                             <FaShoppingCart />
                                             <div className="badge badge-secondary">+{card?.length || 0}</div>
                                        </button>
                                   </Link>
                              </li>
                         </ul>
                    </div>
                    <div className="navbar-end">
                         {
                              user ? <div className=' flex'>
                                   <img title={user.displayName} className=' imgStyle me-3' src={user.photoURL} alt="" />
                                   <div className=' mt-2'>
                                        <button onClick={handelLogOut} variant="info" className=' lg:me-5  btn btn-active btn-secondary text-[17px]'>Log Out</button>
                                   </div>
                              </div> :  <ActiveLink to="/login"><button className='btn btn-success lg:me-5 text-[17px] text-white'>Log in</button></ActiveLink> 
                         }
                    </div>
               </div>
          </div>
     );
};

export default Header;