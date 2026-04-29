import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | Maru AI Academy',
  description: 'Terms and conditions for using Maru AI Academy',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: December 2024</p>

          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Agreement to Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing or using Maru AI Academy, you agree to be bound by these Terms of Service and all applicable laws
              and regulations. If you do not agree with any of these terms, you are prohibited from using this platform.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Use License</h2>
            <p className="text-gray-700 mb-4">
              Subject to these Terms, we grant you a limited, non-exclusive, non-transferable license to access and use
              the platform for your personal or internal business purposes.
            </p>
            <p className="text-gray-700 mb-4">
              This license does not include any right to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose outside your organization</li>
              <li>Attempt to reverse engineer any software contained on the platform</li>
              <li>Remove any copyright or proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">User Accounts</h2>
            <p className="text-gray-700 mb-4">
              When you create an account with us, you must provide accurate, complete, and current information. You are
              responsible for:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Maintaining the confidentiality of your account and password</li>
              <li>Restricting access to your computer and account</li>
              <li>All activities that occur under your account</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Subscriptions and Payments</h2>
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Billing</h3>
            <p className="text-gray-700 mb-4">
              Paid subscriptions are billed in advance on a recurring basis (monthly or annually). You will be charged
              automatically on your billing date.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Cancellation</h3>
            <p className="text-gray-700 mb-4">
              You may cancel your subscription at any time from your account settings. Cancellations take effect at the
              end of your current billing period. No refunds are provided for partial subscription periods.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Changes to Fees</h3>
            <p className="text-gray-700 mb-4">
              We reserve the right to modify subscription fees. We will provide you with reasonable notice of any fee
              changes before they take effect.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Content Ownership</h2>
            <p className="text-gray-700 mb-4">
              All content provided on this platform, including but not limited to text, graphics, images, video, and software,
              is the property of Maru Online or its content suppliers and is protected by copyright and intellectual property laws.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">User Conduct</h2>
            <p className="text-gray-700 mb-4">
              You agree not to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Use the platform for any illegal purpose</li>
              <li>Harass, abuse, or harm another person</li>
              <li>Share your account credentials with others</li>
              <li>Distribute content without authorization</li>
              <li>Interfere with or disrupt the platform or servers</li>
              <li>Attempt to gain unauthorized access to any portion of the platform</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Termination</h2>
            <p className="text-gray-700 mb-4">
              We may terminate or suspend your account and access to the platform immediately, without prior notice or liability,
              for any reason, including if you breach these Terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              To the maximum extent permitted by law, Maru Online shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages resulting from your use or inability to use the platform.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Disclaimer</h2>
            <p className="text-gray-700 mb-4">
              The materials on this platform are provided on an 'as is' basis. Maru Online makes no warranties, expressed
              or implied, and hereby disclaims all other warranties including, without limitation, implied warranties of
              merchantability, fitness for a particular purpose, or non-infringement.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Governing Law</h2>
            <p className="text-gray-700 mb-4">
              These Terms shall be governed by and construed in accordance with the laws of South Africa, without regard
              to its conflict of law provisions.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to modify these Terms at any time. We will notify users of any material changes.
              Your continued use of the platform after such modifications constitutes acceptance of the updated Terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Information</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <ul className="list-none text-gray-700 mb-4 space-y-2">
              <li>Email: <a href="mailto:support@maruonline.com" className="text-primary-600 hover:text-primary-700">support@maruonline.com</a></li>
              <li>Website: <Link href="/contact" className="text-primary-600 hover:text-primary-700">Contact Form</Link></li>
            </ul>
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
