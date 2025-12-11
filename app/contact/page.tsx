import { Metadata } from 'next'
import { Badge, Button, Input, Textarea } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Maru AI Academy. Questions about courses? Want team training? We are here to help you on your AI learning journey.',
  openGraph: {
    title: 'Contact Maru AI Academy',
    description: 'Have questions? We would love to hear from you. Reach out about courses, team training, or partnerships.',
  },
}

export default function ContactPage() {
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
                  <a href="mailto:hello@maruacademy.com" className="text-primary-600 font-semibold hover:text-primary-700">
                    hello@maruacademy.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-6">
                  <span className="text-2xl">💬</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Live Chat</h3>
                  <p className="text-gray-600 mb-1">Available Mon-Fri, 9am-5pm EST</p>
                  <button className="text-primary-600 font-semibold hover:text-primary-700 text-left">
                    Start a chat
                  </button>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-6">
                  <span className="text-2xl">🏢</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Office</h3>
                  <p className="text-gray-600">
                    123 AI Boulevard, Suite 500<br />
                    San Francisco, CA 94105
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <Input label="First Name" placeholder="Jane" fullWidth />
                <Input label="Last Name" placeholder="Doe" fullWidth />
              </div>
              
              <Input label="Email Address" type="email" placeholder="jane@company.com" fullWidth />
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Topic
                </label>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors bg-white">
                  <option>General Inquiry</option>
                  <option>Course Support</option>
                  <option>Team Training</option>
                  <option>Partnership</option>
                </select>
              </div>

              <Textarea label="Message" rows={5} placeholder="How can we help you?" fullWidth />

              <Button variant="primary" fullWidth size="lg">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
