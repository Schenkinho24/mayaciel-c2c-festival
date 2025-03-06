
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormData } from '../TequilaWizard';

interface PersonalInfoStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <p className="text-gray-600">Bitte geben Sie Ihre persönlichen Daten ein.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
          <Input
            id="name"
            placeholder="Vor- und Nachname"
            value={formData.name}
            onChange={(e) => updateFormData({ name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-Mail Adresse <span className="text-red-500">*</span></Label>
          <Input
            id="email"
            type="email"
            placeholder="beispiel@email.de"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
