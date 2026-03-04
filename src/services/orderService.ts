
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

  // Send confirmation email (non-blocking)
  try {
    const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
    await fetch(
      `https://${projectId}.supabase.co/functions/v1/send-order-confirmation`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      }
    );
  } catch (emailError) {
    console.error('Error sending confirmation email:', emailError);
    // Don't throw — order was saved successfully
  }
  
  return orderData;
}
