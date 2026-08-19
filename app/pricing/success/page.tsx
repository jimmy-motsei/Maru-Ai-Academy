import { Button, Card } from '@/components/ui';
import Link from 'next/link';

export default function PaymentSuccessPage({ searchParams }: { searchParams: { order_id?: string } }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-maru-cloud py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full space-y-8 p-10 text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-verified-bg mb-6">
          <svg className="h-10 w-10 text-verified-fg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h2 className="text-3xl font-extrabold text-maru-navy">Payment successful!</h2>
        
        <p className="text-maru-grey">
           Thank you for your subscription. Your account has been upgraded.
           {searchParams.order_id && <span className="block text-xs mt-2 text-maru-grey">Order ID: {searchParams.order_id}</span>}
        </p>

        <div className="pt-6">
          <Link href="/dashboard">
            <Button variant="primary" fullWidth>Go to Dashboard</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
