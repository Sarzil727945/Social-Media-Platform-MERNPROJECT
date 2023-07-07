import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';

const AdminRoute = ({ children }) => {
     const { user, loading } = useAuth();
     const [isAdmin, isAdminLoading] = useAdmin();
     const location = useLocation()
     if (loading || isAdminLoading) {
          return (<div className='mt-5 pt-5'>
               <div className="text-center mt-5 pt-5">
               <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
               </div>
          </div>
          </div>
          )
     }
    else if (user && isAdmin) {
          return children
     }
     return (
          <div>
               <Navigate to='/' state={{from:location}} replace></Navigate>
          </div>
     );
};

export default AdminRoute;