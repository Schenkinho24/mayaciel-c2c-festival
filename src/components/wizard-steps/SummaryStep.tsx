
import React from 'react';
import { FormData } from '../TequilaWizard';
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
        <p className="text-tequila-dark">Bitte überprüfen Sie Ihre Angaben vor dem Absenden.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-tequila-neutral rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-lg text-tequila-dark">Persönliche Daten</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onEdit(1)}
              className="text-tequila-dark hover:text-tequila-dark/90 hover:bg-tequila-dark/10"
            >
              <Edit className="h-4 w-4 mr-1" />
              Bearbeiten
            </Button>
          </div>
          <Separator className="my-2 bg-tequila-secondary" />
          <div className="grid grid-cols-2 gap-y-2">
            <span className="text-tequila-dark/70">Name:</span>
            <span className="text-tequila-dark">{formData.name}</span>
            <span className="text-tequila-dark/70">E-Mail:</span>
            <span className="text-tequila-dark">{formData.email}</span>
          </div>
        </div>

        <div className="bg-tequila-neutral rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-lg text-tequila-dark">Adresse</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onEdit(2)}
              className="text-tequila-dark hover:text-tequila-dark/90 hover:bg-tequila-dark/10"
            >
              <Edit className="h-4 w-4 mr-1" />
              Bearbeiten
            </Button>
          </div>
          <Separator className="my-2 bg-tequila-secondary" />
          <div className="grid grid-cols-2 gap-y-2">
            <span className="text-tequila-dark/70">Straße:</span>
            <span className="text-tequila-dark">{formData.street}</span>
            <span className="text-tequila-dark/70">PLZ:</span>
            <span className="text-tequila-dark">{formData.zipCode}</span>
            <span className="text-tequila-dark/70">Stadt:</span>
            <span className="text-tequila-dark">{formData.city}</span>
            <span className="text-tequila-dark/70">Land:</span>
            <span className="text-tequila-dark">{formData.country}</span>
          </div>
        </div>

        <div className="bg-tequila-neutral rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-lg text-tequila-dark">Produktauswahl</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onEdit(3)}
              className="text-tequila-dark hover:text-tequila-dark/90 hover:bg-tequila-dark/10"
            >
              <Edit className="h-4 w-4 mr-1" />
              Bearbeiten
            </Button>
          </div>
          <Separator className="my-2 bg-tequila-secondary" />
          {selectedProducts.length > 0 ? (
            <div className="space-y-2">
              {selectedProducts.map(({ name, quantity, price }) => (
                <div key={name} className="grid grid-cols-2 gap-y-1">
                  <span className="text-tequila-dark/70">{name}:</span>
                  <div className="flex justify-between">
                    <span className="text-tequila-primary font-medium">{quantity} Flaschen</span>
                    <span className="text-tequila-dark">{(price * quantity).toFixed(2)} €</span>
                  </div>
                </div>
              ))}
              
              <Separator className="my-3 bg-tequila-secondary" />
              
              <div className="grid grid-cols-2 gap-y-1">
                <span className="text-tequila-dark font-medium">Gesamtsumme:</span>
                <div className="flex items-center justify-end">
                  <EuroIcon className="h-4 w-4 mr-1 text-tequila-primary" />
                  <span className="text-tequila-primary font-bold text-lg">{totalSum.toFixed(2)} €</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-tequila-dark/70">Keine Produkte ausgewählt</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SummaryStep;
