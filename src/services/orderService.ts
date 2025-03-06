
import { supabase } from "@/integrations/supabase/client";
import { FormData } from "@/components/wizard/types";

export async function submitOrder(formData: FormData) {
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
    throw new Error('Failed to submit order');
  }
  
  return orderData;
}
