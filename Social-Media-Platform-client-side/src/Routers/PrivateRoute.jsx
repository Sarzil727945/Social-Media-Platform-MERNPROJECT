import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';

const PrivateRoute = ({ children }) => {
     const { user, loading } = useContext(AuthContext)
     const location = useLocation()
     if (loading) {
          return (
               <div className='py-72'>
                    <div className="text-center my-5">
                         <span className="loading loading-spinner text-accent w-10"></span>
                    </div>
               </div>
          )
     }
     else if (user) {
          return children
     }
     return (
          <div>
               <Navigate to='/login' state={{ from: location }} replace></Navigate>
          </div>
     );
};

export default PrivateRoute;