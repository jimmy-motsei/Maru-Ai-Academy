import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Maru AI Academy',
  description: 'Our commitment to protecting your privacy',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: December 2024</p>

          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Introduction</h2>
            <p className="text-gray-700 mb-4">
              At Maru AI Academy, we are committed to protecting your privacy. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you use our platform.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Information We Collect</h2>
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Personal Information</h3>
            <p className="text-gray-700 mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Name and email address (when you create an account)</li>
              <li>Profile information you choose to provide</li>
              <li>Payment information (processed securely by third-party payment processors)</li>
              <li>Communications you send to us</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Usage Information</h3>
            <p className="text-gray-700 mb-4">
              We automatically collect certain information when you use our platform:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Learning progress and module completion data</li>
              <li>Device and browser information</li>
              <li>IP address and location data</li>
              <li>Usage patterns and preferences</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process your transactions and manage your account</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Personalize your learning experience</li>
              <li>Monitor and analyze usage patterns</li>
              <li>Protect against fraud and unauthorized access</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Information Sharing</h2>
            <p className="text-gray-700 mb-4">
              We do not sell your personal information. We may share your information:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>With service providers who assist in our operations</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and prevent fraud</li>
              <li>With your consent or at your direction</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement appropriate technical and organizational measures to protect your personal information.
              However, no method of transmission over the Internet is 100% secure.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Your Rights</h2>
            <p className="text-gray-700 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Access and receive a copy of your personal data</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict certain processing</li>
              <li>Withdraw consent where processing is based on consent</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Cookies and Tracking</h2>
            <p className="text-gray-700 mb-4">
              We use cookies and similar tracking technologies to track activity on our platform and hold certain information.
              You can instruct your browser to refuse all cookies or indicate when a cookie is being sent.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Children's Privacy</h2>
            <p className="text-gray-700 mb-4">
              Our platform is not intended for children under 13. We do not knowingly collect personal information from
              children under 13.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Changes to This Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy, please contact us:
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
