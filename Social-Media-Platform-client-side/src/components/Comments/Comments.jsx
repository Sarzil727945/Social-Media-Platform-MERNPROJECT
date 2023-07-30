import React from 'react';
import { useState } from 'react';
import { BiSolidSend } from 'react-icons/bi';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { useContext } from 'react';
import useAxiosSecure from '../../hooks/useAxiouSeoure';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Comments = ({ id, fetchMData, fetchMessageData }) => {
     const [axiosSecure] = useAxiosSecure();
     const { user } = useContext(AuthContext)
     const displayName = user?.displayName;
     const email = user?.email;
     const userPic = user?.photoURL;
     const messageId = id;
     const navigate = useNavigate()
     const [isLoading, setIsLoading] = useState(true);
     const [input1Value, setInput1Value] = useState('');
     const [messageData, setMessageData] = useState([]);
     const handleInput1Change = (e) => {
          setInput1Value(e.target.value);
     };
     const isButtonDisabled = !(input1Value);

     // server allMessage data get start
     useEffect(() => {
          fetchData();
     }, []);

     const fetchData = async () => {
          try {
               const response = await fetch('https://social-media-platform-server-side-sarzil727945.vercel.app/message');
               const jsonData = await response.json();
               const sameMassageID = jsonData.filter(d => d.messageId === id)
               setMessageData(sameMassageID);
               
               setIsLoading(false);
               fetchMessageData();
          } catch (error) {
               console.error('Error fetching data:', error);
          }
     };
     // // server allMessage data get exit

     //  allMessage post server start 
     const handelFrom = (event) => {
          event.preventDefault();
          const form = event.target;
          const message = form.message.value;

          const add = { messageId, displayName, email, userPic, message }
          axiosSecure.post('/message', add)
               .then(data => {
                    fetchData();
                    fetchMData();
                    fetchMessageData();
                    console.log(data);
               })
          form.reset();

     }
     //  allMessage post server end


     return (
          <div >
               {
                    isLoading && <div className="text-center my-5">
                         <span> loading....</span>
                    </div>
               }

               <div className=' relative'>
                    <div className=' mx-5 mt-2 h-[333px] overflow-scroll pb-32'>
                         {
                              messageData.map(data => <div key={data._id}>
                                   <div className=' flex items-center mb-5'>
                                        <div>
                                             <img className=' w-8 h-8 rounded-full me-2' src={data.userPic} alt="" />
                                        </div>
                                        <div className=' bg-[#e8e3e3] rounded-[18px]'>
                                             <div className=' px-4 pb-2 '>
                                                  <p className=' pt-2'>{data.displayName}</p>
                                                  <h2 className=' text-[17px]'>{data.message}</h2>
                                             </div>
                                        </div>
                                   </div>
                              </div>)
                         }
                    </div>

                    <div className=' absolute w-full bottom-[-10px]'>
                         <form className='flex' onSubmit={handelFrom}>
                              <div className=' relative w-[333%]'>
                                   <div className=" lg:mx-5 mx-2 mt-1">
                                        <div>
                                             <textarea name='message' placeholder="Write a public comment..." className="textarea textarea-bordered  w-full pe-[10%] rounded-[18px]" onChange={handleInput1Change}></textarea>
                                        </div>
                                        <div className=' absolute bottom-0 right-[0] lg:me-11 pb-2 me-5'>
                                             {
                                                  isButtonDisabled ? <button type="submit" className="  w-full text-[25px]" disabled={isButtonDisabled}><BiSolidSend /></button> : <button type="submit" className=" w-full text-[25px] text-[#3e9dc2]" disabled={isButtonDisabled}><BiSolidSend /></button>
                                             }
                                        </div>
                                   </div>
                              </div>
                         </form>
                    </div>
               </div>
          </div>
     );
};

export default Comments;