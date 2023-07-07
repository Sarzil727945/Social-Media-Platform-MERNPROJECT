import React from 'react';
import SectionTitle from '../../../shared/SectionTitle/SectionTitle';

const AddItem = () => {
     return (
          <div className=' w-full'>
               <SectionTitle subHeading="What's new" heading="Add an item"></SectionTitle>
               <form>
                    <div className="form-control w-full mb-4">
                         <label className="label">
                              <span className="label-text font-semibold">Recipe Name*</span>
                         </label>
                         <input type="text" placeholder="Recipe Name"
                              
                              className="input input-bordered w-full " />
                    </div>
                    <div className="flex my-4">
                         <div className="form-control w-full ">
                              <label className="label">
                                   <span className="label-text">Category*</span>
                              </label>
                              <select defaultValue="Pick One"  className="select select-bordered">
                                   <option disabled>Pick One</option>
                                   <option>Pizza</option>
                                   <option>Soup</option>
                                   <option>Salad</option>
                                   <option>Dessert</option>
                                   <option>Desi</option>
                                   <option>Drinks</option>
                              </select>
                         </div>
                         <div className="form-control w-full ml-4">
                              <label className="label">
                                   <span className="label-text font-semibold">Price*</span>
                              </label>
                              <input type="number" placeholder="Type here" className="input input-bordered w-full " />
                         </div>
                    </div>
                    <div className="form-control">
                         <label className="label">
                              <span className="label-text">Recipe Details</span>
                         </label>
                         <textarea  className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                    </div>
                    <div className="form-control w-full my-4">
                         <label className="label">
                              <span className="label-text">Item Image*</span>
                         </label>
                         <input type="file"  className="file-input file-input-bordered w-full " />
                    </div>
                    <input className="btn btn-sm mt-4" type="submit" value="Add Item" />
               </form>
          </div>
     );
};

export default AddItem;