'use client'

import { useState } from 'react'
import { Badge, Button, Input, Textarea } from '@/components/ui'
import { Mail, MessageSquare, Send } from 'lucide-react'

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
    <div className="bg-maru-cloud min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <Badge variant="blue" className="mb-6">Get in Touch</Badge>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-maru-navy mb-6">
              Let's start a conversation
            </h1>
            <p className="text-xl text-maru-grey mb-10">
              Have questions about our courses? Want to discuss custom training for your team? We'd love to hear from you.
            </p>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-maru-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-6">
                  <Mail className="h-6 w-6 text-maru-teal" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-maru-navy mb-1">Email us</h3>
                  <p className="text-maru-grey mb-1">General Inquiries</p>
                  <a href="mailto:support@maruonline.com" className="text-maru-blue-700 font-semibold hover:text-maru-blue-700">
                    support@maruonline.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-maru-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-6">
                  <MessageSquare className="h-6 w-6 text-maru-teal" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-maru-navy mb-1">Live chat</h3>
                  <p className="text-maru-grey mb-1">Available 24/7</p>
                  <p className="text-maru-grey text-sm">
                    Click the chat icon in the bottom right corner
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-maru-navy mb-6">Send us a message</h2>
            
            {success && (
              <div className="mb-6 p-4 bg-verified-bg border border-verified-bg rounded-lg">
                <p className="text-verified-fg font-semibold">Message sent successfully!</p>
                <p className="text-verified-fg text-sm mt-1">We'll get back to you within 24 hours.</p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-overdue-bg border border-overdue-bg rounded-lg">
                <p className="text-overdue-fg font-semibold">{error}</p>
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
                <label className="block text-sm font-semibold text-maru-grey mb-2">
                  Topic
                </label>
                <select 
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-maru-line focus:border-maru-blue focus:ring-2 focus:ring-maru-blue-100 transition-colors bg-white"
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
