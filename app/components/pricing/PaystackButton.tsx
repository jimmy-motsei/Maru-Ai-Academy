'use client';

import { usePaystackPayment } from 'react-paystack';
import { Button } from '@/components/ui';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PaystackButtonProps {
  email: string;
  amount: number; // in Rands (e.g., 199 for R199, 399 for R399)
  plan: 'LEARNER' | 'PRO' | 'TEAM';
  userId: string;
  onSuccess?: (reference: any) => void;
  onClose?: () => void;
  label?: string;
}

export default function PaystackButton({
  email,
  amount,
  plan,
  userId,
  onSuccess,
  onClose,
  label
}: PaystackButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Default labels based on plan
  const defaultLabel = label || `Subscribe - R${amount}/mo`;

  const config = {
    reference: (new Date()).getTime().toString(),
    email: email,
    amount: amount * 100, // Paystack expects amount in kobo (cents)
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
    metadata: {
      custom_fields: [
        {
          display_name: "Plan",
          variable_name: "plan",
          value: plan
        },
        {
          display_name: "User ID",
          variable_name: "user_id",
          value: userId
        }
      ]
    }
  };

  const initializePayment = usePaystackPayment(config);

  const handlePayment = () => {
    setLoading(true);
    initializePayment({
      onSuccess: (reference) => {
        setLoading(false);
        console.log('Paystack payment successful:', reference);
        if (onSuccess) onSuccess(reference);
        router.push('/pricing/success');
        router.refresh();
      },
      onClose: () => {
        setLoading(false);
        if (onClose) onClose();
      }
    });
  };

  return (
    <Button 
      variant="primary" 
      fullWidth 
      onClick={handlePayment} 
      disabled={loading || !config.publicKey}
      className="bg-[#00C3F7] hover:bg-[#00B0E8] border-none text-white"
    >
      {loading ? 'Processing...' : defaultLabel}
    </Button>
  );
}
