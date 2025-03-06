
import React from 'react';
import TequilaHeader from '@/components/TequilaHeader';
import TequilaWizard from '@/components/TequilaWizard';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-tequila-neutral flex flex-col">
      <TequilaHeader />
      
      <main className="flex-1 container px-4 py-12 mx-auto">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-tequila-brown mb-4">
            Wählen Sie Ihren Premium Tequila
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Füllen Sie das Formular aus, um Ihren persönlichen Tequila-Geschmacksweg zu beginnen. 
            In nur wenigen Schritten erhalten Sie Zugang zu unserer exklusiven Kollektion.
          </p>
        </div>
        
        <TequilaWizard />
      </main>
      
      <footer className="bg-tequila-brown text-white py-6">
        <div className="container px-4 mx-auto text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Premium Tequila GmbH. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs mt-2 text-gray-300">
            Verantwortungsvoller Genuss. Nicht für Personen unter 18 Jahren.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
