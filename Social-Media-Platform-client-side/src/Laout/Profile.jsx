import React, { useContext, useState } from 'react';
import Header from '../shared/Header/Header';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Link, Outlet } from 'react-router-dom';
import useTitle from '../hooks/useTitle';

const Profile = () => {
     useTitle('Profile')
     const { user } = useContext(AuthContext)
     const [toggleState, setToggleState] = useState(1);

     const toggleTab = (index) => {
          setToggleState(index);
     };

     return (
          <div className='bg-base-200'>
               <div>
                    <Header></Header>
               </div>
               <div className=' lg:pt-32 pt-28  lg:mx-80'>
                    <div className=' border-b-2'>
                         <div className='pb-5 lg:flex lg:justify-between lg:relative text-center lg:text-start'>
                              <div className=' lg:flex items-center '>
                                   <div className=' flex justify-center'>
                                        <img title={user?.displayName} className=' w-[222px] h-[222px] border rounded-full' src={user?.photoURL} alt="" />
                                   </div>
                                   <div className=' ms-5'>
                                        <h1 className=' text-[33px] font-bold'>{user?.displayName}</h1>
                                        <small className=' text-[#5f5d5d] font-bold text-[15px]'>SA PlatFrom User</small>
                                   </div>
                              </div>
                              <div className=' lg:absolute lg:right-0 lg:bottom-5 mt-5'>
                                   <button className="btn btn-active btn-secondary me-2">Secondary</button>
                                   <button className="btn btn-primary">Button</button>
                              </div>
                         </div>
                    </div>
                    <div className=' mt-5'>
                         <div className="tabs">
                              <div className="tabs mx-5 lg:mx-0">
                                   <Link to='/profile/post'>
                                        <button className={toggleState === 1 ? "tab btn btn-outline  btn-ghost border-0 border-b-4 hover:bg-opacity-0 hover:text-[#2461bd] text-[#2461bd] hover:border-[#2461bd] font-bold" : "tab btn btn-outline  border-0 hover:bg-opacity-70 font-semibold"}
                                        onClick={() => toggleTab(1)}
                                        >Posts</button>
                                   </Link>
                                   <Link>
                                        <button className={toggleState === 2 ? "tab btn btn-outline  btn-ghost border-0 border-b-4 lg:mx-5 hover:bg-opacity-0 hover:bg-none hover:text-[#2461bd] text-[#2461bd] hover:border-[#2461bd] font-bold" : "tab btn btn-outline lg:mx-5 border-0 hover:bg-opacity-70 font-semibold"}
                                        onClick={() => toggleTab(2)}
                                        >Photos</button>
                                   </Link>
                                   <Link>
                                        <button className={toggleState === 3 ? "tab btn btn-outline  btn-ghost border-0 border-b-4 hover:bg-none hover:bg-opacity-0 hover:text-[#2461bd] text-[#2461bd] hover:border-[#2461bd] font-bold" : "tab btn btn-outline border-0 hover:bg-opacity-70 font-semibold"}
                                        onClick={() => toggleTab(3)}
                                        >Videos</button>
                                   </Link>
                                   <div className="dropdown lg:ms-5 relative">
                                        <label tabIndex={0} className="btn btn-outline border-none hover:bg-opacity-70">More</label>
                                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-60 absolute right-0  lg:left-0">
                                             <li><a>Item 1</a></li>
                                             <li><a>Item 2</a></li>
                                        </ul>
                                   </div>
                              </div>
                         </div>
                         <div>
                              <Outlet></Outlet>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Profile;