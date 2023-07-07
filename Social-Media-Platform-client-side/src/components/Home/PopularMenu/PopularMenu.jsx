import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../shared/SectionTitle/SectionTitle';
import MenuItem from '../../../shared/MenuItem/MenuItem';
import useMenu from '../../../hooks/useMenu';

const PopularMenu = () => {
     const [menu] = useMenu()
     const popular = menu.filter(item => item.category === "popular")

     return (
          <div className=' mb-12'>
               <div>
                    <SectionTitle
                         heading="FROM OUR MENU"
                         subHeading="---Check it out---"
                    ></SectionTitle>
               </div>
               <div className=' grid lg:grid-cols-2 gap-10'>
                    {
                         popular.map(item => <MenuItem
                              key={item._id}
                              item={item}
                         ></MenuItem>)
                    }
               </div>
               <div>
                    <div className=' text-center'>
                         <button className="btn btn-outline  btn-ghost border-0 border-b-4 mt-6">View Full  Menu</button>
                    </div>
               </div>
          </div>
     );
};

export default PopularMenu;