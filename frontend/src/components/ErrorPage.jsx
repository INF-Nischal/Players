import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-200">
      <h1 className="text-4xl font-bold mb-4 text-red-500">Error 404</h1>
      <p className="text-lg mb-6">Page not found</p>
      <p className="text-gray-600 text-lg">
        Go back to{" "}
        <Link to="/" className="text-blue-400">
          {" "}
          home
        </Link>
      </p>
    </div>
  );
};

export default ErrorPage;
