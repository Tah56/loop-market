import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { stripe } from "@/lib/stripe";
import CopyButton from "@/component/CopyBtn";
import { buyerInfo, getUsers, paymentInfo } from "@/lib/core/session,";



export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  
  


  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  
  
  if (session.status === "open") {
    
    
  
    redirect("/");
    
  }
    
    const customerEmail = session.customer_details?.email;
    const orderId = session.metadata?.orderId || `LM-${session.id.slice(-8).toUpperCase()}`;
    const shortTransactionId = `${session.id.slice(0, 10)}...${session.id.slice(-6)}`;
    const product =  session?.metadata;
    const products = {
      ...product,
     
    }
    console.log(products);
    
    
  if (session.status === "complete") {
    const payments = {
      orderId:products.orderId,
      transactionId:session.id,
      buyerEmail:products.email,
      amount:(session.amount_total / 100).toFixed(2),
      paymentStatus: "Paid"
      
    }
    const data =await paymentInfo(payments)
console.log(payments);

  

  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-10">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-green-500/20 p-5 rounded-full">
              <CheckCircle size={70} className="text-green-400" />
            </div>
          </div>

          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white">Order Confirmed</h1>

            <p className="text-zinc-400 mt-3">
              Your payment has been processed successfully.
            </p>

            <p className="text-zinc-500 mt-2">Confirmation sent to</p>

            <p className="text-white font-medium">{customerEmail}</p>
          </div>

          {/* Order Details */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-zinc-800/50 rounded-2xl p-5">
              <p className="text-zinc-400 text-sm">Order ID</p>

              <p className="text-white mt-2 font-semibold">{orderId}</p>
            </div>

            <div className="bg-zinc-800/50 rounded-2xl p-5">
              <p className="text-zinc-400 text-sm">Payment Status</p>

              <p className="text-green-400 mt-2 font-semibold">Paid</p>
            </div>

            <div className="bg-zinc-800/50 rounded-2xl p-5">
              <p className="text-zinc-400 text-sm">Amount Paid</p>

              <p className="text-white mt-2 font-semibold">
                ${(session.amount_total / 100).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Success Message */}
          <div className="mt-8 bg-green-500/10 border border-green-500/20 rounded-2xl p-5">
            <div className="flex gap-3">
              <Package className="text-green-400 shrink-0 mt-1" />

              <div>
                <h3 className="text-white font-medium">
                  Order Successfully Placed
                </h3>

                <p className="text-zinc-400 mt-1">
                  Your order is now awaiting seller confirmation. You'll receive
                  updates as the order progresses.
                </p>
              </div>
            </div>
          </div>

          {/* Receipt Section */}
          <div className="mt-6 bg-zinc-800/30 rounded-2xl p-5 border border-zinc-800">
            <h3 className="text-white font-medium mb-3">Transaction Details</h3>

            <div className="flex items-center justify-between gap-3">
              <p className="text-zinc-400 text-sm">{shortTransactionId}</p>

              <CopyButton text={session.id} />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <Link
              href="/dashboard/buyer/orders"
              className="flex-1 bg-white text-black font-semibold py-3 rounded-xl text-center hover:opacity-90 transition"
            >
              View My Orders
            </Link>

            <Link
              href="/"
              className="flex-1 border border-zinc-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-800 transition"
            >
              Continue Shopping
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
