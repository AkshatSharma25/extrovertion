"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";

const Navbar = () => {
  const [searchText, setsearchText] = useState("");
  const [name, setName] = useState("Name");
  const [openSearch, setOpenSearch] = useState(false);
  const [DropDownOpen, setDropDownOpen] = useState(false);
  const [SearchToolTip, setSearchToolTip] = useState(false);
  const [searchItem, setsearchItem] = useState([]);
  const handleDropdownToggle = () => {
    setDropDownOpen(!DropDownOpen);
  };
  const submitFollow=async (to)=>{
    const object={
      
    }
     try{
      const response=await axios.patch("/api/follow", object);
      console.log(response);
     }
     catch(error){
      console.log(error.message);
     } 
  }
  useEffect(() => {
    
  });
  const updateSearch = (e) => {
    setsearchText(e.target.value);
    
  };
  const toggleSearchMenu = () => {
    setOpenSearch(!openSearch);
    setsearchText("");
    // console.log(openSearch);
  };
  const SubmitSearch = async () => {
    // console.log(searchText)
    if (searchText != "") {
      try {
        const response = await axios.get(`/api/user/search/${searchText}`);
        console.log(response);
        if (response.data.data.length > 0) {
          setsearchItem(response.data.data);
        }
      } catch (error) {
        console.log(error.message);
        a;
      }
      setSearchToolTip(false);
    } else {
      setSearchToolTip(true);
    }
  };
  return (
    <>
      <div className=" h-14 w-[98vw] flex  justify-between px-12 bg-white items-center">
        <Link href="/" className="ml-8">
          <img src="/logo.png" width={200} className="" />
        </Link>
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              toggleSearchMenu();
            }}
            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mb-2   w-[32vw]  "
          >
            Search
          </button>
        </div>
        <div
          className={`absolute w-[45vw] h-[50vh] rounded-lg bg-gray-300 z-50 top-1 left-[27.5%]  ${
            openSearch ? "" : "hidden"
          } transition-all duration-1000 ease-in`}
        >
          <div className="max-w-md mx-auto">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                value={searchText}
                onChange={(e) => {
                  updateSearch(e);
                }}
                className="block w-[80%] p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 h-10 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search User..."
                required
              />
              <button
                onClick={() => {
                  SubmitSearch();
                }}
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 top-[0.5%] h-10"
              >
                Search
              </button>
            </div>
            <button
              onClick={() => {
                toggleSearchMenu();
              }}
              className="text-white absolute top-50 right-[35%] w-64 h-10 end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Cancel
            </button>
            {searchItem.map((item) => {
              return (
                <div className="bg-gray-100 m-2 w-[80%] cursor-pointer p-2 rounded-lg">
                  <div className="px-4 flex gap-8 ">
                    <div className="bg-red-300">
                      <img src={item.profile}  alt="image" />
                    </div>
                    <div>
                      <div>{item.username}</div>
                      <div className="text-xs text-gray-500">{item.name}</div>
                    </div>
                    <div className="">
                    <button onClick={()=>{submitFollow(item._id)}} type="button" className="m-auto focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Follow</button>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className={`text-red-500 text-xs px-52 ${
              SearchToolTip ? "" : "hidden"
            }`}
          >
            *Please enter username or email
          </div>
        </div>
        <div className="flex gap-1">
          <button className="bg-gray-100 ml-4 p-2 rounded-lg shadow-md">
            <img
              src="/notification.svg"
              alt="notification"
              className="invert"
            />
          </button>
          <Link href="/" className="bg-gray-100 mx-4 p-2 rounded-lg shadow-md">
            <img src="/home.svg" alt="notification" className="invert" />
          </Link>

          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className="text-white bg-blue-700 hover:bg-blue-800  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
            type="button"
            onClick={() => setDropDownOpen(!DropDownOpen)}
          >
            {name}
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          <div
            id="dropdown"
            className={`z-10 ${
              DropDownOpen ? "" : "hidden"
            } absolute right-12 top-16 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/setting"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Settings
                </Link>
              </li>

              <li>
                <button
                  onClick={() => {
                    signOut();
                  }}
                  className="block px-4 py-2 w-full text-start hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
