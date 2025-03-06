
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

interface WizardNavigationProps {
  step: number;
  isSubmitting: boolean;
  onPrevStep: () => void;
  onNextStep: () => void;
  onSubmit: () => void;
}

const WizardNavigation: React.FC<WizardNavigationProps> = ({
  step,
  isSubmitting,
  onPrevStep,
  onNextStep,
  onSubmit
}) => {
  return (
    <div className="flex justify-between mt-8">
      {step > 1 && (
        <Button 
          onClick={onPrevStep}
          variant="outline"
          className="border-tequila-dark text-tequila-dark hover:bg-tequila-dark/10 text-xs md:text-sm"
          disabled={isSubmitting}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Zurück
        </Button>
      )}
      {step < 4 ? (
        <Button 
          onClick={onNextStep}
          className="ml-auto bg-tequila-dark hover:bg-tequila-dark/90 text-white text-xs md:text-sm"
        >
          Weiter
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      ) : (
        <Button 
          onClick={onSubmit}
          className="ml-auto bg-tequila-dark hover:bg-tequila-dark/90 text-white text-xs md:text-sm"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Wird übermittelt..." : "Bestätigen"}
          <Check className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default WizardNavigation;
