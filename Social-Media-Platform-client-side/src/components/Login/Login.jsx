import React, { useContext } from 'react';
import './Login.css';
import img from '../../assets/Sing@Nav@Error/login.avif'
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { PiCaretDoubleRightFill } from 'react-icons/pi';
import ReCAPTCHA from "react-google-recaptcha";


const Login = () => {
     useTitle('Login')
     const location = useLocation()
     const navigate = useNavigate()
     const emailRef = useRef();

     const [error, setError] = useState('')
     const [passwordShown, setPasswordShown] = useState(false);
     const [passwordIcon, setPasswordIcon] = useState(false);
     const [captchaToken, setCaptchaToken] = useState("");

     const { signIn, resetPassword, googlSignIn } = useContext(AuthContext)
     const from = location.state?.from?.pathname || '/';

     const togglePassword = () => {
          setPasswordShown(!passwordShown);
          setPasswordIcon(!passwordIcon)
     };


     const handelForm = (event) => {
          event.preventDefault();
          setError('')
          const form = event.target
          const email = form.email.value;
          const password = form.password.value;

          // Signed in part start
          signIn(email, password)
               .then((userCredential) => {
                    const currentUser = userCredential.user;

                    if (currentUser) {
                         Swal.fire({
                              title: 'Success!',
                              text: 'Login Success !!',
                              icon: 'success',
                              confirmButtonText: 'Ok'
                         })
                    }
                    form.reset()
                    navigate(from, { replace: true })
               })
               .catch((error) => {
                    const errorMessage = error.message;
                    setError(errorMessage)
                    console.log(error);
               });
          // Signed in part end
     }

     // handelGoogleRegister part start
     const handelGoogleRegister = () => {

          googlSignIn()
               .then((result) => {
                    const user = result.user;

                    // user information post data page start 
                    const saveUser = { name: user.displayName, email: user.email, img: user.photoURL }
                    fetch('http://localhost:5000/users', {
                         method: 'POST',
                         headers: {
                              'content-type': 'application/json'
                         },
                         body: JSON.stringify(saveUser)
                    })
                         .then(res => res.json())
                         .then(data => {
                              if (data.insertedId) {

                                   // Verification(currentUser)
                              }
                              if (user) {
                                   Swal.fire({
                                        title: 'Success!',
                                        text: 'Login Success !!',
                                        icon: 'success',
                                        confirmButtonText: 'Ok'
                                   })
                              }
                              navigate(from, { replace: true })
                         })
                    // user information data post data page end

               }).catch((error) => {
                    const errorMessage = error.message;
                    setError(errorMessage)
               });
     }
     // handelGoogleRegister part end

     // Reset Password part start
     const handelResetPassword = () => {
          const email = emailRef.current.value;
          if (!email) {
               alert('Please provide your email')
               return
          }

          resetPassword(email)
               .then(() => {
                    alert('Please check you email')
               })
               .catch((error) => {
                    const errorMessage = error.message;
                    setError(errorMessage)
               });

     }
     // Reset Password part end

     return (
          <div className='hero bg-base-200 min-h-screen'>
               <div className="card  shadow-2xl bg-base-100  lg:w-9/12 mx-auto my-auto mt-8">
                    <div className="hero-content flex-col lg:flex-row w-full">
                         <div className="text-center  w-full relative">
                              <div>
                                   <img src={img} className=' w-full  lg:h-[500px]' alt="" />
                              </div>
                         </div>
                         <div className=" w-full lg:w-11/12">
                              <h1 className="text-4xl font-bold text-center text-[#96238e] pt-5">SIGN IN</h1>
                              <form className="card-body" onSubmit={handelForm}>
                                   <div className="form-control">
                                        <input type="email" name='email' placeholder="User Email" {...("email", {
                                             required: true,
                                        })} className="input input-bordered" ref={emailRef} />
                                   </div>
                                   <div className="form-control mt-2">
                                        <div className="form-control">
                                             <div className=' relative '>
                                                  <input type={passwordShown ? "text" : "password"}
                                                       placeholder="Password" {...("password", {
                                                            required: true,
                                                       })} name='password' className="input input-bordered w-full" />
                                                  <div className=' absolute end-4 top-4'>
                                                       <p className=' text-lg' onClick={togglePassword} >{
                                                            passwordIcon ? <AiFillEye /> : <AiFillEyeInvisible />
                                                       }</p>
                                                  </div>
                                             </div>
                                             <p className=' text-red-400'>{error}</p>
                                             <label className="label">
                                                  <button onClick={handelResetPassword} className='  text-[15px] font-semibold text-blue-600 underline'>Forgot Password?</button>
                                             </label>
                                        </div>
                                   </div>
                                   <ReCAPTCHA className=' w-1'
                                        sitekey="6LehVRsnAAAAAMM4EXD3v1mqKve9NARW_qzmnoQe"
                                        onChange={(token) => setCaptchaToken(token)}
                                   />
                                   <div className="form-control mt-2">
                                        <input disabled={!captchaToken} type='submit' className="btn bg-[#9d2b95] hover:bg-[#9d2b95] text-white text-xl" value='Log in' />
                                   </div>
                              </form>
                              <div className="form-control flex">
                                   <button onClick={handelGoogleRegister} className="btn bg-[#682e9e] hover:bg-[#682e9e] mx-auto w-36"> <span className='text-[40px]'><FcGoogle /></span> <span className=' ms-1 text-[18px] text-white'>Sing in</span></button>
                              </div>
                              <div className=' text-center mt-4'>
                                   or
                              </div>
                              <div className='mt-3 flex justify-center mx-8'>
                                   <hr className=' w-1/4 my-auto' />
                                   <p className=' text-center font-semibold lg:px-2'> Don't have an account? </p>
                                   <hr className=' w-1/4 my-auto' />
                              </div>

                              <Link to='/resister' className=' mt-2 italic font-semibold text-blue-600  text-[17px] underline flex justify-end pb-8 me-5'>
                                   <span>Create new account</span>
                                   <span className=' ms-1 mt-[6px] font-semibold'><PiCaretDoubleRightFill /></span>
                              </Link>
                         </div>

                    </div>
               </div>
          </div>
     );
};

export default Login;