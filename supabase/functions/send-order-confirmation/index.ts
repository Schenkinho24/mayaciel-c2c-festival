import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderData {
  name: string;
  email: string;
  street: string;
  zipcode: string;
  city: string;
  country: string;
  products: Record<string, number>;
}

const productPrices: Record<string, number> = {
  "Tequila Blanco": 34.9,
  "Tequila Rosa": 36.9,
  "Tequila Reposado": 39.9,
  "Paloma Package": 42.9,
};

function buildEmailHtml(order: OrderData): string {
  const selectedProducts = Object.entries(order.products || {})
    .filter(([_, qty]) => qty > 0)
    .map(([name, qty]) => ({
      name,
      quantity: qty,
      price: productPrices[name] || 0,
    }));

  const total = selectedProducts.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  const productRows = selectedProducts
    .map(
      (p) =>
        `<tr>
          <td style="padding:8px 0;border-bottom:1px solid #eee;color:#333;">${p.name}</td>
          <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:center;color:#333;">${p.quantity}</td>
          <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right;color:#333;">${(p.price * p.quantity).toFixed(2)} €</td>
        </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <div style="background:#1a1a2e;padding:24px;text-align:center;border-radius:8px 8px 0 0;">
      <h1 style="color:#d4af37;margin:0;font-size:22px;">MAYACIEL</h1>
      <p style="color:#ffffff;margin:8px 0 0;font-size:14px;">Bestellbestätigung</p>
    </div>
    
    <div style="background:#ffffff;padding:24px;border:1px solid #eee;border-top:none;">
      <p style="color:#333;font-size:16px;">Hallo ${order.name},</p>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Vielen Dank für Deine Bestellung bei MAYACIEL. Der Tequila geht direkt am Montag in den Versand.
        Wir wünschen ganz viel Spaß auf dem C2C-Festival!
      </p>
      
      <h2 style="color:#1a1a2e;font-size:16px;margin-top:24px;border-bottom:2px solid #d4af37;padding-bottom:8px;">Produktauswahl</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <thead>
          <tr>
            <th style="text-align:left;padding:8px 0;border-bottom:2px solid #ddd;color:#333;">Produkt</th>
            <th style="text-align:center;padding:8px 0;border-bottom:2px solid #ddd;color:#333;">Menge</th>
            <th style="text-align:right;padding:8px 0;border-bottom:2px solid #ddd;color:#333;">Preis</th>
          </tr>
        </thead>
        <tbody>
          ${productRows}
          <tr>
            <td colspan="2" style="padding:12px 0;font-weight:bold;color:#1a1a2e;">Gesamtsumme</td>
            <td style="padding:12px 0;text-align:right;font-weight:bold;color:#1a1a2e;">${total.toFixed(2)} €</td>
          </tr>
        </tbody>
      </table>
      
      <h2 style="color:#1a1a2e;font-size:16px;margin-top:24px;border-bottom:2px solid #d4af37;padding-bottom:8px;">Lieferadresse</h2>
      <p style="color:#555;font-size:14px;line-height:1.8;margin:8px 0;">
        ${order.name}<br>
        ${order.street}<br>
        ${order.zipcode} ${order.city}<br>
        ${order.country}
      </p>
    </div>
    
    <div style="background:#1a1a2e;padding:16px;text-align:center;border-radius:0 0 8px 8px;">
      <p style="color:#999;font-size:12px;margin:0;">Mayaciel Spirits GmbH. Alle Rechte vorbehalten.</p>
      <p style="color:#777;font-size:11px;margin:4px 0 0;">Verantwortungsvoller Genuss. Nicht für Personen unter 18 Jahren.</p>
    </div>
  </div>
</body>
</html>`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const order: OrderData = await req.json();

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "MAYACIEL <info@mayaciel-c2c-2026.de>",
        to: [order.email],
        subject: "Deine MAYACIEL Bestellbestätigung",
        html: buildEmailHtml(order),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(`Resend API error [${res.status}]: ${JSON.stringify(data)}`);
    }

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error sending confirmation email:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
