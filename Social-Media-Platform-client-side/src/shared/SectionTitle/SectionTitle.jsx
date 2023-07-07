import React from 'react';

const SectionTitle = ({heading, subHeading}) => {
     return (
          <div className=' text-center md:w-3/12 mx-auto mb-5'>
               <p className=' text-yellow-500 mb-2'>{subHeading}</p>
               <h3 className=' uppercase text-3xl border-y-4 py-3 mb-4'>{heading}</h3>
          </div>
     );
};

export default SectionTitle;