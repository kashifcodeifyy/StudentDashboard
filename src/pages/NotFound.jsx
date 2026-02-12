import React from "react";
import { Link } from "react-router-dom";
import { OctagonAlert } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center">
        <div className="flex justify-center mb-4 text-red-500">
          <OctagonAlert size={80} strokeWidth={1.5} />
        </div>
        <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
        <p className="text-xl text-gray-600 mb-8">Oops...........</p>
        <Link
          to="/dashboard"
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
