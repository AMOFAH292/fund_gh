import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className=" lg:text-7xl md:text-6xl sm:text-5xl text-5xl font-medium text-center text-red-500">
          Error 404
        </h1>
        <p className="text-xl text-gray-600 my-10 text-center">
          You have navigated to a page that does not exist.
        </p>
      </div>
     </div>
  );
};

export default NotFoundPage;
