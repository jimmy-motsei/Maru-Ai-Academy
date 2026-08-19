'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Loader2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setEmail('');
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-maru-cloud px-4">
      <div className="max-w-md w-full">
        {/* Back to Sign In */}
        <Link
          href="/auth/signin"
          className="inline-flex items-center text-sm text-maru-grey hover:text-maru-blue-700 mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Sign In
        </Link>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-maru-blue-100 rounded-full mb-4">
              <Mail className="h-8 w-8 text-maru-blue-700" />
            </div>
            <h1 className="text-2xl font-bold text-maru-navy">Forgot password?</h1>
            <p className="text-maru-grey mt-2">
              No worries! Enter your email and we'll send you a reset link.
            </p>
          </div>

          {/* Success Message */}
          {message && (
            <div className="mb-6 p-4 bg-verified-bg border border-verified-bg rounded-lg">
              <p className="text-sm text-verified-fg">{message}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-overdue-bg border border-overdue-bg rounded-lg">
              <p className="text-sm text-overdue-fg">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-maru-grey mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-maru-line rounded-lg focus:ring-2 focus:ring-maru-blue focus:border-transparent transition"
                placeholder="you@example.com"
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-maru-blue text-white py-3 px-4 rounded-lg font-medium hover:bg-maru-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-maru-blue disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Sending...
                </>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          {/* Help Text */}
          <p className="mt-6 text-center text-sm text-maru-grey">
            Remember your password?{' '}
            <Link href="/auth/signin" className="text-maru-blue-700 hover:text-maru-blue-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
