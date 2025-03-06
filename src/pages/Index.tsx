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
      
      <main className="flex-1 container px-4 py-12 mx-auto">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-tequila-primary mb-4">Welcome to the Country to Country Festival!</h2>
          <p className="text-tequila-dark max-w-2xl mx-auto mb-8">
            Entdecken Sie unsere exklusive Kollektion von Premium Tequilas und beginnen Sie Ihren persönlichen Geschmacksweg.
          </p>
          
          <Button onClick={openWizard} className="bg-tequila-primary hover:bg-tequila-primary/90 text-white font-medium px-6 py-2 rounded-md mb-8">
            Infos eintragen
          </Button>
          
          {/* Image placeholder below the button */}
          <div className="w-full max-w-3xl mx-auto mt-4 rounded-lg overflow-hidden shadow-md">
            <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" alt="Premium Tequila" className="w-full h-auto object-cover aspect-video" />
            
          </div>
        </div>
        
        <Modal isOpen={isWizardOpen} onClose={closeWizard} title="Tequila Auswahl" className="bg-transparent">
          <TequilaWizard onComplete={closeWizard} />
        </Modal>
      </main>
      
      <footer className="bg-tequila-primary text-white py-6">
        <div className="container px-4 mx-auto text-center">
          <p className="text-sm">
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