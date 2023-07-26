import React from 'react';
import { useState } from 'react';
import { BiSolidSend } from 'react-icons/bi';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { useContext } from 'react';
import useAxiosSecure from '../../hooks/useAxiouSeoure';
import { useEffect } from 'react';


const Comments = ({ id }) => {
     const [axiosSecure] = useAxiosSecure();
     const { user } = useContext(AuthContext)
     const displayName = user?.displayName;
     const email = user?.email;
     const userPic = user?.photoURL;
     const messageId = id;
     const [input1Value, setInput1Value] = useState('');
     const [messageData, setMessageData] = useState([]);
     const handleInput1Change = (e) => {
          setInput1Value(e.target.value);
     };
     const isButtonDisabled = !(input1Value);
     //  allMessage post server start 
     const handelFrom = (event) => {
          event.preventDefault();
          const form = event.target;
          const message = form.message.value;

          const add = { messageId, displayName, email, userPic, message }
          axiosSecure.post('/message', add)
               .then(data => {
                    console.log(data);
               })
          form.reset();
     }
     //  allMessage post server end

     // server allMessage data get start 
     const url = `https://social-media-platform-server-side-sarzil727945.vercel.app/message`;
     useEffect(() => {
          fetch(url)
               .then(res => res.json())
               .then(data => {
                    const sameMassageID = data.filter(d => d.messageId === id)
                    setMessageData(sameMassageID);
               })
     }, [url]);
     // server allMessage data get exit

     console.log(messageData);
     return (
          <div>
               <form className='flex' onSubmit={handelFrom}>
                    <div className=' relative w-[333%]'>
                         <div className=" mx-5 mt-1">
                              <div>
                                   <textarea name='message' placeholder="Write a public comment..." className="textarea textarea-bordered w-full pe-[10%] rounded-[18px]" onChange={handleInput1Change}></textarea>
                              </div>
                              <div className=' absolute bottom-0 right-[0] me-11 mb-2'>
                                   {
                                        isButtonDisabled ? <button type="submit" className="  w-full text-[25px]" disabled={isButtonDisabled}><BiSolidSend /></button> : <button type="submit" className=" w-full text-[25px] text-blue-700" disabled={isButtonDisabled}><BiSolidSend /></button>
                                   }
                              </div>
                         </div>
                    </div>
               </form>
               <div className=' mx-5 mt-2'>
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
          </div>
     );
};

export default Comments;