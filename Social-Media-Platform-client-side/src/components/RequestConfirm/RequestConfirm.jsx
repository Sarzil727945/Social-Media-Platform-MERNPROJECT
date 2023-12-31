import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { useEffect } from 'react';
import { useDataContext } from '../../DataProvider/DataProvider';
import Swal from 'sweetalert2';

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
     const [myConfirm, setMyConfirm] = useState([])
     const [confirm] = myConfirm;
     useEffect(() => {
          const myEmail1 = friendRequest.filter(f => f.rEmail === email)
          const myEmail2 = friendRequest.filter(f => f.email === email)
          const myConfirm1 = myEmail1?.filter(f => f.request === "confirm")
          const myConfirm2 = myEmail2?.filter(f => f.request === "confirm")
          setMyConfirm(myConfirm2);
          const myConfirmAll = [...myConfirm1, ...myConfirm2].reverse()
          setFriendConfirm(myConfirmAll);

     }, [friendRequest]);

     // friendRequest search part start 
     useEffect(() => {
          const myEmail = reqFriendsData.filter(f => f.rEmail === email)
          const myConfirm = myEmail?.filter(f => f.request === "confirm")
          setFriendConfirm(myConfirm);
     }, [reqFriendsData])
     // friendRequest search part end
     
      // confirm friend data delete start
      const confirmHandelDelete = (id) => {
          Swal.fire({
               title: 'Are you sure?',
               text: "Do you delete your friend !!",
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
               if (result.isConfirmed) {

                    fetch(`https://social-media-platform-server-side-sarzil727945.vercel.app/friendRequest/${id}`, {
                         method: 'DELETE'
                    })
                         .then(res => res.json())
                         .then(data => {
                              if (data.deletedCount > 0) {
                                   Swal.fire(
                                        'Deleted!',
                                        'Confirm Friend has been deleted.',
                                        'success'
                                   )

                                   const remaining = friendConfirm.filter(item => item._id !== id)
                                   setFriendConfirm(remaining);
                              }
                         })
               }
          })
     }
     // confirm friend data delete end

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
               <div className=' mt-5 lg:mx-20 mx-3'>
                    <div className=' grid lg:grid-cols-3 grid-cols-2 lg:gap-5 gap-3 mb-16 mt-5'>
                         {
                              friendConfirm?.map((item, index) =>
                                   <div className="card card-compact w-100 bg-base-100 shadow-xl" key={item._id}>

                                        <button onClick={() => confirmHandelDelete(item?._id)}>
                                             {
                                                  confirm?._id === item?._id ? <figure><img className=' w-full lg:h-[200px] h-[100px] rounded-t-[15px]' src={item.rImg} alt="Shoes" /></figure> : <figure><img className=' w-full lg:h-[200px] h-[100px] rounded-t-[15px]' src={item.userPic} alt="Shoes" /></figure>
                                             }
                                             {
                                                  confirm?._id === item?._id ? <div className="card-body">
                                                       <h2 className="card-title lg:text-[20px] text-[18px]">{item.rName}</h2>
                                                  </div> : <div className="card-body">
                                                       <h2 className="card-title lg:text-[20px] text-[18px]">{item.displayName}</h2>
                                                  </div>
                                             }
                                        </button>
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
