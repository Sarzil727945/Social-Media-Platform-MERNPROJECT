import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import ActiveLink from '../../ActiveLink/ActiveLink';
import { AiTwotoneLike, AiOutlineLike } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaEllipsis } from 'react-icons/fa6';
import { GoComment } from 'react-icons/go';
import { PiShareFatDuotone } from 'react-icons/pi';
import Swal from 'sweetalert2';

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

     // server data handelEdit start
     const handelEdit = (id) => {
          console.log(id);
     }
     // server data handelEdit start
     // server data delete start
     const handelDelete = (id) => {
          Swal.fire({
               title: 'Are you sure?',
               text: "You won't be able to revert this!",
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
               if (result.isConfirmed) {

                    fetch(`https://social-media-platform-server-side-sarzil727945.vercel.app/allPost/${id}`, {
                         method: 'DELETE'
                    })
                         .then(res => res.json())
                         .then(data => {
                              if (data.deletedCount > 0) {
                                   Swal.fire(
                                        'Deleted!',
                                        'Your Post has been deleted.',
                                        'success'
                                   )

                                   const remaining = postData.filter(item => item._id !== id)
                                   setPostData(remaining);
                              }
                         })
               }

          })

     }
     // server data delete end
     return (
          <div className=' pb-10 '>
               {
                    postData?.map(data =>
                         <div className="card card-compact h-full bg-base-100 shadow-2xl lg:mt-10 mt-5 lg:mx-32 pb-5" key={data._id}>
                              <div className=' border-b-2'>
                                   <div className='flex justify-between relative  text-start px-4 pt-4 pb-1'>
                                        <div className='flex items-center '>
                                             <div>
                                                  <img title={data?.displayName} className=' w-[66px] h-[66px] border rounded-full' src={data?.userPic} alt="" />
                                             </div>
                                             <div className=' ms-3 mb-2'>
                                                  <h2 className=' text-[111%] font-bold'>{data?.displayName}</h2>
                                                  <p className=' text-[#5f5d5d font-semibold text-[77%]'>Post data</p>
                                             </div>
                                        </div>
                                        <div className="flex gap-2">
                                             <div className="dropdown dropdown-end relative">
                                                  <label tabIndex={0} className="btn btn-ghost btn-circle">
                                                       <span className=' text-[25px]'> <FaEllipsis /></span>
                                                  </label>
                                                  <ul tabIndex={0} className="menu menu-compact dropdown-content lg:mt-5 mt-5 shadow bg-opacity-90 bg-black rounded-box w-72 lg:w-80 lg:me-2 pb-10 lg:pt-5">
                                                       <li className=' mt-2'>
                                                            <button onClick={() => handelEdit(data._id)}>
                                                                 <div className='text-white ms-5'>
                                                                      <div className=' flex items-center'>
                                                                           <a href="#my_modal_8" className=' flex items-center' >
                                                                                <span className=' me-2 text-2xl'><FiEdit /></span>
                                                                                <span className='text-xl mb-1'>Edit post</span>
                                                                           </a>

                                                                      </div>

                                                                 </div>
                                                            </button>

                                                       </li>
                                                       <li>
                                                            <button onClick={() => handelDelete(data._id)}>
                                                                 <div className='text-white ms-5'>
                                                                      <div className=' flex items-center'>
                                                                           <div className=' me-2 text-2xl'><RiDeleteBin6Line /></div>
                                                                           <div className='text-xl mb-1'> Delete post</div>
                                                                      </div>
                                                                 </div>
                                                            </button>
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
                                             <p>Like {data.like}</p>
                                        </div>
                                        <div>
                                             <p>comments</p>
                                        </div>
                                   </div>

                                   <div className=' border-t-2 border-b-2 mt-1'>

                                        <div className=' flex justify-between lg:px-5 lg:py-1'>
                                             <div>
                                                  <div className=' flex'>
                                                       <button className=' me-1 flex items-center text-2xl btn btn-ghost' onClick={togglePassword} >{
                                                            passwordIcon ? <AiTwotoneLike /> : <AiOutlineLike />
                                                       }
                                                            <p className=' text-[15px] ms-1'> Like</p>
                                                       </button>

                                                  </div>
                                             </div>
                                             <div>
                                                  <div className=' flex'>
                                                       <button className=' me-1 flex items-center text-2xl btn btn-ghost'>
                                                            <p><GoComment /></p>
                                                            <p className=' text-[62%] ms-2'> Comment</p>
                                                       </button>
                                                  </div>
                                             </div>
                                             <div>
                                                  <div className=' flex'>
                                                       <button className=' me-1 flex items-center text-2xl btn btn-ghost'>
                                                            <p><PiShareFatDuotone /></p>
                                                            <p className=' text-[62%] ms-2'> Share</p>
                                                       </button>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    )
               }
               {/* The button to open modal */}
               <div className="modal" id="my_modal_8">
                    <div className="modal-box">
                         <h3 className="font-bold text-lg">Hello!</h3>
                         <p className="py-4">This modal works with anchor links</p>
                         <div className="modal-action">
                              <a href="#" className="btn">Yay!</a>
                         </div>
                    </div>
               </div>

          </div>

     );
};

export default MyPost;