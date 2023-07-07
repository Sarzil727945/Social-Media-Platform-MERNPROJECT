import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../shared/SectionTitle/SectionTitle';

const ChefCard = () => {
     const [card, setCard] = useState([]);

     useEffect(() => {
          fetch('menu.json')
               .then(res => res.json())
               .then(data => {
                    const popularItem = data.filter(item => item.category === "popular")
                    setCard(popularItem)
               })
     }, [])

     return (
          <div>
               <div>
                    <SectionTitle
                    heading="CHEF RECOMMENDS"
                    subHeading= "---Should Try---"
                    ></SectionTitle>
               </div>
               <div className=' grid lg:grid-cols-4 gap-5 mb-5'>
                    {
                         card.map(item =>
                              <div className="card card-compact w-100 bg-base-100 shadow-xl" key={item._id}>
                                   <figure><img src={item.image} alt="Shoes" /></figure>
                                   <div className="card-body items-center text-center">
                                        <h2 className="card-title">{item.name}</h2>
                                        <p>{item.recipe}</p>
                                        <div className="card-actions my-5">
                                             <button className="btn btn-primary uppercase">add to cart</button>
                                        </div>
                                   </div>
                              </div>
                         )

                    }

               </div>
          </div>
     );
};

export default ChefCard;