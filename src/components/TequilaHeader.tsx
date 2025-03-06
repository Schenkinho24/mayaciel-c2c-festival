
import React from 'react';

const TequilaHeader = () => {
  return (
    <header className="w-full py-8 bg-tequila-brown text-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
            Premium Tequila Auswahl
          </h1>
          <p className="text-xl md:text-2xl text-tequila-amber font-medium">
            Entdecken Sie unsere exklusive Kollektion
          </p>
          <p className="max-w-[600px] text-gray-200">
            Handgefertigter Tequila aus 100% reiner blauer Agave, traditionell hergestellt für einen unvergleichlichen Geschmack.
          </p>
        </div>
      </div>
    </header>
  );
};

export default TequilaHeader;
