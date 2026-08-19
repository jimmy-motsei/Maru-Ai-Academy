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
    <div className="min-h-screen bg-maru-cloud py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-maru-navy mb-4">How can we help you?</h1>
          <p className="text-xl text-maru-grey">Find answers, get support, and learn how to make the most of Maru AI Academy</p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <Book className="w-12 h-12 text-maru-blue-700 mx-auto mb-3" />
            <h3 className="font-semibold text-maru-navy mb-2">Documentation</h3>
            <Link href="/docs" className="text-sm text-maru-blue-700 hover:text-maru-blue-700">
              View Docs →
            </Link>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <HelpCircle className="w-12 h-12 text-maru-blue-700 mx-auto mb-3" />
            <h3 className="font-semibold text-maru-navy mb-2">FAQs</h3>
            <p className="text-sm text-maru-grey">Common questions</p>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <MessageCircle className="w-12 h-12 text-maru-blue-700 mx-auto mb-3" />
            <h3 className="font-semibold text-maru-navy mb-2">Live chat</h3>
            <p className="text-sm text-maru-grey">Chat with us now</p>
          </Card>
          
          <Link href="/contact">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer h-full">
              <Mail className="w-12 h-12 text-maru-blue-700 mx-auto mb-3" />
              <h3 className="font-semibold text-maru-navy mb-2">Contact us</h3>
              <p className="text-sm text-maru-grey">Send us a message</p>
            </Card>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-maru-navy mb-2">Send us a message</h2>
              <p className="text-maru-grey mb-6">Our support team typically responds within 24 hours</p>
              
              {success && (
                <div className="mb-6 p-4 bg-verified-bg border border-verified-bg rounded-lg">
                  <p className="text-verified-fg font-semibold">Support ticket submitted successfully!</p>
                  <p className="text-verified-fg text-sm mt-1">We'll email you a confirmation and respond within 24 hours.</p>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-overdue-bg border border-overdue-bg rounded-lg">
                  <p className="text-overdue-fg font-semibold">{error}</p>
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
                  <label className="block text-sm font-semibold text-maru-grey mb-2">
                    Topic
                  </label>
                  <select 
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-maru-line focus:border-maru-blue focus:ring-2 focus:ring-maru-blue-100 transition-colors bg-white"
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
              <h3 className="text-lg font-bold text-maru-navy mb-4">Frequently asked questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-maru-navy mb-1">How do I access my courses?</h4>
                  <p className="text-sm text-maru-grey">
                    Sign in and visit your dashboard to see all available modules and your progress.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-maru-navy mb-1">Can I upgrade my plan?</h4>
                  <p className="text-sm text-maru-grey">
                    Yes! Visit the pricing page or your account settings to upgrade to Pro.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-maru-navy mb-1">Do I get a certificate?</h4>
                  <p className="text-sm text-maru-grey">
                    Yes, you receive a certificate upon completing each module.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-maru-navy mb-1">What payment methods do you accept?</h4>
                  <p className="text-sm text-maru-grey">
                    We accept all major credit cards and digital payments.
                  </p>
                </div>
              </div>
              
              <Link href="/contact" className="block mt-6">
                <Button variant="secondary" size="sm" fullWidth>
                  View All FAQs
                </Button>
              </Link>
            </Card>

            <Card className="p-6 mt-6 bg-maru-blue-100 border-maru-blue-100">
              <h3 className="text-lg font-bold text-maru-navy mb-2">Need immediate help?</h3>
              <p className="text-sm text-maru-grey mb-4">
                Our chatbot is available 24/7 to answer common questions.
              </p>
              <p className="text-sm text-maru-grey">
                Look for the chat icon in the bottom-right corner!</p>
            </Card>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 text-center">
          <p className="text-maru-grey">
            You can also reach us at{' '}
            <a href="mailto:support@maruonline.com" className="text-maru-blue-700 hover:text-maru-blue-700 font-semibold">
              support@maruonline.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
