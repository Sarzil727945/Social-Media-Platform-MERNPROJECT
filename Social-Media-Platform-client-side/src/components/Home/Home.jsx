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
import Comments from '../Comments/Comments';
import useAxiosSecure from '../../hooks/useAxiouSeoure';
import { useDataContext } from '../../DataProvider/DataProvider';

const Home = () => {
     useTitle('Home')
     const [axiosSecure] = useAxiosSecure();
     const { user } = useContext(AuthContext);
     const { homeData } = useDataContext();
     const displayName = user?.displayName;
     const email = user?.email;
     const userPic = user?.photoURL;
     const [isLoading, setIsLoading] = useState(true);
     const [postData, setPostData] = useState([]);
     const [allPostData, setAllPostData] = useState([]);
     const [friendRequest, setFriendRequest] = useState([]);

     const navigate = useNavigate()

     // server allData get start 
     useEffect(() => {
          fetchAllPost();
     }, [isLoading, email]);

     const fetchAllPost = async () => {
          try {
               const response = await fetch('https://social-media-platform-server-side-sarzil727945.vercel.app/allPost');
               const jsonData = await response.json();
               setAllPostData(jsonData);;
               setIsLoading(false);
          } catch (error) {
               console.error('Error fetching data:', error);
          }
     };
     // server allData get end

     // friendRequest data get server start
     useEffect(() => {
          fetchFriendRequest();
     }, [isLoading, email]);

     const fetchFriendRequest = async () => {
          try {
               const response = await fetch('https://social-media-platform-server-side-sarzil727945.vercel.app/friendRequest');
               const jsonData = await response.json();
               const myConfirm = jsonData?.filter(f => f.request === "confirm")
               setFriendRequest(myConfirm);
               setIsLoading(false);
          } catch (error) {
               console.error('Error fetching data:', error);
          }
     };
     // friendRequest data get server end

     useEffect(() => {
          const myEmail1 = friendRequest.filter(f => f.rEmail === email)
          const myEmail2 = friendRequest.filter(f => f.email === email)
          const myEmail = [...myEmail1, ...myEmail2]
          const myFriendsPost = allPostData?.filter((p) => {
               const ok = myEmail?.some((f) => (p.email === f.email) || (p.email === f.rEmail));
               return ok
          });
          setPostData(myFriendsPost)
     }, [allPostData, friendRequest]);

     // search part start 
     useEffect(() => {
          setPostData(homeData)
     }, [homeData])
     // search part end

     // like part start 
     // allLike data get server start
     const [likeData, setLikeData] = useState([]);
     useEffect(() => {
          fetchLikeData();
     }, []);

     const fetchLikeData = async () => {
          try {
               const response = await fetch('https://social-media-platform-server-side-sarzil727945.vercel.app/like');
               const jsonData = await response.json();
               setLikeData(jsonData);
               setIsLoading(false);
          } catch (error) {
               console.error('Error fetching data:', error);
          }
     };
     // allLike data get server end

     // like data post and delete server start
     const like = (likeId) => {
          const add = { likeId, displayName, email, userPic }
          {
               const skData = likeData.filter((f) => f.likeId === likeId);
               const likeEmail = skData.filter((e) => e.email === email);
               const [Obj] = likeEmail
               const sameEmail = (Obj?.email === email)
               const id = (Obj?._id);

               (sameEmail) ?
                    fetch(`https://social-media-platform-server-side-sarzil727945.vercel.app/like/${id}`, {
                         method: 'DELETE'
                    })
                         .then(res => res.json())
                         .then(data => {
                              console.log(data);
                              const remaining = likeData.filter(item => item._id !== id)
                              setLikeData(remaining);
                         }) :
                    axiosSecure.post('/like', add)
                         .then(data => {
                              console.log(data);
                              fetchLikeData();
                         })

          }
     };
     // like data post and delete server end 

     // like sameId data start 
     const [dataL, setDataL] = useState([]);
     useEffect(() => {
          const filteredData = postData.map((p) => {
               return likeData.filter((f) => p._id === f.likeId);
          });
          setDataL(filteredData);
     }, [postData, likeData]);
     // like sameId data end 

     // likeIcon Change start 
     const [alreadyLike, setAlreadyLike] = useState([]);
     useEffect(() => {
          const likeEmail = dataL.map((d) => {
               return d.filter((f) => f.email === email);
          });
          setAlreadyLike(likeEmail);
     }, [dataL]);
     // likeIcon Change end 

     const [onePostAllLike, setOnePostAllLike] = useState([])
     const allLikeUser = (id) => {
          const AllLike = likeData.filter(f => f.likeId === id)
          setOnePostAllLike(AllLike);
     }
     // like part end

     // server allMessage data get start
     const [messageData, setMessageData] = useState([]);
     useEffect(() => {
          fetchMData();
     }, []);

     const fetchMData = async () => {
          try {
               const response = await fetch('https://social-media-platform-server-side-sarzil727945.vercel.app/message');
               const jsonData = await response.json();
               setMessageData(jsonData);
               setIsLoading(false);
          } catch (error) {
               console.error('Error fetching data:', error);
          }
     };
     // // server allMessage data get exit

     // comments part start
     const [dataM, setDataM] = useState([]);
     useEffect(() => {
          const filteredData = postData.map((p) => {
               return messageData.filter((f) => p._id === f.messageId);
          });
          setDataM(filteredData);
     }, [postData, messageData]);

     const [comment, setComment] = useState([])
     const selectComment = (id) => {
          setComment([id])
          fetchMData();
     }
     // comments part end


     return (
          <div className='bg-base-200 pb-10'>
               <div className=' lg:pt-28 pt-20'>
                    <div className=' lg:mx-72'>
                         {
                              (postData)?.map((data, index) =>
                                   <div className="card card-compact w- h-full bg-base-100 shadow-2xl lg:mt-10 mt-5 lg:mx-32" key={data._id}>
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
                                             <div className=' mb-3 px-5 overflow-hidden'>
                                                  <p>{data.Bio}</p>
                                             </div>
                                        </div>
                                        <figure><img src={data?.fileImg} alt="Shoes" /></figure>
                                        <div className="card-body">
                                             <div className=' flex justify-between lg:px-5'>
                                                  <div>
                                                       <div onClick={() => allLikeUser(data?._id)}
                                                       >
                                                            {dataL[index]?.length}
                                                            <button className='mx-1'>
                                                                 <label htmlFor="my_modal_7">
                                                                      Like
                                                                 </label>
                                                            </button>
                                                       </div>
                                                  </div>
                                                  <div>
                                                       <div onClick={() => selectComment(data?._id)} className=' flex'>
                                                            <div>
                                                                 {dataM[index]?.length}
                                                                 <button className='mx-1'>
                                                                      <a> comment</a>
                                                                 </button>
                                                            </div>
                                                       </div>
                                                  </div>
                                             </div>

                                             <div className=' border-t-2 border-b-2 mt-1'>

                                                  <div className=' flex justify-between lg:px-5 lg:py-1'>
                                                       <div>
                                                            <div className=' flex'>

                                                                 <button className=' me-1 flex items-center text-2xl btn btn-ghost' onClick={() => like(data?._id)} >
                                                                      {
                                                                           (alreadyLike[index]?.length !== 0) ? (alreadyLike[index]?.map(d => < div key={d._id}>
                                                                                {d.email && <span className=' text-blue-600'><AiTwotoneLike /></span>
                                                                                }
                                                                           </div>)) : <span><AiOutlineLike /></span>
                                                                      }

                                                                      <p className=' text-[15px] '> Like</p>

                                                                 </button>
                                                            </div>
                                                       </div>
                                                       <div>
                                                            <div onClick={() => selectComment(data?._id)} className=' flex'>
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

                                                       comment.map(d => (d === data?._id) && <Comments
                                                            id={d}
                                                            key={d}
                                                            fetchMData={fetchMData}
                                                       ></Comments>)
                                                  }

                                             </div>
                                        </div>
                                   </div>
                              )
                         }

                    </div>
                    <div>
                         {
                              isLoading ? <div className="text-center my-60">
                                   <span> loading....</span>
                              </div> : <div>
                                   {
                                        (postData[0]) ? '' : <div className=' my-60 text-center h-full text-5xl text-red-600 font-bold'><span>Not Found !!</span></div>
                                   }
                              </div>
                         }
                    </div>

               </div>

               {/* modal like start  */}
               <div>
                    <input type="checkbox" id="my_modal_7" className="modal-toggle" />
                    <div className="modal">
                         <div className="modal-box">
                              <div className=' flex justify-end modal-action mt-0'>
                                   <label htmlFor="my_modal_7" className="btn btn-circle bg-[#e0e0dd] text-black hover:bg-[#9b9b9a] border-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                   </label>
                              </div>
                              <div className=' h-44'>
                                   {
                                        onePostAllLike?.map(d => <div key={d._id}>
                                             <p>{d.displayName}</p>
                                        </div>)
                                   }
                              </div>
                         </div>
                    </div>
               </div>
               {/* modal like end  */}
          </div>
     );
};

export default Home;