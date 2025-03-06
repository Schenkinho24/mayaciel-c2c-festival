
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Edit, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { FormData } from '@/components/wizard/types';

// Product prices mapping
const productPrices: { [key: string]: number } = {
  "Tequila Blanco": 34.90,
  "Tequila Rosa": 36.90,
  "Tequila Reposado": 39.90,
  "Paloma Package": 42.90,
};

const ThankYouPage: React.FC = () => {
  const location = useLocation();
  const formData = location.state?.formData as FormData | undefined;

  // If no form data is provided, redirect to home
  if (!formData) {
    return <Navigate to="/" replace />;
  }

  // Get selected products with quantities
  const selectedProducts = formData.quantities ? 
    Object.entries(formData.quantities)
      .filter(([_, quantity]) => quantity > 0)
      .map(([productName, quantity]) => ({ 
        name: productName, 
        quantity,
        price: productPrices[productName] || 0
      })) 
    : [];
    
  // Calculate total sum
  const totalSum = selectedProducts.reduce((sum, product) => {
    return sum + (product.price * product.quantity);
  }, 0);

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4 md:px-6 animate-fade-in">
      <div className="bg-tequila-neutral rounded-lg p-6 mb-6">
        <div className="text-center mb-8">
          <h1 className="text-xl md:text-2xl font-bold text-tequila-dark mb-4">Bestellung bestätigt!</h1>
          <p className="text-sm md:text-base text-tequila-dark/80 break-words">
            Yeehaw! Vielen Dank für Deine Bestellung bei MAYACIEL. Der Tequila geht direkt am Montag in den Versand.
            <br /><br />
            Wir wünschen ganz viel Spaß auf dem C2C-Festival!
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg p-4 md:p-5 shadow-sm">
            <div className="mb-2">
              <h3 className="font-medium text-base md:text-lg text-tequila-dark">Produktauswahl</h3>
            </div>
            <Separator className="my-2 bg-tequila-secondary" />
            {selectedProducts.length > 0 ? (
              <div className="space-y-3">
                {selectedProducts.map(({ name, quantity, price }) => (
                  <div key={name} className="flex justify-between items-center">
                    <div className="text-tequila-dark/70 text-xs md:text-sm truncate pr-2">{name}: {quantity}</div>
                    <div className="text-tequila-dark font-medium text-xs md:text-sm whitespace-nowrap">{(price * quantity).toFixed(2)} €</div>
                  </div>
                ))}
                
                <Separator className="my-3 bg-tequila-secondary" />
                
                <div className="flex justify-between items-center">
                  <span className="text-tequila-dark font-medium text-sm md:text-base">Gesamtsumme:</span>
                  <div className="flex items-center text-tequila-primary font-bold text-base md:text-lg">
                    {totalSum.toFixed(2)} €
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-tequila-dark/70 text-xs md:text-sm">Keine Produkte ausgewählt</p>
            )}
          </div>

          <div className="bg-white rounded-lg p-4 md:p-5 shadow-sm">
            <div className="mb-2">
              <h3 className="font-medium text-base md:text-lg text-tequila-dark">Persönliche Daten</h3>
            </div>
            <Separator className="my-2 bg-tequila-secondary" />
            <div className="grid grid-cols-2 gap-y-2">
              <span className="text-tequila-dark/70 text-xs md:text-sm">Name:</span>
              <span className="text-tequila-dark text-xs md:text-sm break-words">{formData.name}</span>
              <span className="text-tequila-dark/70 text-xs md:text-sm">E-Mail:</span>
              <span className="text-tequila-dark text-xs md:text-sm overflow-wrap-anywhere hyphens-auto" style={{ wordBreak: 'break-word' }}>{formData.email}</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 md:p-5 shadow-sm">
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
            <Button 
              variant="outline"
              className="border-tequila-dark text-tequila-dark hover:bg-tequila-dark/10 text-xs md:text-sm"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Zurück zur Startseite
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
