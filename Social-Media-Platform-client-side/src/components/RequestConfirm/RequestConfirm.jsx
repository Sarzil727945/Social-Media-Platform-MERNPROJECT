import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { useEffect } from 'react';
import { useDataContext } from '../../DataProvider/DataProvider';

const RequestConfirm = () => {
     const { user } = useContext(AuthContext)
     const { reqFriendsData } = useDataContext();
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

     // friendRequest search part start 
     useEffect(() => {
          const myEmail = reqFriendsData.filter(f => f.rEmail === email)
          const myConfirm = myEmail?.filter(f => f.request === "confirm")
          setFriendConfirm(myConfirm);
     }, [reqFriendsData])
     // friendRequest search part end

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
                    <div>
                         {
                              isLoading ? <div className="text-center my-60">
                                   <span> loading....</span>
                              </div> : <div>
                                   {
                                        (friendConfirm[0]) ? '' : <div className=' mb-20 text-center h-full text-5xl text-red-600 font-bold'><span>Not Found !!</span></div>
                                   }
                              </div>
                         }
                    </div>
               </div>
          </div>
     );
};

export default RequestConfirm;
