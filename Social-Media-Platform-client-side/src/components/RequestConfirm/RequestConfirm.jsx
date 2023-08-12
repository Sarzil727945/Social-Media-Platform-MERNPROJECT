import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { useEffect } from 'react';

const RequestConfirm = () => {
     const { user } = useContext(AuthContext)
     const [isLoading, setIsLoading] = useState(true);
     const [friendRequest, setFriendRequest] = useState([]);
     const [friendConfirm, setFriendConfirm] = useState([]);
     const email = user?.email;

     // friendRequest data get server start
     useEffect(() => {
          fetchFriendRequest();
     }, [isLoading, email]);

     const fetchFriendRequest = async () => {
          try {
               const response = await fetch('https://social-media-platform-server-side-sarzil727945.vercel.app/friendRequest');
               const jsonData = await response.json();
               setFriendRequest(jsonData);
               setIsLoading(false);
          } catch (error) {
               console.error('Error fetching data:', error);
          }
     };
     // friendRequest data get server end

     useEffect(() => {
          const myEmail = friendRequest.filter(f => f.rEmail === email)
          const myConfirm = myEmail?.filter(f => f.request === "confirm")
          setFriendConfirm(myConfirm);

     }, [friendRequest]);

     return (
          <div>
               <div className=' flex justify-between items-center mx-7'>
                    <div>
                         <h2 className=' text-xl font-bold'>Friends</h2>
                         <p>{friendConfirm?.length} Friends</p>
                    </div>
                    <div>
                         <button className=' text-blue-600'>
                              See all friends
                         </button>
                    </div>
               </div>
               <div className=' mt-5 mx-20'>
                    <div className=' grid lg:grid-cols-3 gap-5 mb-16 mt-5'>
                         {
                              friendConfirm?.map((item, index) =>
                                   <div className="card card-compact w-100 bg-base-100 shadow-xl" key={item._id}>
                                        <figure><img className=' w-full h-[200px]' src={item.userPic} alt="Shoes" /></figure>
                                        <div className="card-body">
                                             <h2 className="card-title">{item.displayName}</h2>
                                        </div>
                                   </div>
                              )
                         }
                    </div>
               </div>
          </div>
     );
};

export default RequestConfirm;
