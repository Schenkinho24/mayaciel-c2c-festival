
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import PersonalInfoStep from './wizard-steps/PersonalInfoStep';
import AddressStep from './wizard-steps/AddressStep';
import ProductStep from './wizard-steps/ProductStep';
import SummaryStep from './wizard-steps/SummaryStep';
import WizardHeader from './wizard/WizardHeader';
import WizardNavigation from './wizard/WizardNavigation';
import { FormData, initialFormData } from './wizard/types';
import { useWizardValidation } from './wizard/useWizardValidation';
import { submitOrder } from '@/services/orderService';

interface TequilaWizardProps {
  onComplete?: () => void;
}

const TequilaWizard: React.FC<TequilaWizardProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { validateStep } = useWizardValidation();
  const navigate = useNavigate();

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (validateStep(step, formData)) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const jumpToStep = (targetStep: number) => {
    setStep(targetStep);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      await submitOrder(formData);
      
      toast({
        title: "Vielen Dank!",
        description: "Ihre Auswahl wurde erfolgreich übermittelt.",
      });
      console.log("Form submitted to database:", formData);
      
      // Navigate to thank-you page with form data
      navigate('/thank-you', { state: { formData } });
      
      setFormData(initialFormData);
      setStep(1);
      
      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error('Error in submit handler:', error);
      toast({
        title: "Fehler",
        description: "Es gab ein Problem bei der Übermittlung. Bitte versuchen Sie es später erneut.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <ProductStep formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <PersonalInfoStep formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <AddressStep formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <SummaryStep formData={formData} onEdit={jumpToStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <WizardHeader step={step} />
      
      <div className="p-6 bg-white animate-fade-in">
        {renderStep()}
        
        <WizardNavigation 
          step={step}
          isSubmitting={isSubmitting}
          onPrevStep={prevStep}
          onNextStep={nextStep}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default TequilaWizard;

export type { FormData } from './wizard/types';
