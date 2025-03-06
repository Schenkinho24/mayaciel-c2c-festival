
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormData } from '../TequilaWizard';

interface AddressStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const countries = [
  "Deutschland",
  "Österreich",
  "Schweiz",
];

const AddressStep: React.FC<AddressStepProps> = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <p className="text-gray-600">Bitte geben Sie Ihre Adresse ein.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="street">Straße und Hausnummer <span className="text-red-500">*</span></Label>
          <Input
            id="street"
            placeholder="Musterstraße 123"
            value={formData.street}
            onChange={(e) => updateFormData({ street: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="zipCode">Postleitzahl <span className="text-red-500">*</span></Label>
            <Input
              id="zipCode"
              placeholder="12345"
              value={formData.zipCode}
              onChange={(e) => updateFormData({ zipCode: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">Stadt <span className="text-red-500">*</span></Label>
            <Input
              id="city"
              placeholder="Berlin"
              value={formData.city}
              onChange={(e) => updateFormData({ city: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Land</Label>
          <Select 
            value={formData.country} 
            onValueChange={(value) => updateFormData({ country: value })}
          >
            <SelectTrigger id="country">
              <SelectValue placeholder="Land auswählen" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default AddressStep;
