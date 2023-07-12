import React, { useContext } from 'react';
import './Login.css';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { GiCheckMark } from 'react-icons/gi';
import ReCAPTCHA from "react-google-recaptcha";
import img from '../../assets/reCaptcha.jpg'
import { PiCheckBold } from 'react-icons/pi';


const Login = () => {
     useTitle('Login')
     const location = useLocation()
     const navigate = useNavigate()
     const emailRef = useRef();

     const [error, setError] = useState('')
     const [user, setUser] = useState('')
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
                    const saveUser = { name: user.displayName, email: user.email }
                    // fetch('https://assignment12-server-site.vercel.app/users',{
                    //      method: 'POST',
                    //      headers: {
                    //           'content-type':'application/json'
                    //      },
                    //      body: JSON.stringify(saveUser)
                    // })
                    // .then(res => res.json())
                    // .then(data => {
                    //      if (data.insertedId) {

                    //           // Verification(currentUser)
                    //      }
                    if (user) {
                         Swal.fire({
                              title: 'Success!',
                              text: 'Login Success !!',
                              icon: 'success',
                              confirmButtonText: 'Ok'
                         })
                    }
                    setUser(user)
                    navigate(from, { replace: true })
                    // })
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
          <div>
               <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                         <div className="text-center lg:w-6/12 lg:text-left lg:ps-5">
                              <h1 className="text-5xl font-bold">Login now!</h1>
                              <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                         </div>
                         <div className="card lg:w-5/12 w-full shadow-2xl bg-base-100">
                              <form className="card-body" onSubmit={handelForm}>
                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">Email</span>
                                        </label>
                                        <input type="email" name='email' placeholder="email" {...("email", {
                                             required: true,
                                        })} className="input input-bordered" ref={emailRef} />
                                   </div>
                                   <div className="form-control">
                                        <div className="form-control">
                                             <label className="label">
                                                  <span className="label-text">Password</span>
                                             </label>
                                             <div className=' relative '>
                                                  <input type={passwordShown ? "text" : "password"}
                                                       placeholder="password" {...("password", {
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

                                   {/* <div onClick={onChange} className=' bg-[#F9F9F9] lg:me-[33%] Border1 flex justify-between items-center'>
                                             <div>
                                                  <Link className=' flex items-center'>{
                                                       disable ? <>
                                                            <span className=' mx-3 px-4 py-4 bg-white Border2'></span>
                                                       </> : <>
                                                            <span className=' ms-3 me-1 text-[33px] text-green-600'><PiCheckBold /></span>
                                                       </>
                                                  }
                                                       <span className='font-medium'>I'm not a robot</span>
                                                  </Link>
                                             </div>
                                             <div>
                                                  <img className=' w-20 h-20 p-1' src={img} alt="" />
                                             </div>
                                        </div> */}
                                   <div className="form-control mt-2">
                                        <input disabled={!captchaToken} type='submit' className="btn btn-active btn-secondary text-xl" value='Log in' />
                                   </div>
                              </form>
                              <div className="form-control flex">
                                   <button onClick={handelGoogleRegister} className="btn btn-square mx-auto w-36"> <span className='text-[40px]'><FcGoogle /></span> <span className=' ms-1 text-[18px] text-purple-500'>Sing in</span></button>
                              </div>
                              <div className=' text-center mt-4'>
                                   or
                              </div>
                              <div className=' mt-3 flex justify-center'>
                                   <hr className=' w-1/4 my-auto' />
                                   <p className=' text-center font-semibold px-2'> Don't have an account? </p>
                                   <hr className=' w-1/4 my-auto' />
                              </div>
                              <Link to='/resister' className="form-control mt-3 pb-8">
                                   <button className="btn btn-wide btn-success text-white mx-auto text-[17px]">Create new account</button>
                              </Link>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Login;