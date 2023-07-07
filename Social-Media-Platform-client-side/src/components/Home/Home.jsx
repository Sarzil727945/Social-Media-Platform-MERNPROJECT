import React from 'react';
import Banner from './Banner/Banner';
import Category from './Category/Category';
import BossSection from './BossSection/BossSection';
import PopularMenu from './PopularMenu/PopularMenu';
import CallUs from './CallUs/CallUs';
import ChefCard from './ChefCard/ChefCard';
import Featured from './Featured/Featured';
import Testimonials from './Testimonials/Testimonials';
import useTitle from '../../hooks/useTitle';

const Home = () => {
     useTitle('Home')
     return (
          <div>
               <Banner></Banner>
               <Category></Category>
               <BossSection></BossSection>
               <PopularMenu></PopularMenu>
               <CallUs></CallUs>
               <ChefCard></ChefCard>
               <Featured></Featured>
               <Testimonials></Testimonials>
          </div>
     );
};

export default Home;