import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div
      className="
              w-full  
                flex  flex-col items-center justify-center
                 h-full   pt-16 sm:pt-22 md:pt-28"
    >
      <div
        className=" 
         bg-center md:bg-cover bg-contain 
              w-full py-auto h-screen
              md:px-2  p-10 flex  flex-col items-center justify-center"
      >
        <div>
          <h1 className="pb-2 text-red-500 font-bold md:text-4xl text-xl">
            404 - Page Not Found
          </h1>
          <p className="pb-5 md:text-2xl">
            Oops! The page you are looking for does not exist.
          </p>
          <Link className="rounded-md text-white p-3 bg-blue-500" to="/">
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
