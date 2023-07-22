import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import ActiveLink from '../../ActiveLink/ActiveLink';
import { AiTwotoneLike, AiOutlineLike } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { key } from 'localforage';

const MyPost = () => {
     const { user } = useContext(AuthContext);
     const [isLoading, setIsLoading] = useState(true);
     const [postData, setPostData] = useState([]);
     const navigate = useNavigate()

     const [passwordShown, setPasswordShown] = useState(false);
     const [passwordIcon, setPasswordIcon] = useState(false);
     const togglePassword = () => {
          setPasswordShown(!passwordShown);
          setPasswordIcon(!passwordIcon)
     };

     // server data get start 
     const url = `https://social-media-platform-server-side-sarzil727945.vercel.app/allPost?email=${user?.email}`;
     useEffect(() => {
          fetch(url)
               .then(res => res.json())
               .then(data => {
                    setPostData(data);
                    setIsLoading(false);
               })
     }, [isLoading, url]);
     // server data get exit 
     return (
          <div className=' pb-10 '>
               {
                    postData?.map(data =>
                         <div className="card card-compact w- h-full bg-base-100 shadow-2xl lg:mt-10 mt-5 lg:mx-32 pb-5" key={data._id}>
                              <div className=' border-b-2'>
                                   <div className='flex justify-between relative  text-start px-4 pt-4 pb-1'>
                                        <div className='flex items-center '>
                                             <div>
                                                  <img title={user?.displayName} className=' w-[66px] h-[66px] border rounded-full' src={user?.photoURL} alt="" />
                                             </div>
                                             <div className=' ms-3 mb-2'>
                                                  <h2 className=' text-[111%] font-bold'>{user?.displayName}</h2>
                                                  <p className=' text-[#5f5d5d font-semibold text-[77%]'>Post data</p>
                                             </div>
                                        </div>
                                        <div className="flex gap-2">
                                             <div className="dropdown dropdown-end relative">
                                                  <label tabIndex={0} className="btn btn-ghost btn-circle">
                                                       <span className=' text-[30px] mb-4'> ...</span>
                                                  </label>
                                                  <ul tabIndex={0} className="menu menu-compact dropdown-content lg:mt-5 mt-5 shadow bg-opacity-90 bg-black rounded-box w-72 lg:w-80 lg:me-2 pb-10 lg:pt-5">
                                                       <li className=' mt-2'>
                                                            <ActiveLink to='order'>
                                                                 <div className=' flex items-center'>
                                                                      <div className=' flex'><span className=' me-2 text-2xl'><FiEdit /></span> <span>Edit post</span></div>

                                                                 </div>
                                                            </ActiveLink>
                                                       </li>
                                                       <li>
                                                            <ActiveLink to='order'>
                                                                 <div className=' flex items-center'>
                                                                      <div className=' flex'>
                                                                           <span className=' me-2 text-2xl'><RiDeleteBin6Line /></span>
                                                                           <span> Delete post</span>
                                                                      </div>

                                                                 </div>
                                                            </ActiveLink>
                                                       </li>
                                                  </ul>
                                             </div>
                                        </div>
                                   </div>
                                   <div className=' mb-3 px-5'>
                                        <p>{data.Bio}</p>
                                   </div>
                              </div>
                              <figure><img src={data.fileImg} alt="Shoes" /></figure>
                              <div className="card-body">
                                   <div className=' flex justify-between lg:px-5'>
                                        <div>
                                             <p>Like</p>
                                        </div>
                                        <div>
                                             <p>comment</p>
                                        </div>
                                   </div>

                                   <div className=' border-t-2 border-b-2 mt-1'>

                                        <div className=' flex justify-between lg:px-5 lg:py-2'>
                                             <div>
                                                  <div className=''>
                                                       <p className=' text-lg' onClick={togglePassword} >{
                                                            passwordIcon ? <AiTwotoneLike /> : <AiOutlineLike />
                                                       }</p>
                                                  </div>
                                             </div>
                                             <div>
                                                  <h2 className="card-title">Shoes!</h2>
                                             </div>
                                             <div>
                                                  <h2 className="card-title">Shoes!</h2>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    )
               }
          </div>
     );
};

export default MyPost;