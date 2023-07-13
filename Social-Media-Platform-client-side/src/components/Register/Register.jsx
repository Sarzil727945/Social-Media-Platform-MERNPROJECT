import React, { useState } from 'react';
import img from '../../assets/Sing@Nav@Error/register.jpg'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import { updateProfile } from 'firebase/auth';
import { AiFillBackward, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';


const Register = () => {
     useTitle('Register')
     const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

     const [error, setError] = useState('')
     const [success, setSuccess] = useState('')
     const [email, setEmail] = useState("")
     const [emailError, setEmailError] = useState('')
     const [passwordShown, setPasswordShown] = useState(false);

     const { createUser } = useContext(AuthContext)
     const navigate = useNavigate()

     // passwordShown function start 
     const [passwordIcon, setPasswordIcon] = useState(false)
     const [conformPasswordIcon, setConformPasswordIcon] = useState(false)

     const [conformPasswordShown, setConformPasswordShown] = useState(false);

     const togglePassword = () => {
          setPasswordShown(!passwordShown);
          setPasswordIcon(!passwordIcon)
     };
     const toggleConformPassword = () => {
          setConformPasswordShown(!conformPasswordShown);
          setConformPasswordIcon(!conformPasswordIcon)
     }
     // passwordShown function end

     // main form part start 
     const onSubmit = (data) => {
          setError(' ')
          setSuccess(' ')

          if (data.password !== data.conformPassword) {
               setError("Don't mach this password")
               return
          }
          else if (data.password.length < 6) {
               setError('Please The password is less than 6 characters')
               return
          }
          else if (!/(?=.*[A-Z])/.test(data.password)) {
               setError('Please At least one upper case')
               return
          }


          // Signed up part start
          createUser(data.email, data.password)
               .then((userCredential) => {
                    const currentUser = userCredential.user;
                    setSuccess('Create user account successFull')
                    upDataUser(currentUser, data.name, data.photo)

                    // user information post data page start 
                    const saveUser = { name: data.name, email: data.email, img: data.photoUrl }
                    // fetch('https://assignment12-server-site.vercel.app/users', {
                    //      method: 'POST',
                    //      headers: {
                    //           'content-type': 'application/json'
                    //      },
                    //      body: JSON.stringify(saveUser)
                    // })
                    //      .then(res => res.json())
                    //      .then(data => {
                    //           if (data.insertedId) {
                    if (currentUser) {
                         Swal.fire({
                              title: 'Success!',
                              text: 'Register Success !!',
                              icon: 'success',
                              confirmButtonText: 'Ok'
                         })
                    }
                    reset();
                    // Verification(currentUser)
                    navigate('/')
                    setEmail('')
                    //      }
                    // })
                    // user information post data page end
               })
               .catch((error) => {
                    const errorMessage = error.message;
                    setError(errorMessage)
               });
          // Signed up part end
     }
     // main form part end

     const upDataUser = (user, name, photoUrl) => {
          updateProfile(user, {
               displayName: name,
               photoURL: photoUrl
          })
               .then(() => {
                    // Profile updated!
                    // ...
               }).catch((error) => {
                    setError(error.message)
               });
     }

     return (
          <div className='hero bg-base-200 min-h-screen'>
               <div className="hero min-h-screen ">
                    <div className="hero-content flex-col lg:flex-row w-full card shadow-2xl bg-base-100">
                         <div className=" text-center lg:text-left lg:relative">
                              <div className=' lg:absolute lg:top-1 lg:bottom-0 lg:start-36 start-2 text-[#0C87B9] text-center'>
                                   <p className=' text-[20px]'>Please Resister to continue</p>
                                   <h3 className="text-[33px] font-bold">WELCOME TO INCAM !</h3>
                              </div>
                              <img src={img} className=' lg:h-[500px] lg:w-[625px] w-full' alt="" />
                         </div>

                         <div className=" flex-shrink-0 w-full lg:w-5/12 ">
                              <form onSubmit={handleSubmit(onSubmit)} className="card-body">

                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">Name</span>
                                        </label>
                                        <input type="text"
                                             placeholder="Name" {...register("name", { required: true })} name='name' className="input input-bordered" />
                                        {errors.name && <span className=' text-red-500 mt-1'>Name is required</span>}
                                   </div>

                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">Photo URL</span>
                                        </label>
                                        <input type="text"
                                             placeholder="Photo URL" {...register("photo")} name='photo' className="input input-bordered" />
                                   </div>

                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">Email</span>
                                        </label>
                                        <input type="email" placeholder="email" name='email'
                                             defaultValue={email}
                                             {...register("email", { required: true })} className="input input-bordered" />
                                        {errors.email && <span className=' text-red-500 mt-1'>Email is required</span>}

                                   </div>

                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">Password</span>
                                        </label>
                                        <div className=' relative '>
                                             <input type={passwordShown ? "text" : "password"}
                                                  placeholder="password" {...register("password", {
                                                       required: true,
                                                       minLength: 6,
                                                       maxLength: 10,
                                                  })} name='password' className="input input-bordered w-full" />
                                             <div className=' absolute end-4 top-4'>
                                                  <p className=' text-lg' onClick={togglePassword} >{
                                                       passwordIcon ? <AiFillEye /> : <AiFillEyeInvisible />
                                                  }</p>
                                             </div>
                                        </div>
                                        {errors.password && <span className=' text-red-500 mt-1'>Password is required</span>}
                                        {errors.password?.type === 'minLength' && <span className=' text-red-500 mt-1'>Password must be 6 characters And At least one upper </span>}
                                        {errors.password?.type === 'maxLength' && <span className=' text-red-500 mt-1'> At least one upper case</span>}
                                   </div>


                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">Conform Password</span>
                                        </label>
                                        <div className=' relative '>
                                             <input type={conformPasswordShown ? "text" : "password"}
                                                  placeholder="Conform Password" {...register("conformPassword", {
                                                       required: true,
                                                       minLength: 6,
                                                       maxLength: 10,
                                                  })} name='conformPassword' className="input input-bordered w-full" />
                                             <div className=' absolute end-4 top-4'>
                                                  <p className=' text-lg' onClick={toggleConformPassword} >{
                                                       conformPasswordIcon ? <AiFillEye /> : <AiFillEyeInvisible />
                                                  }</p>
                                             </div>
                                        </div>
                                   </div>
                                   <p className='text-red-500'>{error}</p>

                                   <div className="form-control mt-2">
                                        <button className="btn bg-[#0C87B9] hover:bg-[#0C87B9] text-xl">Sign Up</button>

                                   </div>
                                   <div className=' text-end'>
                                        <Link to='/login' className=' mt-2 italic font-semibold text-blue-600  text-[17px] underline flex justify-end'>
                                             <span className=' me-1 mt-1 font-semibold'><AiFillBackward /></span>
                                             <span>Back To Login</span>
                                        </Link>
                                   </div>
                              </form>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Register;