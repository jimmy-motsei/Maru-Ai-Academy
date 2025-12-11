import Link from 'next/link'
import { Button, Card, Badge } from './components/ui'

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20 sm:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="primary" className="mb-6 animate-fade-in">
              🚀 Transform Your Business with AI
            </Badge>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold text-gray-900 mb-6 animate-slide-up">
              Master AI <span className="gradient-text">Productivity</span> for Your Business
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto animate-slide-up animation-delay-200">
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
                <Button variant="outline" size="lg">
                  View Curriculum
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600">8</div>
                <div className="text-sm text-gray-600 mt-1">Modules</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600">142</div>
                <div className="text-sm text-gray-600 mt-1">Resources</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600">24/7</div>
                <div className="text-sm text-gray-600 mt-1">Access</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Streams */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you're just starting or ready to scale, we have the perfect curriculum for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Beginner Stream */}
            <Card className="group" hover>
              <div className="flex items-start justify-between mb-4">
                <Badge variant="success" size="lg">Beginner</Badge>
                <span className="text-2xl">📚</span>
              </div>
              
              <h3 className="text-2xl font-heading font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                Beginner Stream
              </h3>
              
              <p className="text-gray-600 mb-6">
                Perfect for getting started with AI. Learn the fundamentals of AI productivity, 
                safety, and basic automation.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-700">AI Made Simple (Foundations & Safety)</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-700">Prompts that work at work</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-700">Picking tools & no-code quick wins</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-700">Your first live workflow (Capstone)</span>
                </div>
              </div>
              
              <Link href="/modules">
                <Button variant="primary" fullWidth>
                  Start Beginner Path
                </Button>
              </Link>
            </Card>

            {/* Intermediate Stream */}
            <Card className="group border-2 border-primary-200" hover>
              <div className="flex items-start justify-between mb-4">
                <Badge variant="primary" size="lg">Intermediate</Badge>
                <span className="text-2xl">🚀</span>
              </div>
              
              <h3 className="text-2xl font-heading font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                Intermediate Stream
              </h3>
              
              <p className="text-gray-600 mb-6">
                For power users ready to scale AI across teams. Advanced workflows, 
                governance, and team automation.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-700">From ad-hoc prompts to repeatable workflows</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-700">Semantic search & private knowledge</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-700">No-code automations that stick</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-700">Measurement, governance & handover</span>
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
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4">
              Why Maru AI Academy?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive training designed for real business results
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card variant="glass">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Practical & Hands-On</h3>
              <p className="text-gray-600">
                Learn by doing with real-world exercises and projects you can apply immediately.
              </p>
            </Card>

            <Card variant="glass">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Business-Focused</h3>
              <p className="text-gray-600">
                Every lesson is designed to solve real business problems and drive ROI.
              </p>
            </Card>

            <Card variant="glass">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Progressive Learning</h3>
              <p className="text-gray-600">
                Start from basics and gradually build expertise at your own pace.
              </p>
            </Card>

            <Card variant="glass">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🛠️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tool Agnostic</h3>
              <p className="text-gray-600">
                Learn principles that work across ChatGPT, Claude, Gemini, and more.
              </p>
            </Card>

            <Card variant="glass">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Team-Ready</h3>
              <p className="text-gray-600">
                Scale knowledge across your organization with governance frameworks.
              </p>
            </Card>

            <Card variant="glass">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert-Led</h3>
              <p className="text-gray-600">
                Learn from practitioners who've implemented AI at scale.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-heading font-bold mb-6">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Join thousands of professionals mastering AI productivity. Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing">
              <Button variant="outline" size="lg" className="bg-white text-primary-600 hover:bg-gray-100 border-white">
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

