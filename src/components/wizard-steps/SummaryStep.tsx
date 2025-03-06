
import React from 'react';
import { FormData } from '../TequilaWizard';
import { Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface SummaryStepProps {
  formData: FormData;
  onEdit: (step: number) => void;
}

const SummaryStep: React.FC<SummaryStepProps> = ({ formData, onEdit }) => {
  // Get selected products with quantities
  const selectedProducts = formData.quantities ? 
    Object.entries(formData.quantities)
      .filter(([_, quantity]) => quantity > 0)
      .map(([productName, quantity]) => ({ name: productName, quantity })) 
    : [];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-gray-600">Bitte überprüfen Sie Ihre Angaben vor dem Absenden.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-tequila-neutral rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-lg">Persönliche Daten</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onEdit(1)}
              className="text-tequila-brown hover:text-tequila-brown/90 hover:bg-tequila-brown/10"
            >
              <Edit className="h-4 w-4 mr-1" />
              Bearbeiten
            </Button>
          </div>
          <Separator className="my-2" />
          <div className="grid grid-cols-2 gap-y-2">
            <span className="text-gray-600">Name:</span>
            <span>{formData.name}</span>
            <span className="text-gray-600">E-Mail:</span>
            <span>{formData.email}</span>
          </div>
        </div>

        <div className="bg-tequila-neutral rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-lg">Adresse</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onEdit(2)}
              className="text-tequila-brown hover:text-tequila-brown/90 hover:bg-tequila-brown/10"
            >
              <Edit className="h-4 w-4 mr-1" />
              Bearbeiten
            </Button>
          </div>
          <Separator className="my-2" />
          <div className="grid grid-cols-2 gap-y-2">
            <span className="text-gray-600">Straße:</span>
            <span>{formData.street}</span>
            <span className="text-gray-600">PLZ:</span>
            <span>{formData.zipCode}</span>
            <span className="text-gray-600">Stadt:</span>
            <span>{formData.city}</span>
            <span className="text-gray-600">Land:</span>
            <span>{formData.country}</span>
          </div>
        </div>

        <div className="bg-tequila-neutral rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-lg">Produktauswahl</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onEdit(3)}
              className="text-tequila-brown hover:text-tequila-brown/90 hover:bg-tequila-brown/10"
            >
              <Edit className="h-4 w-4 mr-1" />
              Bearbeiten
            </Button>
          </div>
          <Separator className="my-2" />
          {selectedProducts.length > 0 ? (
            <div className="space-y-2">
              {selectedProducts.map(({ name, quantity }) => (
                <div key={name} className="grid grid-cols-2 gap-y-1">
                  <span className="text-gray-600">{name}:</span>
                  <span>{quantity} Flaschen</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Keine Produkte ausgewählt</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SummaryStep;
