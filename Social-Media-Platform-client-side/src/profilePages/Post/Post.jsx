import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiouSeoure';
import MyPost from '../MyPost/MyPost';
import { useState } from 'react';
import useTitle from '../../hooks/useTitle';
import Swal from 'sweetalert2';
import RequestConfirm from '../../components/RequestConfirm/RequestConfirm';
const img_hosting_token = import.meta.env.VITE_Image_Upload_token;


const Post = () => {
     useTitle('Profile')
     const navigate = useNavigate();
     const { user } = useContext(AuthContext)
     const [isLoading, setIsLoading] = useState(false);
     const [axiosSecure] = useAxiosSecure();
     const { register, handleSubmit, reset } = useForm();
     const displayName = user?.displayName;
     const email = user?.email;
     const userPic = user?.photoURL;
     const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

     const [input1Value, setInput1Value] = useState('');
     const [input2Value, setInput2Value] = useState('');

     const handleInput1Change = (e) => {
          setInput1Value(e.target.value);
     };

     const handleInput2Change = (e) => {
          setInput2Value(e.target.value);
     };
     const isButtonDisabled = !(input1Value && input2Value);

     const onSubmit = (data) => {

          const formData = new FormData();
          formData.append('image', data.image[0])

          fetch(img_hosting_url, {
               method: 'POST',
               body: formData
          })
               .then(res => res.json())
               .then(imgResponse => {
                    setIsLoading(true)
                    if (imgResponse.success) {
                         const imgURL = imgResponse?.data?.url;
                         const { Bio } = data;
                         console.log(data);
                         const like = 0;
                         const add = { displayName, email, userPic, Bio, like, fileImg: imgURL }
                         axiosSecure.post('/allPost', add)
                              .then(data => {
                                   if (data) {
                                        Swal.fire({
                                             title: 'Success!',
                                             text: 'Your Post Successful !!',
                                             icon: 'success',
                                             confirmButtonText: 'Ok'
                                        })
                                   }
                                   navigate('/profile/myPost')
                                   reset();
                                   setIsLoading(false)
                              })
                    }
               })
     }
     return (
          <div className=' mt-10'>
                <div>
                    <RequestConfirm></RequestConfirm>
               </div>
               <form className='flex justify-center border-b-2 mt-20' onSubmit={handleSubmit(onSubmit)}>
                    <div>
                         <div className="lg:flex">
                              <div>
                                   <input type="text" className="input input-bordered w-full lg:w-[333px] rounded-full" name='Bio'
                                        {...register("Bio", { required: false, maxLength: 120 })}
                                        placeholder="What's on your mind?" aria-label="Bio Data" onChange={handleInput1Change} />
                              </div>
                              <div className="lg:ms-5 lg:mt-0 mt-5">
                                   <input type="file"
                                        {...register("image", { required: false, })}
                                        className="file-input file-input-bordered w-full lg:w-[333px] rounded-full" placeholder="Picture URL" aria-label="Picture URL" onChange={handleInput2Change} />
                              </div>
                         </div>
                         {
                              isLoading && <div className="text-center my-5">
                                   <span> loading....</span>
                              </div>
                         }
                         <div className=' lg:my-10 my-5'>
                              <button type="submit" className="btn btn-active btn-accent w-full rounded-full" disabled={isButtonDisabled}>Post</button>
                         </div>
                    </div>
               </form>
               <div className=' mt-5 '>
                    <MyPost></MyPost>
               </div>
          </div>
     );
};

export default Post;