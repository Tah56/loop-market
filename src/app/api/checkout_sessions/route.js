import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";
import { product_data } from "@/lib/core/products";
import { randomUUID } from "crypto";
import { buyerInfo, getUsers } from "@/lib/core/session,";

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
    const { email } = await getUsers();
    const userId = await buyerInfo(email);
    const headersList = await headers();
    const origin = headersList.get("origin");

    console.log(res);
    const orders = {
      productId: data._id,
      image:data.mainImage,
      productName:data.title,
      sellerId: data.seller.id,
      sellerName: data.seller.name,
      sellerEmail: data.seller.email,
      paymentStatus: "Pending",
      orderStatus: "Pending",
      amount:data.price,
      orderId,
      buyerInfo: userId,
    };

    await fetch(`${process.env.NEXT_PUBLIC_API}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orders),
    });

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: "bdt",
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
