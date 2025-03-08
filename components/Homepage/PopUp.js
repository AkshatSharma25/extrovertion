"use client"
import React,{useEffect, useState} from 'react'

const PopUp = ({show}) => {
 
    return (
        <div>
            <div className={`w-[100vw] flex justify-center items-center h-[100vh] z-50 top-0 left-0 absolute backdrop-blur-md  transition-all duration-750 ${"hello"}`}>
          <div className="bg-gray-200 w-[50%] h-[80%]  rounded-xl">
            <button onClick={() => { setShowPostView(false); }} type="button" className="absolute right-[25.2%] top-[10.5%]  focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-2 py-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"><img src="/cross.svg" alt="" /></button>
            {
               <div className="bg-white rounded-md overflow-hidden flex flex-col justify-center items-center pt-4 mx-8 mt-16">
                
                <div>
                  
                </div>
                <div className="flex justify-center gap-8 items-center p-2">
                  <p></p>
                  <p>
                    
                  </p>
                </div>
              </div>
            }
          </div>
        </div>

        </div>
    )
}

export default PopUp
