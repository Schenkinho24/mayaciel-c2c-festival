
import React from 'react';
import { FormData } from '../wizard/types';
import { Edit, EuroIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface SummaryStepProps {
  formData: FormData;
  onEdit: (step: number) => void;
}

// Product prices mapping
const productPrices: { [key: string]: number } = {
  "Tequila Blanco": 34.90,
  "Tequila Rosa": 36.90,
  "Tequila Reposado": 39.90,
  "Paloma Package": 42.90,
};

const SummaryStep: React.FC<SummaryStepProps> = ({ formData, onEdit }) => {
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
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-tequila-dark text-sm md:text-base">Bitte überprüfen Sie Ihre Angaben vor dem Absenden.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-tequila-neutral rounded-lg p-4 md:p-5">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-base md:text-lg text-tequila-dark">Produktauswahl</h3>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onEdit(1)}
              className="text-tequila-dark hover:text-tequila-dark/90 hover:bg-tequila-dark/10"
              aria-label="Bearbeiten"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
          <Separator className="my-2 bg-tequila-secondary" />
          {selectedProducts.length > 0 ? (
            <div className="space-y-3">
              {selectedProducts.map(({ name, quantity, price }) => (
                <div key={name} className="flex justify-between items-center">
                  <div className="text-tequila-dark/70 text-xs md:text-sm">{name}: {quantity}</div>
                  <div className="text-tequila-dark font-medium text-xs md:text-sm">{(price * quantity).toFixed(2)} €</div>
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

        <div className="bg-tequila-neutral rounded-lg p-4 md:p-5">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-base md:text-lg text-tequila-dark">Persönliche Daten</h3>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onEdit(2)}
              className="text-tequila-dark hover:text-tequila-dark/90 hover:bg-tequila-dark/10"
              aria-label="Bearbeiten"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
          <Separator className="my-2 bg-tequila-secondary" />
          <div className="grid grid-cols-2 gap-y-2">
            <span className="text-tequila-dark/70 text-xs md:text-sm">Name:</span>
            <span className="text-tequila-dark text-xs md:text-sm">{formData.name}</span>
            <span className="text-tequila-dark/70 text-xs md:text-sm">E-Mail:</span>
            <span className="text-tequila-dark text-xs md:text-sm">{formData.email}</span>
          </div>
        </div>

        <div className="bg-tequila-neutral rounded-lg p-4 md:p-5">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-base md:text-lg text-tequila-dark">Adresse</h3>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onEdit(3)}
              className="text-tequila-dark hover:text-tequila-dark/90 hover:bg-tequila-dark/10"
              aria-label="Bearbeiten"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
          <Separator className="my-2 bg-tequila-secondary" />
          <div className="grid grid-cols-2 gap-y-2">
            <span className="text-tequila-dark/70 text-xs md:text-sm">Straße:</span>
            <span className="text-tequila-dark text-xs md:text-sm">{formData.street}</span>
            <span className="text-tequila-dark/70 text-xs md:text-sm">PLZ:</span>
            <span className="text-tequila-dark text-xs md:text-sm">{formData.zipCode}</span>
            <span className="text-tequila-dark/70 text-xs md:text-sm">Stadt:</span>
            <span className="text-tequila-dark text-xs md:text-sm">{formData.city}</span>
            <span className="text-tequila-dark/70 text-xs md:text-sm">Land:</span>
            <span className="text-tequila-dark text-xs md:text-sm">{formData.country}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryStep;
