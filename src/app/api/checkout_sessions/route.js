import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";
import { product_data } from "@/lib/core/products";
import { randomUUID } from "crypto";

export async function POST(request) {
  try {
    const orderId = `LM-${randomUUID().slice(0, 8).toUpperCase()}`;
    const user = await product_data();
    const formData = await request.formData();
    const product_datas = formData.get("product_id");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/products/${product_datas}`,
    );
    const data = await res.json();

    
    const headersList = await headers();
    const origin = headersList.get("origin");
    
    console.log(res);
   
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: data.title,
              description: data.description,
              images: [data.mainImage],
            },
            unit_amount: Number(data.price) * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        productId: data._id,
        orderId,
       
        
      },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
