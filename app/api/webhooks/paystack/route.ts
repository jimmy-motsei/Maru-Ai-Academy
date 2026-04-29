import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { Plan } from '@prisma/client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const hash = crypto
      .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY || '')
      .update(body)
      .digest('hex');

    if (hash !== req.headers.get('x-paystack-signature')) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(body);

    // Handle different event types
    if (event.event === 'charge.success') {
      const { metadata, customer, amount, currency } = event.data;
      const plan = metadata?.custom_fields?.find((f: any) => f.variable_name === 'plan')?.value;
      const userId = metadata?.custom_fields?.find((f: any) => f.variable_name === 'user_id')?.value;
      const metaCurrency = metadata?.custom_fields?.find((f: any) => f.variable_name === 'currency')?.value;

      console.log(`Payment success: ${amount/100} ${currency} (Meta: ${metaCurrency}) for plan ${plan}`);

      if (userId && plan) {
        await (prisma as any).user.update({
          where: { id: userId },
          data: {
            plan: plan as Plan,
            subscriptionStatus: 'active',
            paystackCustomerId: customer.customer_code,
          },
        });
        console.log(`User ${userId} upgraded to ${plan}`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Paystack webhook error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
