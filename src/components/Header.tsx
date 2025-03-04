"use client";

import React from "react";
import { ClerkLoaded, SignedIn, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import useBasketStore from "@/store/store";

function Header() {
  const { user } = useUser();
 const itemCount=useBasketStore((state)=>state.items.reduce((total,item)=>total+item.quantity,0))

  const createclerkPasskey =async()=>{
try {
  const response =await user?.createPasskey();
  console.log(response);
}
catch(error){ 
  console.error(JSON.stringify(error));
}  

  }
  return (
    <header className="flex flex-wrap justify-between items-center px-4 py-2">
    {/* Logo & Search Container */}
    <div className="flex w-full flex-wrap justify-between items-center">
      {/* Logo */}
      <Link
        href="/"
        className="text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer"
      >
        ShopSphere
      </Link>


      <div className="w-full md:w-[400px]">
        <Form action="/Search" className="w-full">
          <input
            type="text"
            name="query"
            placeholder="Search for products"
            className="w-full px-4 py-2 text-gray-800 bg-gray-100 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </Form>
      </div>


    {/* Buttons & User Section */}
    <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 md:flex-none">
      {/* Basket Button */}
      <Link
        href="/basket"
        className="flex-1 relative flex  justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        <TrolleyIcon className="w-6 h-6" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">{itemCount}</span>
        <span>My Basket</span>
      </Link>

      <ClerkLoaded>
        {/* Orders Button */}
        <SignedIn>
          <Link
            href="/orders"
            className="flex-1 relative flex  justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <PackageIcon className="w-6 h-6" />
            <span>My Orders</span>
          </Link>
        </SignedIn>

        {/* User Section */}
   
          {user ? (

              <div className="flex items-center space-x-2">
                <UserButton />
                <div className="hidden text-xs sm:block">
                  <p className="text-gray-800">Welcome Back</p>
                  <p className="text-gray-800">{user.fullName}</p>
                </div>
              </div>
          ):(
            <SignInButton mode="modal"/>
          )}
              {user?.passkeys.length === 0 && (
                <button className="bg-white hover:bg-blue-700 hover:text-white animate-pulse text-blue-500 font-bold py-2 px-4 rounded border-blue-300 border" onClick={createclerkPasskey}>
                  Create a passkey now
                </button>
              )}
       
  
      </ClerkLoaded>
    </div>
    </div>
  </header>
  
  
  );
}

export default Header;
