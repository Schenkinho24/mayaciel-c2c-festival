import React from 'react';
import { FormData } from '../TequilaWizard';
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
interface ProductStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}
const products = [{
  id: "tequila-blanco",
  name: "Tequila Blanco",
  description: "Blumig. Fruchtig. Zitrusnoten.",
  price: "34,90 €"
}, {
  id: "tequila-rosa",
  name: "Tequila Rosa",
  description: "Harmonisch mit fruchtigen Aromen und sanfter Süße.",
  price: "36,90 €"
}, {
  id: "tequila-reposado",
  name: "Tequila Reposado",
  description: "Ausgereift mit Vanille- und Eichennoten, samtig im Abgang.",
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
        return <div key={product.id} className={`border rounded-lg p-4 transition-all ${isSelected ? 'border-2 border-tequila-dark bg-tequila-neutral' : 'border-tequila-secondary'}`}>
              <div className="flex items-center gap-2">
                <span className="font-bold text-tequila-primary">
                  {product.name}
                </span>
                <span className="ml-auto font-semibold text-tequila-primary">{product.price}</span>
              </div>
              <p className="text-tequila-dark/80 mt-2">{product.description}</p>
              
              <div className="flex items-center mt-4">
                <Button type="button" variant="outline" size="icon" className="h-8 w-8 rounded-full border-tequila-dark text-tequila-dark" onClick={() => handleQuantityChange(product.name, -1)} disabled={quantity === 0}>
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Reduzieren</span>
                </Button>
                
                <span className="mx-4 font-medium w-8 text-center">{quantity}</span>
                
                <Button type="button" variant="outline" size="icon" className="h-8 w-8 rounded-full border-tequila-dark text-tequila-dark" onClick={() => handleQuantityChange(product.name, 1)}>
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