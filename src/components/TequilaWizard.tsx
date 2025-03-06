
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import PersonalInfoStep from './wizard-steps/PersonalInfoStep';
import AddressStep from './wizard-steps/AddressStep';
import ProductStep from './wizard-steps/ProductStep';
import SummaryStep from './wizard-steps/SummaryStep';
import { supabase } from "@/integrations/supabase/client";

export type FormData = {
  name: string;
  email: string;
  street: string;
  zipCode: string;
  city: string;
  country: string;
  product: string;
  quantities?: {
    [productName: string]: number;
  };
};

const initialFormData: FormData = {
  name: '',
  email: '',
  street: '',
  zipCode: '',
  city: '',
  country: 'Deutschland',
  product: '',
  quantities: {},
};

interface TequilaWizardProps {
  onComplete?: () => void;
}

const TequilaWizard: React.FC<TequilaWizardProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (step === 1) {
      const hasSelectedProducts = formData.quantities && 
        Object.values(formData.quantities).some(quantity => quantity > 0);
      
      if (!hasSelectedProducts) {
        toast({
          title: "Keine Auswahl",
          description: "Bitte wählen Sie mindestens ein Produkt aus.",
          variant: "destructive",
        });
        return;
      }
    } else if (step === 2) {
      if (!formData.name || !formData.email) {
        toast({
          title: "Fehlende Angaben",
          description: "Bitte füllen Sie alle Pflichtfelder aus.",
          variant: "destructive",
        });
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast({
          title: "Ungültige E-Mail",
          description: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
          variant: "destructive",
        });
        return;
      }
    } else if (step === 3) {
      if (!formData.street || !formData.zipCode || !formData.city) {
        toast({
          title: "Fehlende Angaben",
          description: "Bitte füllen Sie alle Pflichtfelder aus.",
          variant: "destructive",
        });
        return;
      }
    }

    setStep(prev => prev + 1);
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
      
      const orderData = {
        name: formData.name,
        email: formData.email,
        street: formData.street,
        zipcode: formData.zipCode,
        city: formData.city,
        country: formData.country,
        products: formData.quantities
      };
      
      const { error } = await supabase
        .from('tequila_orders')
        .insert([orderData]);
      
      if (error) {
        console.error('Error saving order:', error);
        toast({
          title: "Fehler",
          description: "Es gab ein Problem bei der Übermittlung. Bitte versuchen Sie es später erneut.",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Vielen Dank!",
        description: "Ihre Auswahl wurde erfolgreich übermittelt.",
      });
      console.log("Form submitted to database:", orderData);
      
      setFormData(initialFormData);
      setStep(1);
      
      if (onComplete) {
        setTimeout(() => {
          onComplete();
        }, 1500); // Give time for the user to see the success message
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
      <div className="bg-tequila-dark text-white px-6 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {step === 1 && "Produkt Auswahl"}
            {step === 2 && "Persönliche Daten"}
            {step === 3 && "Adresse"}
            {step === 4 && "Zusammenfassung"}
          </h2>
          <div className="text-sm">
            <span className="block sm:inline">Schritt</span>{' '}
            <span className="block sm:inline">{step} von 4</span>
          </div>
        </div>
        <div className="w-full bg-tequila-secondary/30 h-1 mt-4 rounded-full overflow-hidden">
          <div 
            className="bg-tequila-primary h-full transition-all duration-300 ease-in-out"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="p-6 bg-white animate-fade-in">
        {renderStep()}
        
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <Button 
              onClick={prevStep}
              variant="outline"
              className="border-tequila-dark text-tequila-dark hover:bg-tequila-dark/10"
              disabled={isSubmitting}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zurück
            </Button>
          )}
          {step < 4 ? (
            <Button 
              onClick={nextStep}
              className="ml-auto bg-tequila-dark hover:bg-tequila-dark/90 text-white"
            >
              Weiter
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              className="ml-auto bg-tequila-dark hover:bg-tequila-dark/90 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Wird übermittelt..." : "Bestätigen"}
              <Check className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TequilaWizard;
