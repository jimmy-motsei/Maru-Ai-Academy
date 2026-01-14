'use client'

import { useState } from 'react'
import { Badge, Button, Input, Textarea } from '@/components/ui'
import { Send } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    topic: 'General Inquiry',
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          message: `Topic: ${formData.topic}\n\n${formData.message}`,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setSuccess(true)
      // Clear form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        topic: 'General Inquiry',
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
    <div className="bg-gray-50 min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <Badge variant="primary" className="mb-6">Get in Touch</Badge>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gray-900 mb-6">
              Let's Start a Conversation
            </h1>
            <p className="text-xl text-gray-600 mb-10">
              Have questions about our courses? Want to discuss custom training for your team? We'd love to hear from you.
            </p>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-6">
                  <span className="text-2xl">📧</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Email Us</h3>
                  <p className="text-gray-600 mb-1">General Inquiries</p>
                  <a href="mailto:hello@maruonline.com" className="text-primary-600 font-semibold hover:text-primary-700">
                    hello@maruonline.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-6">
                  <span className="text-2xl">💬</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Live Chat</h3>
                  <p className="text-gray-600 mb-1">Available 24/7</p>
                  <p className="text-gray-500 text-sm">
                    Click the chat icon in the bottom right corner
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
            
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-semibold">✅ Message sent successfully!</p>
                <p className="text-green-600 text-sm mt-1">We'll get back to you within 24 hours.</p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-semibold">❌ {error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <Input 
                  label="First Name" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Jane" 
                  required
                  fullWidth 
                />
                <Input 
                  label="Last Name" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe" 
                  required
                  fullWidth 
                />
              </div>
              
              <Input 
                label="Email Address" 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jane@company.com" 
                required
                fullWidth 
              />
              
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
                  <option>General Inquiry</option>
                  <option>Course Support</option>
                  <option>Team Training</option>
                  <option>Partnership</option>
                </select>
              </div>

              <Textarea 
                label="Message" 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5} 
                placeholder="How can we help you?" 
                required
                fullWidth 
              />

              <Button 
                type="submit"
                variant="primary" 
                fullWidth 
                size="lg"
                disabled={loading}
                className="flex items-center justify-center gap-2"
              >
                {loading ? 'Sending...' : (
                  <>
                    Send Message
                    <Send size={18} />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
