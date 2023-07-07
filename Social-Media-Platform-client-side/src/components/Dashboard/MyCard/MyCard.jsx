import React from 'react';
import useTitle from '../../../hooks/useTitle';
import useCard from '../../../hooks/useCard';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';


const MyCard = () => {
     useTitle('MyCard')
     const [card, refetch] = useCard()
     const total = card.reduce((sum, item) => item.price + sum, 0)

     // card data delete start
     const handelDelete = (item) => {
          Swal.fire({
               title: 'Are you sure?',
               text: "You won't be able to revert this!",
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
               if (result.isConfirmed) {
                    fetch(`http://localhost:5000/cards/${item._id}`, {
                         method: 'DELETE'
                    })
                         .then(res => res.json())
                         .then(data => {
                              if (data.deletedCount > 0) {
                                   refetch();
                                   Swal.fire(
                                        'Deleted!',
                                        'Your Toy has been deleted.',
                                        'success'
                                   )
                              }
                         })
               }
          })

     }
     // card data delete end
     return (
          <div>
               <div className=' uppercase h-[60px] items-center flex justify-evenly font-semibold mt-56'>
                    <h3 className="text-3xl me-20">Total Items : {card.length}</h3>
                    <h3 className="text-3xl me-20">Total Prices : ${total.toFixed(2)}</h3>
                    <button className="btn btn-warning btn-sm me-10">Pay</button>
               </div>
               <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                         {/* head */}
                         <thead>
                              <tr>
                                   <th>#</th>
                                   <th>Food</th>
                                   <th>Item Name</th>
                                   <th>Price</th>
                                   <th>Action</th>
                              </tr>
                         </thead>
                         <tbody>
                              {
                                   card.map((item, index) => <tr
                                        key={item._id}
                                   >
                                        <td>
                                             {index + 1}
                                        </td>
                                        <td>
                                             <div className="avatar">
                                                  <div className="mask mask-squircle w-12 h-12">
                                                       <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                  </div>
                                             </div>
                                        </td>
                                        <td>
                                             {item.name}
                                        </td>
                                        <td className=''>
                                             ${item.price}
                                        </td>
                                        <td>
                                             <button onClick={() => handelDelete(item)} className="btn btn-ghost btn-md bg-red-600 text-white"><FaTrashAlt /></button>
                                        </td>
                                   </tr>)
                              }
                         </tbody>
                    </table>
               </div>
          </div>

     );
};

export default MyCard;