import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useTitle from '../../hooks/useTitle';
import { FaTrashAlt, FaUserShield } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiouSeoure';

const AllUsers = () => {
     useTitle('AllUsers')
     const [axiosSecure] = useAxiosSecure();

     const { data: users = [], refetch } = useQuery(['users'], async () => {
          const res = await axiosSecure.get('/users')
          return res.data;
     })

          // admin part start
          const handelMakeAdmin = (user) => {
               fetch(`http://localhost:5000/users/admin/${user._id}`, {
                    method: 'PATCH'
               })
               .then(res => res.json())
               .then(data =>{
                    if (data.modifiedCount) {
                         refetch()
                         Swal.fire({
                              position: 'top-end',
                              icon: 'success',
                              title: `${user.name} is an admin now`,
                              showConfirmButton: false,
                              timer: 1500
                            })
                    }
               })
          }
          // admin part end

          // card data delete start
          const handelDelete = (user)=>{

          }
          // card data delete end
     return (
          <div className=' w-full'>
               <h1 className=' text-3xl font-semibold my-5 text-center'>Total users: {users.length}</h1>
               <div className="overflow-x-auto w-full">
                    <table className="table table-zebra w-full">
                         {/* head */}
                         <thead>
                              <tr>
                                   <th>#</th>
                                   <th>Name</th>
                                   <th>Email</th>
                                   <th>Role</th>
                                   <th>Action</th>
                              </tr>
                         </thead>
                         <tbody>

                              {
                                   users.map((user, index) => <tr key={user._id}>
                                        <th>{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                             {
                                                  user.role === 'admin'? 'admin' : <button onClick={() => handelMakeAdmin(user)} className="btn btn-ghost btn-md bg-orange-500 text-white"><FaUserShield></FaUserShield></button>
                                                  
                                             }
                                        </td>
                                        <td>
                                             <button onClick={() => handelDelete(user)} className="btn btn-ghost btn-md bg-red-600 text-white"><FaTrashAlt /></button>
                                        </td>
                                   </tr>)
                              }

                         </tbody>
                    </table>
               </div>
          </div>
     );
};

export default AllUsers;