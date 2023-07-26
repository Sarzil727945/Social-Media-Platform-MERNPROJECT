import React from 'react';
import { useState } from 'react';
import { BiSolidSend } from 'react-icons/bi';


const Comments = ({id}) => {
     console.log(id);

     const [input1Value, setInput1Value] = useState('');
     const handleInput1Change = (e) => {
          setInput1Value(e.target.value);
     };
     const isButtonDisabled = !(input1Value);

     return (
          <div>
               <form className='flex'>
                    <div className=' relative w-[333%]'>
                         <div className=" mx-5 mt-1">
                              <div>
                              <textarea placeholder="Write a public comment..." className="textarea textarea-bordered w-full pe-[10%] rounded-[18px]" onChange={handleInput1Change}></textarea>
                              </div>
                         <div className=' absolute bottom-0 right-[0] me-11 mb-2'>
                              {
                                   isButtonDisabled ?  <button type="submit" className="  w-full text-[25px]" disabled={isButtonDisabled}><BiSolidSend/></button> :   <button type="submit" className=" w-full text-[25px] text-blue-700" disabled={isButtonDisabled}><BiSolidSend/></button>
                              }
                         </div>
                         </div>
                    </div>
               </form>
               <div className=' mx-5 mt-2'>
                    all comments
               </div>
          </div>
     );
};

export default Comments;