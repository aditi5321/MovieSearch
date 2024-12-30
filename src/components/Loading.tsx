"use client";
import React from "react";

const Loading = () => {
  return (
    <div className="grid grid-cols-4 items-center justify-center gap-10 lg:mx-10 py-20 ">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((val, index) => (
        <div key={index} className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/5" >
          <div className="h-[300px] w-[200px] bg-gray-100" />
          <div className=" w-[200px] h-[30px] mt-5 bg-gray-100"/>
        </div>
      ))}
    </div>
  );
};

export default Loading;
