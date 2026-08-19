import { Metadata } from 'next'
import Link from 'next/link'
import { Badge, Button, Card } from '@/components/ui'
import Image from 'next/image'
import { ShieldCheck, Sprout, Wrench } from 'lucide-react'

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
      <section className="relative overflow-hidden bg-maru-cloud py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Badge variant="blue" className="mb-6">Our Mission</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-maru-navy mb-6">
            Democratizing AI for everyone
          </h1>
          <p className="text-xl text-maru-grey max-w-3xl mx-auto mb-10">
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
            <h2 className="text-3xl font-heading font-bold text-maru-navy mb-4">Our core values</h2>
            <p className="text-maru-grey max-w-2xl mx-auto">
              Principles that guide how we teach, build, and support our community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8" hover>
              <div className="w-16 h-16 bg-maru-blue-100 rounded-full flex items-center justify-center mx-auto mb-6"><Wrench className="h-8 w-8 text-maru-teal" aria-hidden="true" /></div>
              <h3 className="text-xl font-bold text-maru-navy mb-3">Practicality first</h3>
              <p className="text-maru-grey">
                We skip the hype and focus on real-world applications. If it doesn't save you time or money, we don't teach it.
              </p>
            </Card>
            
            <Card className="text-center p-8" hover>
              <div className="w-16 h-16 bg-maru-blue-100 rounded-full flex items-center justify-center mx-auto mb-6"><ShieldCheck className="h-8 w-8 text-maru-teal" aria-hidden="true" /></div>
              <h3 className="text-xl font-bold text-maru-navy mb-3">Responsible AI</h3>
              <p className="text-maru-grey">
                Safety, ethics, and data privacy are foundational. We teach you how to use AI securely and responsibly.
              </p>
            </Card>
            
            <Card className="text-center p-8" hover>
              <div className="w-16 h-16 bg-verified-bg rounded-full flex items-center justify-center mx-auto mb-6"><Sprout className="h-8 w-8 text-maru-teal" aria-hidden="true" /></div>
              <h3 className="text-xl font-bold text-maru-navy mb-3">Continuous growth</h3>
              <p className="text-maru-grey">
                AI moves fast. Our curriculum evolves constantly to keep you ahead of the curve with the latest tools.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Team/Story Section */}
      <section className="py-20 bg-maru-cloud">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="neutral" className="mb-4">Our Story</Badge>
              <h2 className="text-3xl font-heading font-bold text-maru-navy mb-6">
                From experiment to Academy
              </h2>
              <div className="space-y-4 text-maru-grey text-lg">
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
            
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/team-training.png"
                alt="Diverse team of professionals in a training session"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-maru-navy text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2 font-mono tracking-mono">50k+</div>
              <div className="text-maru-grey-on-dark">Students Taught</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2 font-mono tracking-mono">100+</div>
              <div className="text-maru-grey-on-dark">Enterprise Partners</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2 font-mono tracking-mono">500+</div>
              <div className="text-maru-grey-on-dark">Workflows Built</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2 font-mono tracking-mono">4.9/5</div>
              <div className="text-maru-grey-on-dark">Student Rating</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
