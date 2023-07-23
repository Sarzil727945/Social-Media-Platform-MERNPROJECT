import React, { useContext } from 'react';
import ActiveLink from '../../ActiveLink/ActiveLink';
import { FiLogOut } from 'react-icons/fi';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import './Header.css'
import { AiFillSetting, AiTwotoneHome } from 'react-icons/ai';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { HiUserGroup } from 'react-icons/hi';
import Swal from 'sweetalert2';


const Header = () => {
     const { user, logOut } = useContext(AuthContext)

     // logOut part start
     const handelLogOut = (id) => {
          Swal.fire({
               title: 'Are you sure?',
               text: "Do you want to logout of your account?",
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Yes, Logout it!'
          }).then((result) => {
               if (result.isConfirmed) {
                    logOut()
                         .then(() => {
                              Swal.fire(
                                   'Logout!',
                                   'Your Account has been logout.',
                                   'success'
                              )
                              // Sign-out successful.
                         })
                         .catch((error) => {
                              // An error happened.
                         });
               }

          })

     }
     // logOut part end

     return (
          <div>
               <div className="navbar fixed bg-opacity-90 bg-black z-50 text-white ">
                    <div className="navbar-start">
                         <div className="dropdown">
                              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                   <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>
                              </label>
                              <ul tabIndex={0} className="menu menu-compact dropdown-content mt-8 p-2 shadow bg-opacity-90 bg-black rounded-box w-72">
                                   <div className="form-control">
                                        <input type="text" placeholder="Search SA" className="input input-bordered input-info w-full bg-[#434243] rounded-full" />
                                   </div>
                                   <li className=' mt-1'><ActiveLink to='/'><div className=' flex items-center'>
                                        <span className=' text-[22px]'><AiTwotoneHome /></span> <span className=' ms-2'> Home</span>
                                   </div></ActiveLink></li>
                                   <li><ActiveLink to='ourMenu'><div className=' flex items-center'>
                                        <span className=' me-2 text-[22px]'><FaMapMarkedAlt /></span> Marketplace
                                   </div></ActiveLink></li>
                                   <li><ActiveLink to='order'><div className=' flex items-center'>
                                        <span className=' me-2 text-[22px]'><HiUserGroup /></span> Groups
                                   </div></ActiveLink></li>
                              </ul>
                         </div>
                         <div className=' ms-0 lg:ms-5'>
                              <h1 className='normal-case text-2xl font-bold lg:text-[40px] gradient-text'>
                                   PlatFrom
                              </h1>
                         </div>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                         <ul className="menu menu-horizontal px-1">
                              <></>
                              <div className="form-control mt-3 lg:me-36">
                                   <input type="text" placeholder="Search SA" className="input input-bordered input-info w-[333px] bg-[#434243] rounded-full" />
                              </div>
                              <li><ActiveLink to='/' > <div className=' flex items-center'><span className=' me-2 text-[30px]'><AiTwotoneHome /></span><span> Home</span></div></ActiveLink></li>
                              <li><ActiveLink to='ourMenu'><div className=' flex items-center'>
                                   <span className=' me-2 text-[30px]'><FaMapMarkedAlt /></span> Marketplace
                              </div></ActiveLink></li>
                              <li><ActiveLink to='order'><div className=' flex items-center'>
                                   <span className=' me-2 text-[30px]'><HiUserGroup /></span> Groups
                              </div></ActiveLink></li>
                         </ul>
                    </div>
                    <div className="navbar-end">
                         {
                              user ? <>
                                   <div className="flex gap-2">
                                        <div className="dropdown dropdown-end relative">
                                             <label tabIndex={0} className="btn btn-ghost btn-circle w-[66px] lg:me-5">
                                                  <img title={user?.displayName} className=' imgStyle me-3' src={user?.photoURL} alt="" />
                                             </label>
                                             <ul tabIndex={0} className="menu menu-compact dropdown-content lg:mt-5 mt-5 shadow bg-opacity-90 bg-black rounded-box w-72 lg:w-80 lg:me-2 lg:pb-10 lg:pt-5">
                                                  <li className=' mt-2'>
                                                       <ActiveLink to={'/profile/post' || '/profile/myPost'}><div className=' flex items-center'> <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                                            <div className="w-10 rounded-full ">
                                                                 <img src={user?.photoURL} />
                                                            </div>
                                                       </label>
                                                            <div className=' ms-2'>
                                                                 <p>{user?.displayName}</p>
                                                                 <small className=' text-[#a4a0a0]'>See your profile</small>
                                                            </div>
                                                       </div></ActiveLink>
                                                  </li>
                                                  <li>
                                                       <ActiveLink to='order'><div className=' flex items-center'>
                                                            <span className='btn btn-circle text-[22px]'><AiFillSetting /></span> <span className=' ms-2'> Settings</span>
                                                       </div></ActiveLink>
                                                  </li>
                                                  <li><button onClick={() => handelLogOut("id")} className=' text-[18px] ps-[36px]'> <span className='btn btn-circle text-[22px]'><FiLogOut /></span> Log Out</button></li>
                                             </ul>
                                        </div>
                                   </div>
                              </> : <>
                                   <ActiveLink to="/login"><button className='btn bg-[#9d2b95] hover:bg-[#9d2b95] lg:me-5 text-[17px] text-white'>Log in</button></ActiveLink>
                              </>
                         }
                    </div>
               </div>
          </div>
     );
};

export default Header;