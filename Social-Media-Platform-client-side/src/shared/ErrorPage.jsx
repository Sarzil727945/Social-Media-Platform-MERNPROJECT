import React from 'react'
import { Button } from 'react-bootstrap'
import { Link, useRouteError } from 'react-router-dom'
import img from '../assets/404.gif'

const ErrorPage = () => {
  const { error, status } = useRouteError()
  return (
    <section className='my-2'>
      <div className='container px-5 mx-auto my-8'>
        <div className=' text-center'>
          <img src={img} className='w-50' alt="" />
          <h1 className='display-2 fw-bold text-danger'>
            <span>Error</span> {status || 'status code not available'}
          </h1>
          <h3 className=' font-semibold mb-8'>
            {error?.message}
          </h3>
         <Button className='bg-info mt-3'>
         <Link
            to='/'
            className='text-decoration-none'
          >
            Back to HomePage
          </Link>
         </Button>
        </div>
      </div>
    </section>
  )
}

export default ErrorPage
