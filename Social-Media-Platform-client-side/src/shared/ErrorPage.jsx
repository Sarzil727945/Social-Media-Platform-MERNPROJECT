import React from 'react'
import { Link, useRouteError } from 'react-router-dom'
import img from '../assets/Sing@Nav@Error/error.avif'
import { AiFillBackward } from 'react-icons/ai';

const ErrorPage = () => {
  const { error, status } = useRouteError()
  return (
    <section className='my-2'>
      <div className='container px-5  my-8'>
        <div className=' text-center'>
          <div className=' flex justify-center  '>
            <img src={img} className=' lg:w-1/2 lg:h-96 ' alt="" />
          </div>
          <h1 className=' text-[55px] font-bold text-red-500'>
            <span>Error</span> {status || 'status code not available'}
          </h1>
          <h3 className=' font-bold text-2xl mb-6'>
            {error?.message}
          </h3>
          <button className='btn btn-primary mt-3'>
            <Link
              to='/'
              className='text-decoration-none'
            >
             <p className=' flex'><span className=' me-1 text-2xl align-middle '><AiFillBackward/></span> <span className=' mt-1'>Back to Home Page</span></p>
            </Link>
          </button>
        </div>
      </div>
    </section>
  )
}

export default ErrorPage
