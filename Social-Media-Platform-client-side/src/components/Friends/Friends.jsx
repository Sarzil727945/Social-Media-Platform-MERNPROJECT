import React, { useContext, useEffect, useState } from 'react';
import useTitle from '../../hooks/useTitle';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Friends = () => {
     useTitle('Friends')
     const navigate = useNavigate()
     const { user } = useContext(AuthContext)
     const [allUser, setAllUser] = useState([])
     const [searchText, setSearchText] = useState('')
     const [isLoading, setIsLoading] = useState(true);
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
               setAllUser(jsonData);
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

     const [disabledButtons, setDisabledButtons] = useState([]);
     const friendRequests = (data) => {
          const rEmail = data?.email;
          const add = { displayName, email, userPic, rEmail }
          console.log(add);
          setDisabledButtons([...disabledButtons, data?._id])
     }

     return (
          <div className=' '>
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
                         allUser.map(item =>
                              <div className="card card-compact w-100 bg-base-100 shadow-xl" key={item._id}>
                                   <figure><img className=' w-full h-[255px]' src={item.img} alt="Shoes" /></figure>
                                   <div className="card-body">
                                        <h2 className="card-title">{item.name}</h2>
                                        <div className="card-actions flex justify-center my-2">
                                             <button onClick={() => friendRequests(item)} className="py-2 px-20 bg-blue-600 text-white text-lg rounded-[12px]">{disabledButtons.includes(item?._id) ?"Requests":"Add Friend"}</button>
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