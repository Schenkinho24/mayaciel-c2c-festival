
import React from 'react';

const TequilaHeader = () => {
  return (
    <header className="w-full py-8 bg-tequila-primary">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex justify-center items-center">
          <div className="w-full max-w-2xl h-64 rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
              alt="Mayaciel Premium Tequila" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TequilaHeader;
