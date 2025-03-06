
import React from 'react';

interface WizardHeaderProps {
  step: number;
}

const WizardHeader: React.FC<WizardHeaderProps> = ({ step }) => {
  return (
    <div className="bg-tequila-dark text-white px-6 py-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg md:text-xl font-semibold">
          {step === 1 && "Produkt Auswahl"}
          {step === 2 && "Persönliche Daten"}
          {step === 3 && "Adresse"}
          {step === 4 && "Zusammenfassung"}
        </h2>
        <div className="text-xs md:text-sm">
          <span className="block sm:inline">Schritt</span>{' '}
          <span className="block sm:inline">{step} von 4</span>
        </div>
      </div>
      <div className="w-full bg-tequila-secondary/30 h-1 mt-4 rounded-full overflow-hidden">
        <div 
          className="bg-tequila-primary h-full transition-all duration-300 ease-in-out"
          style={{ width: `${(step / 4) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default WizardHeader;
