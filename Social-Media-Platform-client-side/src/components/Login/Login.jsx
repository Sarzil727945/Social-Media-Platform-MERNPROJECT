import React, { useContext } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';


const Login = () => {
     useTitle('Login')
     const [error, setError] = useState('')
     const [user, setUser] = useState('')
     const [passwordShown, setPasswordShown] = useState(false);
     const [passwordIcon, setPasswordIcon] = useState(false)

     const location = useLocation()
     const navigate = useNavigate()

     const { signIn, resetPassword, googlSignIn } = useContext(AuthContext)
     const from = location.state?.from?.pathname || '/';
     const emailRef = useRef();

     const togglePassword = () => {
          setPasswordShown(!passwordShown);
          setPasswordIcon(!passwordIcon)
     };
     //  captcha part start 
     const captchaRef = useRef(null)
     const [disable, setDisable] = useState(true)

     useEffect(() => {
          loadCaptchaEnginge(6);
     }, [])

     const handelCaptcha = (e) => {
          const user_captcha_value = captchaRef.current.value;
          if (validateCaptcha(user_captcha_value)) {
               setDisable(false)
          }
          else {
               setDisable(true)
          }

     }
     //  captcha part ends

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
     return (
          <div>
               <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                         <div className="text-center md:w-1/2 lg:text-left">
                              <h1 className="text-5xl font-bold">Login now!</h1>
                              <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                         </div>
                         <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                              <form className="card-body" onSubmit={handelForm}>
                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">Email</span>
                                        </label>
                                        <input type="email" name='email' placeholder="email" className="input input-bordered" />
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
                                        </div>
                                        <label className="label">
                                             <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                        </label>
                                   </div>
                                   <div className="form-control">
                                        <label className="label">
                                             <LoadCanvasTemplate />
                                        </label>
                                        <input type="text" ref={captchaRef} name='captcha' placeholder="Type the captcha above" className="input input-bordered" />
                                        <button onClick={handelCaptcha} className="btn btn-outline btn-info btn-xs mt-1" >captcha</button>
                                   </div>
                                   <div className="form-control mt-6">
                                        <input disabled={disable} type='submit' className="btn btn-primary" value='Login' />
                                   </div>
                                   <div className="form-control mt-6">
                                        <button onClick={handelGoogleRegister} className="btn btn-wide mx-auto">Googl Sign In</button>
                                   </div>
                              </form>
                              <p> <small>New Here?</small> <Link to='/signUp'>Create an account</Link></p>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Login;