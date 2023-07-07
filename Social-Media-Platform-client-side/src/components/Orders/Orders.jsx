import React, { useState } from 'react';
import coverImg from '../../assets/shop/banner2.jpg'
import Cover from '../../shared/Cover/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../hooks/useMenu';
import FoodCard from './FoodCard/FoodCard';
import { useParams } from 'react-router-dom';

const Orders = () => {
     const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks']
     const {category} = useParams();
     const initialIndex = categories.indexOf(category)
     const [tabIndex, setTabIndex] = useState(initialIndex);
     const [menu] = useMenu();
     const salad = menu.filter(item => item.category === "salad")
     const dessert = menu.filter(item => item.category === "dessert")
     const pizza = menu.filter(item => item.category === "pizza")
     const soup = menu.filter(item => item.category === "soup")
     const drinks = menu.filter(item => item.category === "drinks")

     return (
          <div>
               <Cover bgImg={coverImg} title={'OUR SHOP'}></Cover>
               <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList>
                         <Tab>Salad</Tab>
                         <Tab>Pizza</Tab>
                         <Tab>Soups</Tab>
                         <Tab>Desserts</Tab>
                         <Tab>Drinks</Tab>
                    </TabList>
                    <TabPanel>
                         <div className=' grid lg:grid-cols-3 gap-5 mb-5'>
                              {
                                   salad.map(item => <FoodCard
                                        key={item._id}
                                        item={item}
                                   ></FoodCard>)
                              }
                         </div>
                    </TabPanel>
                    <TabPanel>
                         <div className=' grid lg:grid-cols-3 gap-5 mb-5'>
                              {
                                   pizza.map(item => <FoodCard
                                        key={item._id}
                                        item={item}
                                   ></FoodCard>)
                              }
                         </div>
                    </TabPanel>
                    <TabPanel>
                         <div className=' grid lg:grid-cols-3 gap-5 mb-5'>
                              {
                                   soup.map(item => <FoodCard
                                        key={item._id}
                                        item={item}
                                   ></FoodCard>)
                              }
                         </div>
                    </TabPanel>
                    <TabPanel>
                         <div className=' grid lg:grid-cols-3 gap-5 mb-5'>
                              {
                                   dessert.map(item => <FoodCard
                                        key={item._id}
                                        item={item}
                                   ></FoodCard>)
                              }
                         </div>
                    </TabPanel>
                    <TabPanel>
                         <div className=' grid lg:grid-cols-3 gap-5 mb-5'>
                              {
                                   drinks.map(item => <FoodCard
                                        key={item._id}
                                        item={item}
                                   ></FoodCard>)
                              }
                         </div>
                    </TabPanel>
               </Tabs>
          </div>
     );
};

export default Orders;