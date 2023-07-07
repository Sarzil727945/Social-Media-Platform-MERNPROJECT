import React, { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useCard from '../../../hooks/useCard';

const FoodCard = ({ item }) => {
     const { image, name, recipe, price, _id } = item;
     const { user } = useContext(AuthContext)
     const [, refetch] = useCard()
     const navigate = useNavigate();
     const location = useLocation()


     const handelAddToCart = (item) =>{
          console.log(item);
          if (user) {
               const cardItem = {menuItemId: _id, name, image, price, email: user.email }
               fetch('http://localhost:5000/cards', {
                    method: 'POST',
                    headers:{
                         'content-type': 'application/json'
                    },
                    body: JSON.stringify(cardItem)
               })
               .then(res => res.json())
               .then(data =>{
                    if (data.insertedId) {
                         refetch()
                         Swal.fire({
                              position: 'top-end',
                              icon: 'success',
                              title: 'Food added on the card',
                              showConfirmButton: false,
                              timer: 1500
                            })   
                    }
               })
          }
          else{
               Swal.fire({
                    title: 'Please login to order the food?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Login Now!'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      navigate('/login', {state: {from: location}})
                    }
                  })
          }
     }
     return (
          <div>
               
                    <div className="card card-compact w-100 bg-base-100 shadow-xl">
                         <figure><img src={image} alt="Shoes" /></figure>
                         <p className=' absolute right-0 mr-8 mt-4 px-4 py-1 bg-slate-800 text-white'>${price}</p>
                         <div className="card-body items-center text-center">
                              <h2 className="card-title">{name}</h2>
                              <p>{recipe}</p>
                              <div className="card-actions my-5">
                                   <button onClick={()=> handelAddToCart(item)} className="btn btn-primary uppercase">add to cart</button>
                              </div>
                         </div>
                    </div>
               </div>
     );
};

export default FoodCard;