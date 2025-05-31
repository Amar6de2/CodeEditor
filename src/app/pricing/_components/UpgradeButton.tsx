"use client";

import { Zap } from "lucide-react";
import Script from "next/script";
import { useRouter } from "next/navigation";

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export default function UpgradeButton() {
  const router = useRouter();
  const amount = 5000; // ₹50.00 in paise

  const createOrder = async () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded");
      return;
    }

    const res = await fetch("/api/createOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }), // amount in paise
    });

    const data = await res.json();

    const paymentData = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEYID!,
      amount: amount * 100,
      currency: "INR",
      name: "CodeCraft",
      description: "Upgrade to Pro",
      order_id: data.id,
      handler: async (response: RazorpayResponse) => {
        const verifyRes = await fetch("/api/verifyOrder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          }),
        });

        const verifyData = await verifyRes.json();

        if (verifyData.isOk) {
          alert("✅ Payment Successful");
          router.push("/pricing");
        } else {
          alert("❌ Payment Verification Failed");
        }
      },
      theme: {
        color: "#6366f1",
      },
    };

    const rzp = new window.Razorpay(paymentData);
    rzp.open();
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
      <button
        onClick={createOrder}
        className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white 
        bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg 
        hover:from-blue-600 hover:to-blue-700 transition-all"
      >
        <Zap className="w-5 h-5" />
        Upgrade to Pro
      </button>
    </>
  );
}
