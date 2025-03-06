
import React, { useState } from 'react';
import TequilaHeader from '@/components/TequilaHeader';
import TequilaWizard from '@/components/TequilaWizard';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
const Index = () => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const openWizard = () => setIsWizardOpen(true);
  const closeWizard = () => setIsWizardOpen(false);
  return <div className="min-h-screen bg-gradient-to-b from-white to-tequila-neutral flex flex-col">
      <TequilaHeader />
      
      <main className="flex-1 container px-4 py-8 md:py-12 mx-auto">
        <div className="max-w-4xl mx-auto mb-8 md:mb-12 text-center">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-tequila-primary mb-3 md:mb-4">
            Welcome to the <span className="md:hidden"><br /></span>
            Country to Country Festival!
          </h2>
          <p className="text-sm md:text-base text-tequila-dark max-w-2xl mx-auto mb-6 md:mb-8">MAYACIEL Tequila und Country Music passen perfekt zusammen. Mit MAYACIEL holst Du Dir das C2C-Feeling nach Hause!</p>
          
          <Button onClick={openWizard} className="bg-[#411701] hover:bg-[#411701]/90 text-white px-4 md:px-6 rounded-md mb-6 md:mb-8 font-medium py-0 text-sm md:text-base">Deine Tequila Bestellung</Button>
          
          <div className="w-full max-w-3xl mx-auto mt-4 rounded-lg overflow-hidden shadow-md">
            <img src="/image_page.jpeg" alt="Premium Tequila" className="w-full h-auto object-cover aspect-video" />
          </div>
        </div>
        
        <Modal isOpen={isWizardOpen} onClose={closeWizard} title="Tequila Auswahl" className="bg-transparent w-full max-w-[95%] sm:max-w-4xl mx-auto">
          <TequilaWizard onComplete={closeWizard} />
        </Modal>
      </main>
      
      <footer className="bg-tequila-primary text-white py-4 md:py-6">
        <div className="container px-4 mx-auto text-center">
          <p className="text-xs md:text-sm">
            Mayaciel Spirits GmbH. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs mt-2 text-tequila-light">
            Verantwortungsvoller Genuss. Nicht für Personen unter 18 Jahren.
          </p>
        </div>
      </footer>
    </div>;
};
export default Index;
