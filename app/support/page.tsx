'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Card, Input, Textarea, Button } from '@/components/ui'
import { MessageCircle, Mail, Book, HelpCircle, Send } from 'lucide-react'

export default function SupportPage() {
  const { data: session } = useSession()
  
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    topic: 'Technical Support',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit ticket')
      }

      setSuccess(true)
      // Clear form
      setFormData({
        name: session?.user?.name || '',
        email: session?.user?.email || '',
        topic: 'Technical Support',
        subject: '',
        message: '',
      })
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How can we help you?</h1>
          <p className="text-xl text-gray-600">Find answers, get support, and learn how to make the most of Maru AI Academy</p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <Book className="w-12 h-12 text-primary-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Documentation</h3>
            <Link href="/docs" className="text-sm text-primary-600 hover:text-primary-700">
              View Docs →
            </Link>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <HelpCircle className="w-12 h-12 text-primary-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">FAQs</h3>
            <p className="text-sm text-gray-600">Common questions</p>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <MessageCircle className="w-12 h-12 text-primary-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
            <p className="text-sm text-gray-600">Chat with us now</p>
          </Card>
          
          <Link href="/contact">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer h-full">
              <Mail className="w-12 h-12 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Contact Us</h3>
              <p className="text-sm text-gray-600">Send us a message</p>
            </Card>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a message</h2>
              <p className="text-gray-600 mb-6">Our support team typically responds within 24 hours</p>
              
              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-semibold">✅ Support ticket submitted successfully!</p>
                  <p className="text-green-600 text-sm mt-1">We'll email you a confirmation and respond within 24 hours.</p>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 font-semibold">❌ {error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Your Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    fullWidth
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    fullWidth
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Topic
                  </label>
                  <select 
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors bg-white"
                  >
                    <option>Technical Support</option>
                    <option>Billing Question</option>
                    <option>Course Content</option>
                    <option>Account Issue</option>
                    <option>Other</option>
                  </select>
                </div>

                <Input
                  label="Subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Brief description of your issue"
                  required
                  fullWidth
                />

                <Textarea
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Please provide as much detail as possible..."
                  required
                  fullWidth
                />

                <Button variant="primary" size="lg" fullWidth type="submit" disabled={loading} className="flex items-center justify-center gap-2">
                  {loading ? 'Sending...' : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>

          {/* FAQ Sidebar */}
          <div>
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">How do I access my courses?</h4>
                  <p className="text-sm text-gray-600">
                    Sign in and visit your dashboard to see all available modules and your progress.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Can I upgrade my plan?</h4>
                  <p className="text-sm text-gray-600">
                    Yes! Visit the pricing page or your account settings to upgrade to Pro.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Do I get a certificate?</h4>
                  <p className="text-sm text-gray-600">
                    Yes, you receive a certificate upon completing each module.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">What payment methods do you accept?</h4>
                  <p className="text-sm text-gray-600">
                    We accept all major credit cards and digital payments.
                  </p>
                </div>
              </div>
              
              <Link href="/contact" className="block mt-6">
                <Button variant="outline" size="sm" fullWidth>
                  View All FAQs
                </Button>
              </Link>
            </Card>

            <Card className="p-6 mt-6 bg-primary-50 border-primary-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Need immediate help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Our chatbot is available 24/7 to answer common questions.
              </p>
              <p className="text-sm text-gray-600">
                Look for the chat icon in the bottom-right corner! 💬
              </p>
            </Card>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            You can also reach us at{' '}
            <a href="mailto:hello@maruonline.com" className="text-primary-600 hover:text-primary-700 font-semibold">
              hello@maruonline.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
