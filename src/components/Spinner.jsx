// components/Spinner.jsx
import React from 'react';

const Spinner = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="border-t-transparent border-solid animate-spin border-green-900 border-8 rounded-full h-12 w-12"></div>
    </div>
  );
};

export default Spinner;
