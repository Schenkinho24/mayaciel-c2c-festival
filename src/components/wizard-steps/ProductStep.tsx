
import React from 'react';
import { FormData } from '../TequilaWizard';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ProductStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const products = [
  {
    id: "tequila-blanco",
    name: "Tequila Blanco",
    description: "Frisch und intensiv mit Noten von Agave und Zitrus.",
    price: "39,99 €",
  },
  {
    id: "tequila-rosa",
    name: "Tequila Rosa",
    description: "Harmonisch mit fruchtigen Aromen und sanfter Süße.",
    price: "44,99 €",
  },
  {
    id: "tequila-reposado",
    name: "Tequila Reposado",
    description: "Ausgereift mit Vanille- und Eichennoten, samtig im Abgang.",
    price: "49,99 €",
  },
];

const ProductStep: React.FC<ProductStepProps> = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <p className="text-gray-600">Bitte wählen Sie Ihren bevorzugten Tequila.</p>
      </div>

      <RadioGroup 
        value={formData.product} 
        onValueChange={(value) => updateFormData({ product: value })}
        className="space-y-4"
      >
        {products.map((product) => (
          <div 
            key={product.id}
            className={`border rounded-lg p-4 transition-all hover:border-tequila-amber cursor-pointer ${
              formData.product === product.name ? 'border-2 border-tequila-amber bg-tequila-neutral' : 'border-gray-200'
            }`}
            onClick={() => updateFormData({ product: product.name })}
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value={product.name} id={product.id} />
              <Label htmlFor={product.id} className="font-medium cursor-pointer">{product.name}</Label>
              <span className="ml-auto font-semibold text-tequila-brown">{product.price}</span>
            </div>
            <p className="text-gray-600 mt-2 ml-6">{product.description}</p>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default ProductStep;
