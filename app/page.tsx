import Link from 'next/link'
import { Button, Card, Badge } from './components/ui'
import { BookOpen, GraduationCap, Lightbulb, Rocket, Target, TrendingUp, Users, Wrench } from 'lucide-react'

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-maru-cloud py-20 sm:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="blue" className="mb-6 animate-fade-in">
              Transform Your Business with AI
            </Badge>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold text-maru-navy mb-6 animate-slide-up">
              Master AI productivity for your business
            </h1>
            
            <p className="text-xl sm:text-2xl text-maru-grey mb-10 max-w-3xl mx-auto animate-slide-up animation-delay-200">
              Learn from basic AI concepts to advanced team automation. 
              Transform your workflows with practical, hands-on training.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-400">
              <Link href="/pricing">
                <Button variant="primary" size="lg">
                  Start Learning Free
                </Button>
              </Link>
              <Link href="/modules">
                <Button variant="secondary" size="lg">
                  View Curriculum
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-maru-blue-700 font-mono tracking-mono">8</div>
                <div className="text-sm text-maru-grey mt-1">Modules</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-maru-blue-700 font-mono tracking-mono">142</div>
                <div className="text-sm text-maru-grey mt-1">Resources</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-maru-blue-700 font-mono tracking-mono">24/7</div>
                <div className="text-sm text-maru-grey mt-1">Access</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Streams */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-maru-navy mb-4">
              Choose your learning path
            </h2>
            <p className="text-xl text-maru-grey max-w-2xl mx-auto">
              Whether you're just starting or ready to scale, we have the perfect curriculum for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Beginner Stream */}
            <Card className="group" hover>
              <div className="flex items-start justify-between mb-4">
                <Badge variant="verified" size="lg">Beginner</Badge>
                <BookOpen className="h-6 w-6 text-maru-teal" aria-hidden="true" />
              </div>
              
              <h3 className="text-2xl font-heading font-bold text-maru-navy mb-3 group-hover:text-maru-blue-700 transition-colors">
                Beginner Stream
              </h3>
              
              <p className="text-maru-grey mb-6">
                Perfect for getting started with AI. Learn the fundamentals of AI productivity, 
                safety, and basic automation.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-verified-fg mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-maru-grey">AI Made Simple (Foundations & Safety)</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-verified-fg mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-maru-grey">Prompts that work at work</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-verified-fg mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-maru-grey">Picking tools & no-code quick wins</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-verified-fg mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-maru-grey">Your first live workflow (Capstone)</span>
                </div>
              </div>
              
              <Link href="/modules">
                <Button variant="primary" fullWidth>
                  Start Beginner Path
                </Button>
              </Link>
            </Card>

            {/* Intermediate Stream */}
            <Card className="group border-2 border-maru-blue-100" hover>
              <div className="flex items-start justify-between mb-4">
                <Badge variant="blue" size="lg">Intermediate</Badge>
                <Rocket className="h-6 w-6 text-maru-teal" aria-hidden="true" />
              </div>
              
              <h3 className="text-2xl font-heading font-bold text-maru-navy mb-3 group-hover:text-maru-blue-700 transition-colors">
                Intermediate Stream
              </h3>
              
              <p className="text-maru-grey mb-6">
                For power users ready to scale AI across teams. Advanced workflows, 
                governance, and team automation.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-maru-blue-700 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-maru-grey">From ad-hoc prompts to repeatable workflows</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-maru-blue-700 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-maru-grey">Semantic search & private knowledge</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-maru-blue-700 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-maru-grey">No-code automations that stick</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-maru-blue-700 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-maru-grey">Measurement, governance & handover</span>
                </div>
              </div>
              
              <Link href="/modules">
                <Button variant="primary" fullWidth>
                  Start Intermediate Path
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-maru-cloud">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-maru-navy mb-4">
              Why Maru AI Academy?
            </h2>
            <p className="text-xl text-maru-grey max-w-2xl mx-auto">
              Comprehensive training designed for real business results
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <div className="w-12 h-12 bg-maru-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-maru-teal" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-maru-navy mb-2">Practical & hands-on</h3>
              <p className="text-maru-grey">
                Learn by doing with real-world exercises and projects you can apply immediately.
              </p>
            </Card>

            <Card>
              <div className="w-12 h-12 bg-maru-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-maru-teal" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-maru-navy mb-2">Business-focused</h3>
              <p className="text-maru-grey">
                Every lesson is designed to solve real business problems and drive ROI.
              </p>
            </Card>

            <Card>
              <div className="w-12 h-12 bg-verified-bg rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-maru-teal" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-maru-navy mb-2">Progressive learning</h3>
              <p className="text-maru-grey">
                Start from basics and gradually build expertise at your own pace.
              </p>
            </Card>

            <Card>
              <div className="w-12 h-12 bg-atrisk-bg rounded-lg flex items-center justify-center mb-4">
                <Wrench className="h-6 w-6 text-maru-teal" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-maru-navy mb-2">Tool agnostic</h3>
              <p className="text-maru-grey">
                Learn principles that work across ChatGPT, Claude, Gemini, and more.
              </p>
            </Card>

            <Card>
              <div className="w-12 h-12 bg-maru-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-maru-teal" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-maru-navy mb-2">Team-ready</h3>
              <p className="text-maru-grey">
                Scale knowledge across your organization with governance frameworks.
              </p>
            </Card>

            <Card>
              <div className="w-12 h-12 bg-maru-blue-100 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-maru-teal" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-maru-navy mb-2">Expert-led</h3>
              <p className="text-maru-grey">
                Learn from practitioners who've implemented AI at scale.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 surface-navy text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-heading font-bold mb-6">
            Ready to transform your workflow?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Join thousands of professionals mastering AI productivity. Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing">
              <Button variant="secondary" size="lg" className="bg-white text-maru-blue-700 hover:bg-maru-cloud border-white">
                Get Started Free
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" size="lg" className="text-white border-2 border-white hover:bg-white/10">
                Schedule a Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

