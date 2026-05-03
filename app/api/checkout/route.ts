import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16" as any,
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { items, restaurantId, addressId, totalAmount } = body;

    // 1. Create Order in DB (PENDING)
    const order = await db.order.create({
      data: {
        orderNumber: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        userId: session.user.id,
        restaurantId,
        addressId,
        totalAmount,
        subtotal: totalAmount - 5, // mock calc
        deliveryFee: 5,
        tax: totalAmount * 0.1,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
    });

    // 2. Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // cents
      currency: "usd",
      metadata: {
        orderId: order.id,
        userId: session.user.id,
      },
    });

    // 3. Create Payment record
    await db.payment.create({
      data: {
        orderId: order.id,
        amount: totalAmount,
        status: "pending",
        method: "card",
        stripeId: paymentIntent.id,
      },
    });

    // 4. Update order with payment ID
    await db.order.update({
      where: { id: order.id },
      data: { paymentId: paymentIntent.id }, // using stripe ID as payment reference for simplicity
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId: order.id,
    });
  } catch (error: any) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
