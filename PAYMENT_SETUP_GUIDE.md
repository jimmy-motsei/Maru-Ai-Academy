# Payment Integration Guide - Paystack

## Overview
Maru AI Academy uses **Paystack** as the single payment gateway for all subscriptions and payments.

## Required Environment Variables

Add these to your `.env.local` file:

```bash
# Paystack Configuration
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxxxx  # Get from Paystack Dashboard
PAYSTACK_SECRET_KEY=sk_test_xxxxx              # Get from Paystack Dashboard
```

## Setup Instructions

### 1. Create Paystack Account
1. Go to [Paystack](https://paystack.com)
2. Sign up for an account
3. Verify your business details

### 2. Get API Keys
1. Log in to your Paystack Dashboard
2. Go to **Settings** → **API Keys & Webhooks**
3. Copy your **Public Key** (starts with `pk_test_` for test mode)
4. Copy your **Secret Key** (starts with `sk_test_` for test mode)
5. Add these to your `.env.local` file

### 3. Configure Webhook
1. In Paystack Dashboard, go to **Settings** → **API Keys & Webhooks  **
2. Add webhook URL: `https://your-domain.com/api/webhooks/paystack`
3. Select events to listen for:
   - `charge.success` (required)
4. Copy the webhook secret and add to `.env.local` (though we verify using secret key)

### 4. Test Payment Flow

**Test Cards (Paystack Sandbox):**
- **Success**: `4084084084084081` (CVV: 408, Expiry: any future date)
- **Insufficient Funds**: `5456788888888889`
- **Declined**: `5078585078585078`

**OTP for Test Transactions:** `123456`

### 5. Go Live

When ready for production:
1. Complete KYC in Paystack Dashboard
2. Switch to **Live Mode** in dashboard
3. Update environment variables with live keys:
   ```bash
   NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_xxxxx
   PAYSTACK_SECRET_KEY=sk_live_xxxxx
   ```

## Payment Flow

1. **User clicks Subscribe** on pricing page
2. **PaystackButton component** initializes payment popup
3. **User completes payment** in Paystack popup
4. **Payment success** → Paystack sends webhook to `/api/webhooks/paystack`
5. **Webhook updates database** → User plan upgraded
6. **User redirected** to success page

## Pricing Tiers

| Tier | Amount | Plan Code |
|------|--------|-----------|
| Free Explorer | R0 | FREE |
| AI Cadet | R199/mo | LEARNER |
| AI Captain | R399/mo | PRO |
| AI Crew | R299/user/mo | TEAM |

## File Structure

```
app/
├── components/
│   └── pricing/
│       └── PaystackButton.tsx          # Payment button component
├── api/
│   └── webhooks/
│       └── paystack/
│           └── route.ts                # Webhook handler
└── pricing/
    └── page.tsx                        # Pricing page using PaystackButton
```

## Security Notes

- ✅ All payments processed securely by Paystack
- ✅ Webhook signature verification implemented
- ✅ No card details stored on our servers
- ✅ PCI DSS compliant through Paystack
- ✅ Secret keys never exposed to client

## Troubleshooting

### Payment not updating user plan
1. Check webhook logs in Paystack Dashboard
2. Verify webhook URL is accessible
3. Check server logs for webhook errors
4. Ensure user ID is being passed correctly in metadata

### Test payments failing
1. Use exact test card numbers above
2. Use future expiry date (e.g., 12/25)
3. Use OTP: 123456
4. Check you're using test keys (pk_test_, sk_test_)

### Production payments not working
1. Verify you've switched to live keys
2. Check KYC is complete in dashboard
3. Verify webhook URL is HTTPS (required for live)
4. Check Paystack account is activated

## Support

- **Paystack Docs**: https://paystack.com/docs
- **Paystack Support**: support@paystack.com
- **Dashboard**: https://dashboard.paystack.com
