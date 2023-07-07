import React from 'react';
import img from '../../../assets/home/banner.jpg'

const BossSection = () => {
     return (
          <div className=' mb-14 lg:relative bg-fixed'>
               <img src={img} alt="" />
               <div className=' bg-white z-10 lg:w-9/12 text-center lg:absolute lg:bottom-64 lg:left-40 p-11'>
                    <h1 className=' text-4xl my-4'>Bistro Boss</h1>
                    <p className=' lg:w-10/12 mx-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo.</p>
               </div>
          </div>
     );
};

export default BossSection;