import React from 'react';

const MenuItem = ({ item }) => {
     const { name, image, price, recipe } = item
     return (
          <div>
               <div className=' flex space-x-3'>
                    <div>
                         <img style={{ borderRadius: '0 200px 200px 200px' }} className=' w-[104px]' src={image} alt="" />
                    </div>
                    <div>
                         <h3 className=' uppercase'>{name}---------</h3>
                         <p>{recipe}</p>
                    </div>
                    <p className=' text-yellow-500'>${price}</p>
               </div>
          </div>
     );
};

export default MenuItem;