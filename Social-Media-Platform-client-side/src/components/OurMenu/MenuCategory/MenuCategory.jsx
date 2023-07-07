import React from 'react';
import MenuItem from '../../../shared/MenuItem/MenuItem';
import Cover from '../../../shared/Cover/Cover';
import ActiveLink from '../../../ActiveLink/ActiveLink';

const MenuCategory = ({ items, title, coverImg }) => {
     return (
          <div className='my-5'>
               <div className='my-4'>
                    {
                         title && <Cover bgImg={coverImg} title={title} ></Cover>
                    }
               </div>
               <div className=' grid lg:grid-cols-2 gap-10'>
                    {
                         items.map(item => <MenuItem
                              key={item._id}
                              item={item}
                         ></MenuItem>)
                    }
               </div>
               <div className=' text-center'>
                    <ActiveLink to={`/order/${title}`}>
                    <button className="btn btn-outline  btn-ghost border-0 border-b-4 mt-6">ORDER YOUR FAVOURITE FOOD</button>
                    </ActiveLink>
               </div>
          </div>
     );
};

export default MenuCategory;