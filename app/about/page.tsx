import { Metadata } from 'next'
import Link from 'next/link'
import { Badge, Button, Card } from '@/components/ui'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Maru AI Academy - our mission to democratize AI for African professionals. Discover our values, story, and the team behind the platform.',
  openGraph: {
    title: 'About Maru AI Academy',
    description: 'Our mission: Democratizing AI for Everyone. Learn about our values and the team behind the platform.',
  },
}

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Badge variant="primary" className="mb-6">Our Mission</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gray-900 mb-6">
            Democratizing AI for <span className="gradient-text">Everyone</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            We believe that Artificial Intelligence shouldn't be reserved for tech giants. 
            Our mission is to empower individuals and businesses with practical, 
            hands-on AI skills that transform the way they work.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Principles that guide how we teach, build, and support our community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8" hover>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                🛠️
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Practicality First</h3>
              <p className="text-gray-600">
                We skip the hype and focus on real-world applications. If it doesn't save you time or money, we don't teach it.
              </p>
            </Card>
            
            <Card className="text-center p-8" hover>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                🛡️
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Responsible AI</h3>
              <p className="text-gray-600">
                Safety, ethics, and data privacy are foundational. We teach you how to use AI securely and responsibly.
              </p>
            </Card>
            
            <Card className="text-center p-8" hover>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                🌱
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Continuous Growth</h3>
              <p className="text-gray-600">
                AI moves fast. Our curriculum evolves constantly to keep you ahead of the curve with the latest tools.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Team/Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">Our Story</Badge>
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
                From Experiment to Academy
              </h2>
              <div className="space-y-4 text-gray-600 text-lg">
                <p>
                  Maru AI Academy started as a simple internal workshop. We realized that while everyone was talking about ChatGPT, very few people knew how to actually integrate it into their daily workflows.
                </p>
                <p>
                  We spent months documenting every prompt, testing every tool, and measuring the real impact on productivity. The result was a comprehensive system that we realized needed to be shared with the world.
                </p>
                <p>
                  Today, we've helped thousands of professionals move from "playing with AI" to building reliable, enterprise-grade automated workflows.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/auth/signup">
                  <Button variant="primary" size="lg">Join Our Journey</Button>
                </Link>
              </div>
            </div>
            
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl bg-gray-200">
              {/* Placeholder for Team Image */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                 <span className="text-lg">Team Image Placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-400 mb-2">50k+</div>
              <div className="text-gray-400">Students Taught</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary-400 mb-2">100+</div>
              <div className="text-gray-400">Enterprise Partners</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">500+</div>
              <div className="text-gray-400">Workflows Built</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">4.9/5</div>
              <div className="text-gray-400">Student Rating</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
