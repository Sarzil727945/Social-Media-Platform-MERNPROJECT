import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../shared/Header/Header';
import Footer from '../shared/Footer/Footer';

const Main = () => {
     const location = useLocation()
     const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('resister')
     return (
          <div>
               {noHeaderFooter || <Header></Header>}
               <Outlet></Outlet>
               { noHeaderFooter || <Footer></Footer>}
          </div>
     );
};

export default Main;