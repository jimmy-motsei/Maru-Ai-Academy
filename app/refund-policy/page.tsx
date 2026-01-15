import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Refund Policy | Maru AI Academy',
  description: 'Refund policy for Maru AI Academy subscriptions',
}

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Refund Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: January 2026</p>

          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">General Policy</h2>
            <p className="text-gray-700 mb-4">
              At Maru AI Academy, we strive to provide a high-quality learning experience. However, due to the digital nature of our content, our refund policy is governed by the following terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Subscription Refunds</h2>
            <p className="text-gray-700 mb-4">
              Subscriptions to Maru AI Academy are generally non-refundable. Because our service provides instant access to digital content, we do not offer refunds for:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Partial subscription periods.</li>
              <li>Accidental purchases where the service has been accessed.</li>
              <li>Change of mind after content has been consumed.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Exceptions</h2>
            <p className="text-gray-700 mb-4">
              We may consider refund requests in the following exceptional circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>
                <strong>Technical Issues:</strong> If you are unable to access the course material due to a technical error on our end that we cannot resolve within a reasonable timeframe.
              </li>
              <li>
                <strong>Billing Errors:</strong> If you were charged incorrectly or multiple times for the same billing period.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How to Request a Refund</h2>
            <p className="text-gray-700 mb-4">
              If you believe you are entitled to a refund based on the exceptions above, please contact our support team within 7 days of the billing date.
            </p>
            <ul className="list-none text-gray-700 mb-4 space-y-2">
              <li>Email: <a href="mailto:support@maruonline.com" className="text-primary-600 hover:text-primary-700">support@maruonline.com</a></li>
              <li>Subject Line: Refund Request - [Your Account Email]</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Please include specific details about why you are requesting a refund so we can assist you efficiently.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Cooling-off Period (South Africa)</h2>
            <p className="text-gray-700 mb-4">
              In accordance with the Electronic Communications and Transactions Act (ECTA), consumers may have a 7-day cooling-off period for certain transactions. However, this cooling-off period does not apply to digital goods (such as our online courses) once the digital content has been accessed or downloaded.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have questions about this policy, please contact us at <a href="mailto:hello@maruonline.com" className="text-primary-600 hover:text-primary-700">hello@maruonline.com</a>.
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
