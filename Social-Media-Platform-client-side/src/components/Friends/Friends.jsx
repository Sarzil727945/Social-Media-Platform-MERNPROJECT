import React, { useContext, useEffect, useState } from 'react';
import useTitle from '../../hooks/useTitle';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiouSeoure';

const Friends = () => {
     useTitle('Friends')
     const navigate = useNavigate()
     const { user } = useContext(AuthContext)
     const [allUser, setAllUser] = useState([])
     const [searchText, setSearchText] = useState('')
     const [isLoading, setIsLoading] = useState(true);
     const [axiosSecure] = useAxiosSecure();
     const displayName = user?.displayName;
     const email = user?.email;
     const userPic = user?.photoURL;

     // server AllUser Data get start
     useEffect(() => {
          fetchData();
     }, []);

     const fetchData = async () => {
          try {
               const response = await fetch(`https://social-media-platform-server-side-sarzil727945.vercel.app/users`);
               const jsonData = await response.json();
               const userBad = jsonData.find(f => f.email !== email)
               const filter = jsonData.filter(f => f.email !== userBad.email)
               setAllUser(filter);
               setIsLoading(false);
          } catch (error) {
               console.error('Error fetching data:', error);
          }
     };
     // // server AllUser Data get exit

     // search part start 
     const handleSubmit = (e) => {
          e.preventDefault();
          fetch(`https://social-media-platform-server-side-sarzil727945.vercel.app/userSearchText/${searchText}`)
               .then((res) => res.json())
               .then((data) => {
                    setAllUser(data);
                    setIsLoading(false);
               });
     }
     const handleKeyPress = (e) => {
          if (e.key === 'Enter') {
               handleSubmit(e);
          }
     };
     // search part end

     // friendRequest data get server start
     const [friendRequest, setFriendRequest] = useState([]);
     useEffect(() => {
          fetchFriendRequest();
     }, []);

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

     // friendRequest data post and Delete server start
     const friendRequests = (data) => {
          const rEmail = data?.email;
          const rId = data?._id
          const add = { displayName, email, userPic, rEmail, rId }

          {
               const skData = friendRequest.filter((f) => f.rId === rId);
               const requestsEmail = skData.filter((e) => e.email === email);
               const [Obj] = requestsEmail
               const sameEmail = (Obj?.email === email)
               const id = (Obj?._id);

               (sameEmail) ?
                    fetch(`https://social-media-platform-server-side-sarzil727945.vercel.app/friendRequest/${id}`, {
                         method: 'DELETE'
                    })
                         .then(res => res.json())
                         .then(data => {
                              console.log(data);
                              const remaining = friendRequest.filter(item => item._id !== id)
                              setFriendRequest(remaining);
                         }) :
                    axiosSecure.post('/friendRequest', add)
                         .then(data => {
                              console.log(data);
                              fetchFriendRequest();
                         })

          }
     }
     // friendRequest data post and Delete server end

     // friendRequest sameId data start 
     const [dataR, setDataR] = useState([]);
     useEffect(() => {
          const filteredData = allUser.map((p) => {
               return friendRequest.filter((f) => p._id === f.rId);
          });
          setDataR(filteredData);
     }, [friendRequest]);
     // friendRequest sameId data end 

     // friendRequestIcon Change start 
     const [alreadyRequest, setAlreadyRequest] = useState([]);
     useEffect(() => {
          const likeEmail = dataR.map((d) => {
               return d.filter((f) => f.email === email);
          });
          setAlreadyRequest(likeEmail);
     }, [dataR]);
     // friendRequestIcon Change end 

     return (
          <div>
               <div className=' z-50 fixed lg:block hidden'>
                    <div className="form-control lg:w-[366px] text-white  mt-[22px] lg:ms-[277px]">
                         <form onSubmit={handleSubmit}>
                              <input onChange={(e) => setSearchText(e.target.value)} onKeyPress={handleKeyPress} type="text" placeholder="Search SA" className="input input-bordered input-info w-full bg-[#434243] rounded-full" />
                         </form>
                    </div>
               </div>
               <div>
                    <h1 className=' text-5xl text-center py-20 font-bold pt-28'>All Friends</h1>
               </div>
               <div className=' grid lg:grid-cols-4 gap-5 mb-5 lg:mx-28 mx-5'>
                    {
                         allUser?.map((item, index) =>
                              <div className="card card-compact w-100 bg-base-100 shadow-xl" key={item._id}>
                                   <figure><img className=' w-full h-[255px]' src={item.img} alt="Shoes" /></figure>
                                   <div className="card-body">
                                        <h2 className="card-title">{item.name}</h2>
                                        <div className="card-actions flex justify-center my-2">
                                             <button onClick={() => friendRequests(item)} className={(alreadyRequest[index]?.length !== 0)?"py-2 px-20 bg-slate-600 text-white text-lg rounded-[12px]" : "py-2 px-20 bg-blue-600 text-white text-lg rounded-[12px]"}>
                                                  {
                                                       (alreadyRequest[index]?.length !== 0) ? (alreadyRequest[index]?.map(d => < div key={d._id}>
                                                            {d.email && <span>Cancel</span>
                                                            }
                                                       </div>)) : <span>Add Friend</span>
                                                  }
                                             </button>
                                        </div>
                                   </div>
                              </div>
                         )
                    }
               </div>
               <div>
                    {
                         isLoading && <div className="text-center my-60">
                              <span> loading....</span>
                         </div>
                    }
               </div>
          </div>
     );
};

export default Friends;