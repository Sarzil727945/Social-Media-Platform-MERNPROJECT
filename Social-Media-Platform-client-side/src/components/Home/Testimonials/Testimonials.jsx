import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../shared/SectionTitle/SectionTitle';
import { FaQuoteLeft } from 'react-icons/fa';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'


const Testimonials = () => {
     const [review, setReview] = useState([]);

     useEffect(() => {
          fetch('http://localhost:5000/reviews')
               .then(res => res.json())
               .then(data => {
                    setReview(data)
               })
     }, [])

     return (
          <div className=' my-12'>
               <div>
                    <SectionTitle
                         heading="TESTIMONIALS"
                         subHeading="---What Our Clients Say---"
                    ></SectionTitle>
               </div>
               <div>
                    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                         {
                              review.map(review => <SwiperSlide
                                   key={review._id}>
                                   <div className=' flex flex-col items-center text-center mx-24 my-12'>
                                        <Rating
                                             style={{ maxWidth: 180 }}
                                             value={review.rating}
                                             readOnly
                                        />
                                        <div className=' text-6xl my-10'>
                                             <FaQuoteLeft />
                                        </div>
                                        <p>{review.details}</p>
                                        <h3 className="text-2xl text-orange-400 my-2">{review.name}</h3>
                                   </div>
                              </SwiperSlide>
                              )
                         }
                    </Swiper>
               </div>
          </div>
     );
};

export default Testimonials;