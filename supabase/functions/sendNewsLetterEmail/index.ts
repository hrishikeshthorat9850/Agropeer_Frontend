import { serve } from "https://deno.land/std@0.203.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Send email via Resend API
async function sendWelcomeEmail(to: string) {
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  const from = "AgroPeer Newsletter <newsletter@resend.dev>"; // You can replace with your domain sender

  const body = {
    from,
    to,
    subject: "🎉 Welcome to AgroPeer Newsletter!",
    html: `
      <h2>Hey there! 👋</h2>
      <p>Thanks for subscribing to our AgroPeer newsletter.</p>
      <p>You’ll now receive updates on farming, dairy tech, and more!</p>
      <br />
      <p>— Team AgroPeer 🌱</p>
    `,
  };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to send email");
  return data;
}

// Supabase client with Service Role Key
const supabase = createClient(
  Deno.env.get("MY_SUPABASE_URL")!,
  Deno.env.get("MY_SERVICE_ROLE_KEY")!
);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
      },
    });
  }

  try {
    const { email } = await req.json();
    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    }

    console.log("Adding subscriber:", email);

    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert([{ email }]);

    if (error) throw error;

    // Send real welcome email
    await sendWelcomeEmail(email);

    return new Response(JSON.stringify({ message: "Subscribed successfully" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    console.error("Error:", err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
});
