
import React from 'react';

const TequilaHeader = () => {
  return (
    <header className="w-full py-4 bg-tequila-primary">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex justify-center items-center">
          <div className="w-full max-w-2xl h-48 rounded-lg overflow-hidden bg-tequila-primary flex items-center justify-center">
            <img 
              src="/logo-subline_white.png" 
              alt="Mayaciel Premium Tequila" 
              className="max-w-full max-h-full object-contain p-2"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TequilaHeader;
