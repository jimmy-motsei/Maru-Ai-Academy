import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cancellation Policy | Maru AI Academy',
  description: 'Cancellation policy for Maru AI Academy subscriptions',
}

export default function CancellationPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cancellation Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: January 2026</p>

          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Subscription Cancellation</h2>
            <p className="text-gray-700 mb-4">
              You can cancel your Maru AI Academy subscription at any time. We believe in freedom of choice and do not lock you into long-term contracts unless you have explicitly chosen an annual plan.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How to Cancel</h2>
            <p className="text-gray-700 mb-4">
              To cancel your subscription, please follow these steps:
            </p>
            <ol className="list-decimal pl-6 text-gray-700 mb-4 space-y-2">
              <li>Log in to your Maru AI Academy account.</li>
              <li>Navigate to your <strong>Settings</strong> or <strong>Dashboard</strong>.</li>
              <li>Select the <strong>Billing</strong> tab.</li>
              <li>Click on <strong>Cancel Subscription</strong>.</li>
            </ol>
            <p className="text-gray-700 mb-4">
              If you have trouble finding the cancellation option, you can email us at <a href="mailto:hello@maruonline.com" className="text-primary-600 hover:text-primary-700">hello@maruonline.com</a> for assistance.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Effect of Cancellation</h2>
            <p className="text-gray-700 mb-4">
              When you cancel your subscription:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>
                <strong>Access Continues:</strong> You will retain access to your premium features and course content until the end of your current billing cycle.
              </li>
              <li>
                <strong>No Further Charges:</strong> You will not be charged again for the subsequent billing cycle.
              </li>
              <li>
                <strong>Data Retention:</strong> Your learning progress and account history will be saved should you decide to resubscribe in the future.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Annual Subscriptions</h2>
            <p className="text-gray-700 mb-4">
              If you are on an annual plan and cancel mid-year, your access will continue until the end of the 12-month period you paid for. We do not provide prorated refunds for the remaining months of an annual term.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions regarding your subscription or cancellation, please reach out to us at <a href="mailto:hello@maruonline.com" className="text-primary-600 hover:text-primary-700">hello@maruonline.com</a>.
            </p>
          </div>

          <div className="mt-12 pt-6 border-t border-gray-200">
            <Link href="/" className="text-primary-600 hover:text-primary-700 font-semibold">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
