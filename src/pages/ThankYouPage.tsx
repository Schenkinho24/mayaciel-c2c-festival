import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { FormData } from '@/components/wizard/types';
import TequilaHeader from '@/components/TequilaHeader';

// Product prices mapping
const productPrices: {
  [key: string]: number;
} = {
  "Tequila Blanco": 34.90,
  "Tequila Rosa": 36.90,
  "Tequila Reposado": 39.90,
  "Paloma Package": 42.90
};
const ThankYouPage: React.FC = () => {
  const location = useLocation();
  const formData = location.state?.formData as FormData | undefined;

  // If no form data is provided, redirect to home
  if (!formData) {
    return <Navigate to="/" replace />;
  }

  // Get selected products with quantities
  const selectedProducts = formData.quantities ? Object.entries(formData.quantities).filter(([_, quantity]) => quantity > 0).map(([productName, quantity]) => ({
    name: productName,
    quantity,
    price: productPrices[productName] || 0
  })) : [];

  // Calculate total sum
  const totalSum = selectedProducts.reduce((sum, product) => {
    return sum + product.price * product.quantity;
  }, 0);
  return <div className="min-h-screen bg-gradient-to-b from-white to-tequila-neutral flex flex-col">
      <TequilaHeader />
      
      <main className="flex-1 container px-4 py-8 md:py-12 mx-auto">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8 animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-xl md:text-2xl font-bold mb-4 text-tequila-primary">Vielen Dank!</h1>
            <p className="text-sm md:text-base text-tequila-dark/80 break-words">
              Vielen Dank für Deine Bestellung bei MAYACIEL. Der Tequila geht direkt am Montag in den Versand.
              <br /><br />
              Wir wünschen ganz viel Spaß auf dem C2C-Festival!
            </p>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg p-4 md:p-5 bg-white">
              <div className="mb-2">
                <h3 className="font-medium text-base md:text-lg text-tequila-primary">Produktauswahl</h3>
              </div>
              <Separator className="my-2 bg-tequila-secondary" />
              {selectedProducts.length > 0 ? <div className="space-y-3">
                  {selectedProducts.map(({
                name,
                quantity,
                price
              }) => <div key={name} className="flex justify-between items-center">
                      <div className="text-tequila-dark/70 text-xs md:text-sm truncate pr-2">{name}: {quantity}</div>
                      <div className="text-tequila-dark font-medium text-xs md:text-sm whitespace-nowrap">{(price * quantity).toFixed(2)} €</div>
                    </div>)}
                  
                  <Separator className="my-3 bg-tequila-secondary" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-tequila-dark font-medium text-sm md:text-base">Gesamtsumme:</span>
                    <div className="flex items-center text-tequila-primary font-bold text-base md:text-lg">
                      {totalSum.toFixed(2)} €
                    </div>
                  </div>
                </div> : <p className="text-tequila-dark/70 text-xs md:text-sm">Keine Produkte ausgewählt</p>}
            </div>

            <div className="rounded-lg p-4 md:p-5 bg-white">
              <div className="mb-2">
                <h3 className="font-medium text-base md:text-lg text-tequila-dark">Persönliche Daten</h3>
              </div>
              <Separator className="my-2 bg-tequila-secondary" />
              <div className="grid grid-cols-2 gap-y-2">
                <span className="text-tequila-dark/70 text-xs md:text-sm">Name:</span>
                <span className="text-tequila-dark text-xs md:text-sm break-words">{formData.name}</span>
                <span className="text-tequila-dark/70 text-xs md:text-sm">E-Mail:</span>
                <span className="text-tequila-dark text-xs md:text-sm break-words" style={{
                wordBreak: 'break-all',
                overflowWrap: 'break-word',
                WebkitHyphens: 'auto',
                msHyphens: 'auto',
                hyphens: 'auto',
                maxWidth: '100%'
              }}>
                  {formData.email}
                </span>
              </div>
            </div>

            <div className="rounded-lg p-4 md:p-5 bg-white">
              <div className="mb-2">
                <h3 className="font-medium text-base md:text-lg text-tequila-dark">Adresse</h3>
              </div>
              <Separator className="my-2 bg-tequila-secondary" />
              <div className="grid grid-cols-2 gap-y-2">
                <span className="text-tequila-dark/70 text-xs md:text-sm">Straße:</span>
                <span className="text-tequila-dark text-xs md:text-sm break-words">{formData.street}</span>
                <span className="text-tequila-dark/70 text-xs md:text-sm">PLZ:</span>
                <span className="text-tequila-dark text-xs md:text-sm">{formData.zipCode}</span>
                <span className="text-tequila-dark/70 text-xs md:text-sm">Stadt:</span>
                <span className="text-tequila-dark text-xs md:text-sm break-words">{formData.city}</span>
                <span className="text-tequila-dark/70 text-xs md:text-sm">Land:</span>
                <span className="text-tequila-dark text-xs md:text-sm break-words">{formData.country}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link to="/">
              <Button variant="outline" className="border-tequila-dark text-xs md:text-sm bg-tequila-dark text-white">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Zurück zur Startseite
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <footer className="bg-tequila-primary text-white py-4 md:py-6">
        <div className="container px-4 mx-auto text-center">
          <p className="text-xs md:text-sm">
            Mayaciel Spirits GmbH. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs mt-2 text-tequila-light">
            Verantwortungsvoller Genuss.<span className="md:hidden"><br /></span> Nicht für Personen unter 18 Jahren.
          </p>
        </div>
      </footer>
    </div>;
};
export default ThankYouPage;