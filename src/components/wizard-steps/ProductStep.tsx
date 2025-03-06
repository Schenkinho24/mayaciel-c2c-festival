
import React from 'react';
import { FormData } from '../wizard/types';
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const products = [{
  id: "tequila-blanco",
  name: "Tequila Blanco",
  description: "Aus 100% Agave hergestellt.\nBlumig. Fruchtig. Zitrusnoten.",
  price: "34,90 €"
}, {
  id: "tequila-rosa",
  name: "Tequila Rosa",
  description: "Im Rotweinfass veredelt.\nBeerig. Fruchtig. Trocken.",
  price: "36,90 €"
}, {
  id: "tequila-reposado",
  name: "Tequila Reposado",
  description: "Im Rumfass ausgereift.\nAgave. Schokolade. Karamell.",
  price: "39,90 €"
}, {
  id: "paloma-package",
  name: "Paloma Package",
  description: "Vollmundig und komplex mit Karamell- und Gewürznoten.",
  price: "42,90 €"
}];

const ProductStep: React.FC<ProductStepProps> = ({
  formData,
  updateFormData
}) => {
  const handleQuantityChange = (productName: string, change: number) => {
    const quantities = formData.quantities || {};
    const currentQuantity = quantities[productName] || 0;
    const newQuantity = Math.max(0, currentQuantity + change);
    const updatedQuantities = {
      ...quantities,
      [productName]: newQuantity
    };
    updateFormData({
      quantities: updatedQuantities
    });
    const selectedProducts = Object.entries(updatedQuantities).filter(([_, qty]) => qty > 0).map(([name, _]) => name);
    updateFormData({
      product: selectedProducts.join(", ")
    });
  };
  return <div className="space-y-4">
      <div className="text-center mb-6">
        
      </div>

      <div className="space-y-4 pb-4">
        {products.map(product => {
        const quantity = formData.quantities && formData.quantities[product.name] || 0;
        const isSelected = quantity > 0;
        return <div key={product.id} className={`border rounded-lg p-3 sm:p-4 transition-all ${isSelected ? 'border-2 border-tequila-dark bg-tequila-neutral' : 'border-tequila-secondary'}`}>
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
                <span className="font-bold text-tequila-primary">
                  {product.name}
                </span>
                <span className="ml-auto font-semibold text-tequila-primary">{product.price}</span>
              </div>
              <p className="text-tequila-dark/80 mt-2 whitespace-pre-line text-sm sm:text-base">{product.description}</p>
              
              <div className="flex items-center justify-start mt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon" 
                  className="h-9 w-9 sm:h-8 sm:w-8 rounded-full border-tequila-dark text-tequila-dark touch-manipulation" 
                  onClick={() => handleQuantityChange(product.name, -1)} 
                  disabled={quantity === 0}
                  aria-label="Reduzieren"
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Reduzieren</span>
                </Button>
                
                <span className="mx-3 sm:mx-4 font-medium w-8 text-center flex items-center justify-center">{quantity}</span>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon" 
                  className="h-9 w-9 sm:h-8 sm:w-8 rounded-full border-tequila-dark text-tequila-dark touch-manipulation" 
                  onClick={() => handleQuantityChange(product.name, 1)}
                  aria-label="Erhöhen"
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Erhöhen</span>
                </Button>
              </div>
            </div>;
      })}
      </div>
    </div>;
};
export default ProductStep;
