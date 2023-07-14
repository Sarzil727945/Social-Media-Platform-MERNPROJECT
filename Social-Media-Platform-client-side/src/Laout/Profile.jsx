import React, { useContext } from 'react';
import Header from '../shared/Header/Header';
import { AuthContext } from '../AuthProvider/AuthProvider';

const Profile = () => {
     const { user } = useContext(AuthContext)

     return (
          <div>
               <div>
                    <Header></Header>
               </div>
               <div className=' lg:pt-36 pt-28 mx-5 lg:mx-80'>
                    <div className=' border-b-2'>
                         <div className='pb-5 lg:flex lg:justify-between lg:relative text-center lg:text-start'>
                              <div className=' lg:flex items-center '>
                                   <div className=' flex justify-center'>
                                        <img title={user.displayName} className=' w-[250px] h-[250px] border rounded-full' src={user.photoURL} alt="" />
                                   </div>
                                   <div className=' ms-5'>
                                        <h1 className=' text-[33px] font-bold'>{user.displayName}</h1>
                                        <small className=' text-[#5f5d5d] font-bold text-[15px]'>SA PlatFrom User</small>
                                   </div>
                              </div>
                              <div className=' lg:absolute lg:right-0 lg:bottom-5 mt-5'>
                                   <button className="btn btn-active btn-secondary me-2">Secondary</button>
                                   <button className="btn btn-primary">Button</button>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Profile;