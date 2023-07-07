import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';

const PrivateRoute = ({ children }) => {
     const { user, loading } = useContext(AuthContext)
     const location = useLocation()
     if (loading) {
          return (<div className='mt-5 pt-5'>
               <div className="text-center mt-5 pt-5">
               <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
               </div>
          </div>
          </div>
          )
     }
    else if (user) {
          return children
     }
     return (
          <div>
               <Navigate to='/login' state={{from:location}} replace></Navigate>
          </div>
     );
};

export default PrivateRoute;