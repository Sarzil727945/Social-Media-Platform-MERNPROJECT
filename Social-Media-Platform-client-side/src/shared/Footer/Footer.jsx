import React from 'react';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';

const Footer = () => {
     return (
          <div>
               <div className="p-4 bg-base-300 ">
                    <div className=' flex lg:justify-between lg:mx-10 text-[17px]'>
                         <div>
                              Developed with <span className=' text-orange-500'>Sarzil Muntaha</span> &copy; 2023
                         </div>
                         <div className=' ms-2'>
                              <a href="#" className=''> Back to top</a>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Footer;