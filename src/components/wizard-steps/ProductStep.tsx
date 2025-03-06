
import React from 'react';
import { FormData } from '../TequilaWizard';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const handleQuantityChange = (productName: string, change: number) => {
    // Get current quantities or initialize if not present
    const quantities = formData.quantities || {};
    
    // Calculate new quantity (minimum is 1)
    const currentQuantity = quantities[productName] || 0;
    const newQuantity = Math.max(0, currentQuantity + change);
    
    // Update quantities
    const updatedQuantities = {
      ...quantities,
      [productName]: newQuantity
    };
    
    // If quantity becomes 0, set product to empty if it was the selected one
    if (newQuantity === 0 && formData.product === productName) {
      updateFormData({ 
        quantities: updatedQuantities,
        product: ''
      });
    } else {
      // If increasing quantity from 0 to 1 and no product selected yet, select this one
      if (currentQuantity === 0 && newQuantity === 1 && !formData.product) {
        updateFormData({ 
          quantities: updatedQuantities,
          product: productName
        });
      } else {
        updateFormData({ quantities: updatedQuantities });
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <p className="text-gray-600">Bitte wählen Sie Ihren bevorzugten Tequila und die gewünschte Menge.</p>
      </div>

      <RadioGroup 
        value={formData.product} 
        onValueChange={(value) => updateFormData({ product: value })}
        className="space-y-4"
      >
        {products.map((product) => {
          const quantity = (formData.quantities && formData.quantities[product.name]) || 0;
          
          return (
            <div 
              key={product.id}
              className={`border rounded-lg p-4 transition-all hover:border-tequila-amber cursor-pointer ${
                formData.product === product.name ? 'border-2 border-tequila-amber bg-tequila-neutral' : 'border-gray-200'
              }`}
              onClick={() => {
                if (!formData.product || formData.product !== product.name) {
                  // If no quantity yet, set to 1
                  if (quantity === 0) {
                    handleQuantityChange(product.name, 1);
                  }
                  updateFormData({ product: product.name });
                }
              }}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value={product.name} id={product.id} />
                <Label htmlFor={product.id} className="font-medium cursor-pointer">{product.name}</Label>
                <span className="ml-auto font-semibold text-tequila-brown">{product.price}</span>
              </div>
              <p className="text-gray-600 mt-2 ml-6">{product.description}</p>
              
              <div className="flex items-center mt-4 ml-6">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuantityChange(product.name, -1);
                  }}
                  disabled={quantity === 0}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Reduzieren</span>
                </Button>
                
                <span className="mx-4 font-medium w-8 text-center">{quantity}</span>
                
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuantityChange(product.name, 1);
                  }}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Erhöhen</span>
                </Button>
              </div>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default ProductStep;
