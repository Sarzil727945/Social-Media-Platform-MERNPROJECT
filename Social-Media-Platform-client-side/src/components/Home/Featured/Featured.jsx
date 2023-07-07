import React from 'react';
import SectionTitle from '../../../shared/SectionTitle/SectionTitle';
import featuredImg from '../../../assets/home/featured.jpg'
import './Featured.css'

const Featured = () => {
     return (
          <div className="featured text-white bg-fixed my-10 lg:my-20">
               <div className='bg-slate-600 bg-opacity-60'>
                    <div className=' pt-20'>
                         <SectionTitle
                              heading="---Check it out---"
                              subHeading="FROM OUR MENU"
                         ></SectionTitle>
                    </div>
                    <div className=' md:flex justify-center items-center pb-20 pt-12 px-16 '>
                         <div>
                              <img src={featuredImg} alt="" />
                         </div>
                         <div className=' md:ml-10'>
                              <h3>March 20, 2023</h3>
                              <h3 className=' uppercase'>WHERE CAN I GET SOME?</h3>
                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                              <button className="btn btn-outline  btn-ghost border-0 border-b-4 mt-6">Read More</button>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Featured;