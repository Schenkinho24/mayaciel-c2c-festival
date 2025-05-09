import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormData } from '../wizard/types';
interface AddressStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}
const AddressStep: React.FC<AddressStepProps> = ({
  formData,
  updateFormData
}) => {
  // Set Deutschland as default country if not already set
  React.useEffect(() => {
    if (!formData.country) {
      updateFormData({
        country: "Deutschland"
      });
    }
  }, [formData.country, updateFormData]);
  return <div className="space-y-4">
      <div className="text-center mb-6">
        
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="street" className="text-sm md:text-base">Straße und Hausnummer <span className="text-red-500">*</span></Label>
          <Input id="street" placeholder="Musterstraße 123" value={formData.street} onChange={e => updateFormData({
          street: e.target.value
        })} required className="text-sm md:text-base" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="zipCode" className="text-sm md:text-base">Postleitzahl <span className="text-red-500">*</span></Label>
            <Input id="zipCode" placeholder="12345" value={formData.zipCode} onChange={e => updateFormData({
            zipCode: e.target.value
          })} required className="text-sm md:text-base" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city" className="text-sm md:text-base">Stadt <span className="text-red-500">*</span></Label>
            <Input id="city" placeholder="Berlin" value={formData.city} onChange={e => updateFormData({
            city: e.target.value
          })} required className="text-sm md:text-base" />
          </div>
        </div>
      </div>
    </div>;
};
export default AddressStep;