
import { FormData } from "./types";
import { useToast } from "@/hooks/use-toast";

export function useWizardValidation() {
  const { toast } = useToast();

  const validateStep = (step: number, formData: FormData): boolean => {
    if (step === 1) {
      const hasSelectedProducts = formData.quantities && 
        Object.values(formData.quantities).some(quantity => quantity > 0);
      
      if (!hasSelectedProducts) {
        toast({
          title: "Keine Auswahl",
          description: "Bitte wählen Sie mindestens ein Produkt aus.",
          variant: "destructive",
        });
        return false;
      }
    } else if (step === 2) {
      if (!formData.name || !formData.email) {
        toast({
          title: "Fehlende Angaben",
          description: "Bitte füllen Sie alle Pflichtfelder aus.",
          variant: "destructive",
        });
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast({
          title: "Ungültige E-Mail",
          description: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
          variant: "destructive",
        });
        return false;
      }
    } else if (step === 3) {
      if (!formData.street || !formData.zipCode || !formData.city) {
        toast({
          title: "Fehlende Angaben",
          description: "Bitte füllen Sie alle Pflichtfelder aus.",
          variant: "destructive",
        });
        return false;
      }
    }
    
    return true;
  };

  return { validateStep };
}
