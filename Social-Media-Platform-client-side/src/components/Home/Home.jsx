import { useNavigate } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import { useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { useContext } from 'react';
import { useEffect } from 'react';
import ActiveLink from '../../ActiveLink/ActiveLink';
import { AiTwotoneLike, AiOutlineLike } from 'react-icons/ai';
import { FiDelete, FiEdit } from 'react-icons/fi';
import { FaEllipsis } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import { VscReport } from 'react-icons/vsc';
import { GoComment } from 'react-icons/go';
import { PiShareFatDuotone } from 'react-icons/pi';
import Swal from 'sweetalert2';
import Comments from '../Comments/Comments';

const Home = () => {
     useTitle('Home')
     const { user } = useContext(AuthContext);
     const [isLoading, setIsLoading] = useState(true);
     const [postData, setPostData] = useState([]);
     const navigate = useNavigate()

     // server data get start 
     const url = `https://social-media-platform-server-side-sarzil727945.vercel.app/allPost`;
     useEffect(() => {
          fetch(url)
               .then(res => res.json())
               .then(data => {
                    setPostData(data);
                    setIsLoading(false);
                    const [items] = postData;
                    setLike(items?.like);
               })
     }, [isLoading, url]);

     // like part start 
     const [like, setLike] = useState("")
     const [isLike, setIsLike] = useState(false)
     const [selectItem, setSelectItem] = useState('')
     const onLike = (id) => {
          console.log(id);
          const url = `https://social-media-platform-server-side-sarzil727945.vercel.app/allPost`;
          fetch(url)
               .then(res => res.json())
               .then(data => {
                    const selectData = data.filter(d => d._id === id)
                    const [dataO] = selectData
                    setSelectItem(dataO);
               })
          setLike(like + (isLike ? -1 : 1))
          setIsLike(!isLike);
     }
     console.log(selectItem);
     console.log(like);

     // like part end

     // comments part start
     const [comment, setComment] = useState([])
     const selectComment = (id) => {
          setComment([id])
     }
     // comments part end

     // server data get exit 
     return (
          <div className='bg-base-200 pb-10'>
               <div className=' lg:pt-28 pt-20'>
                    <div className=' lg:mx-72'>
                         {
                              postData?.map(data =>
                                   <div className="card card-compact w- h-full bg-base-100 shadow-2xl lg:mt-10 mt-5 lg:mx-32 pb-5" key={data._id}>
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
                                                  <div className="flex">
                                                       <div className="dropdown dropdown-end relative">
                                                            <label tabIndex={0} className="btn btn-ghost btn-circle">
                                                                 <span className=' text-[25px]'> <FaEllipsis /></span>
                                                            </label>
                                                            <ul tabIndex={0} className="menu menu-compact dropdown-content lg:mt-5 mt-5 shadow bg-opacity-90 bg-black rounded-box w-72 lg:w-80 lg:me-2 pb-10 lg:pt-5">
                                                                 <li className=' mt-2'>
                                                                      <ActiveLink to='order'>
                                                                           <div className=' flex items-center'>
                                                                                <div className=' flex'><span className=' me-2 text-2xl'><FiDelete /></span> <span>Hide post</span></div>

                                                                           </div>
                                                                      </ActiveLink>
                                                                 </li>
                                                                 <li>
                                                                      <ActiveLink to='order'>
                                                                           <div className=' flex items-center'>
                                                                                <div className=' flex'>
                                                                                     <span className=' me-2 text-2xl'><VscReport /></span>
                                                                                     <span> Report post</span>
                                                                                </div>

                                                                           </div>
                                                                      </ActiveLink>
                                                                 </li>
                                                            </ul>
                                                       </div>
                                                       <div>
                                                            <label tabIndex={0} className="btn btn-ghost btn-circle">
                                                                 <span className=' text-[25px]'> <IoMdClose /></span>
                                                            </label>
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
                                                       <p>Like {like}</p>
                                                  </div>
                                                  <div>
                                                       <p>comments</p>
                                                  </div>
                                             </div>

                                             <div className=' border-t-2 border-b-2 mt-1'>

                                                  <div className=' flex justify-between lg:px-5 lg:py-1'>
                                                       <div>
                                                            <div className=' flex'>
                                                                 <button className={isLike ? "me-1 flex items-center text-2xl btn btn-ghost text-blue-600" : " me-1 flex items-center text-2xl btn btn-ghost"} onClick={() => onLike(data._id)}  >
                                                                      {
                                                                           isLike ? <AiTwotoneLike /> : <AiOutlineLike />
                                                                      }
                                                                      <p className=' text-[15px] ms-1'> Like</p>
                                                                 </button>
                                                            </div>
                                                       </div>
                                                       <div>
                                                            <div onClick={() => selectComment(data._id)} className=' flex'>
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
                                             <div>
                                                  {
                                                      
                                                       comment.map(d => (d === data._id) &&<Comments
                                                            id={d}
                                                            key={d}
                                                       ></Comments>)
                                                  }

                                             </div>
                                        </div>
                                   </div>
                              )
                         }
                    </div>
               </div>
          </div>
     );
};

export default Home;