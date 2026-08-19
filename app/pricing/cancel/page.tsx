import { Button, Card } from '@/components/ui';
import Link from 'next/link';

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-maru-cloud py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full space-y-8 p-10 text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-overdue-bg mb-6">
          <svg className="h-10 w-10 text-overdue-fg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        
        <h2 className="text-3xl font-extrabold text-maru-navy">Payment cancelled</h2>
        
        <p className="text-maru-grey">
           You have cancelled the payment process. No charges were made.
        </p>

        <div className="pt-6">
          <Link href="/pricing">
            <Button variant="secondary" fullWidth>Return to Pricing</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
