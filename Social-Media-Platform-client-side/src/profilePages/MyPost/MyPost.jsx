import React, { useContext, useEffect, useState, useRef } from 'react';
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
import useAxiosSecure from '../../hooks/useAxiouSeoure';
import Comments from '../../components/Comments/Comments';


const MyPost = () => {
     const { user } = useContext(AuthContext);
     const [isLoading, setIsLoading] = useState(true);
     const [postData, setPostData] = useState([]);
     const [axiosSecure] = useAxiosSecure();

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
     const [selectItem, setSelectItem] = useState('')
     const thisData = (id) => {
          const url = `https://social-media-platform-server-side-sarzil727945.vercel.app/allPost`;
          fetch(url)
               .then(res => res.json())
               .then(data => {
                    const selectData = data.filter(d => d._id === id)
                    const [dataO] = selectData
                    setSelectItem(dataO);
               })
     }
     const { Bio, fileImg, _id } = selectItem;

     const formUpdate = (event) => {
          event.preventDefault();
          const form = event.target;
          const Bio = form.Bio.value;
          const image = form.image.value;
          const add = { Bio, fileImg: image }
          fetch(`https://social-media-platform-server-side-sarzil727945.vercel.app/allPost/${_id}`, {
               method: 'PUT',
               headers: {
                    'content-type': 'application/json'
               },
               body: JSON.stringify(add)
          })
               .then(data => {
                    if (data) {
                         Swal.fire({
                              title: 'Success!',
                              text: 'Your Post Update Successful !!',
                              icon: 'success',
                              confirmButtonText: 'Ok'
                         })
                    }
                    form.reset();
                    navigate('/profile/myPost')

               })
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

     const button2Ref = useRef();
     const handleClickButton1 = () => {
          // Do some action here...
          console.log('Button 1 clicked!');

          // Trigger the click event on Button 2
          button2Ref.current.click();
     };

     // Function to handle Button 2 click
     const handleClickButton2 = () => {
          // Do some action here...
          console.log('Button 2 clicked!');
     };
     // comments part start
     const [comment, setComment] = useState([])
     const selectComment = (id) => {
          setComment([id])
     }
     // comments part end
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
                                                                           <a onClick={() => thisData(data._id)} href="#my_modal_8" className=' flex items-center' >
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
                                             <div onClick={() => selectComment(data._id)} className=' flex'>
                                                  <button>
                                                       <a>Comment</a>
                                                  </button>
                                             </div>
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
                                                       <button onClick={() => selectComment(data._id)} className=' me-1 flex items-center text-2xl btn btn-ghost'>
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
                                   <div>
                                        {

                                             comment.map(d => (d === data._id) && <Comments
                                                  id={d}
                                                  key={d}
                                             ></Comments>)
                                        }

                                   </div>
                              </div>
                         </div>
                    )
               }
               {/* The button to open modal */}
               <div className="modal" id="my_modal_8">
                    <div className="modal-box  w-11/12 max-w-3xl">
                         <div className=' flex justify-end '>
                              <a href='#' >
                                   <button ref={button2Ref} onClick={handleClickButton2} className="btn btn-circle bg-[#e0e0dd] text-black hover:bg-[#9b9b9a] border-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                   </button>
                              </a>
                         </div>
                         <form className='flex justify-center pt-16' onSubmit={formUpdate}>
                              <div>
                                   <div className="lg:flex">
                                        <div>
                                             <input type="text" className="input input-bordered w-full lg:w-[333px] rounded-full"
                                                  name='Bio'
                                                  defaultValue={Bio}
                                                  placeholder="What's on your mind?" aria-label="Bio" />
                                        </div>
                                        <div className="lg:ms-5 lg:mt-0 mt-5">
                                             <input type="text"
                                                  name='image'
                                                  className="input input-bordered w-full lg:w-[333px] rounded-full"
                                                  defaultValue={fileImg}
                                                  placeholder="Picture URL" aria-label="Picture URL" />
                                        </div>
                                   </div>
                                   <div className=' lg:my-10 my-5 pt-5'>
                                        <button onClick={handleClickButton1} type="submit" className="btn btn-active btn-accent w-full rounded-full">Save</button>
                                   </div>
                              </div>
                         </form>
                    </div>
               </div>
          </div>

     );
};

export default MyPost;