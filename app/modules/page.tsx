'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { ModuleCard } from '@/components/modules';
import { Badge } from '@/components/ui';
import api, { ApiModule } from '@/lib/api';
import { TrendingUp, Users } from 'lucide-react'

// Group modules by stream
interface StreamGroup {
  id: 'beginner' | 'intermediate';
  title: string;
  description: string;
  modules: ApiModule[];
}

export default function ModulesPage() {
  const { data: session } = useSession();
  const [modules, setModules] = useState<ApiModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is on PRO or TEAM plan
  const isPro = (session?.user as any)?.plan === 'PRO' || (session?.user as any)?.plan === 'TEAM';

  useEffect(() => {
    async function fetchModules() {
      setLoading(true);
      const { data, error } = await api.getModules();
      
      if (error) {
        setError(error);
        setLoading(false);
        return;
      }
      
      if (data?.modules) {
        setModules(data.modules);
      }
      setLoading(false);
    }

    fetchModules();
  }, []);

  // Group modules by stream
  const streams: StreamGroup[] = [
    {
      id: 'beginner',
      title: 'Beginner Stream',
      description: 'Perfect for getting started with AI. Learn the fundamentals of AI productivity, safety, and basic automation.',
      modules: modules.filter(m => m.stream === 'BEGINNER').sort((a, b) => a.order - b.order)
    },
    {
      id: 'intermediate',
      title: 'Intermediate Stream',
      description: 'For power users ready to scale AI across teams. Advanced workflows, governance, and team automation.',
      modules: modules.filter(m => m.stream === 'INTERMEDIATE').sort((a, b) => a.order - b.order)
    }
  ];

  if (loading) {
    return (
      <div className="bg-maru-cloud min-h-screen py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-maru-blue mx-auto mb-4"></div>
              <p className="text-maru-grey">Loading modules...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-maru-cloud min-h-screen py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-overdue-fg mb-4">Error loading modules: {error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="text-maru-blue-700 hover:underline"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-maru-cloud min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="blue" className="mb-4">Curriculum</Badge>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-maru-navy mb-6">
            Everything you need to master AI
          </h1>
          <p className="text-xl text-maru-grey">
            A comprehensive, structured learning path designed to take you from novice to AI expert.
          </p>
        </div>

        {/* Interactive Demo Banner */}
        <div className="mb-16 surface-navy rounded-2xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl -ml-24 -mb-24"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4 border border-white/20">
                <span className="w-2 h-2 rounded-full bg-verified animate-pulse"></span>
                New Feature
              </div>
              <h2 className="text-3xl font-bold mb-4">Try the new "Prompt Gym"</h2>
              <p className="text-maru-blue-100 text-lg mb-6 leading-relaxed">
                Experience our new active learning format. Stop watching videos and start building real AI skills with our interactive hands-on challenges.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="/modules/interactive-demo"
                  className="bg-white text-maru-blue-700 hover:bg-maru-blue-100 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 shadow-sm"
                >
                  Start Interactive Demo 
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </a>
              </div>
            </div>
            
            <div className="hidden md:block relative">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 w-80 transform rotate-3 hover:rotate-0 transition-all duration-500 shadow-2xl">
                <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-4">
                  <div className="w-8 h-8 rounded-full bg-verified flex items-center justify-center text-verified-fg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <div className="text-xs text-maru-blue-100 uppercase font-bold">Challenge Complete</div>
                    <div className="font-semibold text-sm">Role-play prompting</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-white/20 rounded w-3/4"></div>
                  <div className="h-2 bg-white/10 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-20">
          {streams.map((stream) => (
            <section key={stream.id} className="relative">
              {/* Stream Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-maru-line pb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-heading font-bold text-maru-navy">
                      {stream.title}
                    </h2>
                    <Badge variant={stream.id === 'beginner' ? 'teal' : 'blue'}>
                      {stream.modules.length} Modules
                    </Badge>
                  </div>
                  <p className="text-lg text-maru-grey max-w-2xl">
                    {stream.description}
                  </p>
                </div>
              </div>

              {/* Stream Grid */}
              {stream.modules.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stream.modules.map((module) => {
                    // Logic to lock intermediate stream for non-pro users
                    const isLocked = stream.id === 'intermediate' && !isPro;
                    
                    return (
                      <ModuleCard 
                        key={module.id} 
                        isLocked={isLocked}
                        module={{
                          id: module.id,
                          title: module.title,
                          description: module.description,
                          stream: module.stream.toLowerCase() as 'beginner' | 'intermediate',
                          order: module.order,
                          slug: module.slug,
                          icon: module.icon,
                          duration: module.duration
                        }} 
                      />
                    );
                  })}
                </div>
              ) : (
                <p className="text-maru-grey italic">No modules available yet.</p>
              )}
            </section>
          ))}
        </div>

        {/* Coming Soon - Advanced Courses */}
        <section className="mt-24 pt-16 border-t border-maru-line">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-maru-line pb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-heading font-bold text-maru-navy">
                  Coming soon
                </h2>
                <Badge variant="atrisk">Advanced</Badge>
              </div>
              <p className="text-lg text-maru-grey max-w-2xl">
                Expand your skills with role-specific AI mastery courses. Subscribe now to get early access when they launch.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* AI Mastery for Finance */}
            <div className="relative bg-white rounded-xl border border-maru-line p-6 hover:border-maru-blue-300 hover:shadow-lg transition-all group opacity-80">
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-atrisk-bg text-atrisk-fg">
                  Q2 2026
                </span>
              </div>
              <div className="text-4xl mb-4"></div>
              <div className="text-xs font-medium text-maru-blue-700 uppercase tracking-wide mb-2">
                Advanced Role-Specific
              </div>
              <h3 className="text-lg font-bold text-maru-navy mb-2 group-hover:text-maru-blue-700 transition-colors">
                AI mastery for finance professionals
              </h3>
              <p className="text-maru-grey text-sm">
                Automate financial analysis, forecasting, and reporting with AI-powered workflows.
              </p>
            </div>

            {/* AI Mastery for Marketing & Sales */}
            <div className="relative bg-white rounded-xl border border-maru-line p-6 hover:border-maru-blue-300 hover:shadow-lg transition-all group opacity-80">
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-atrisk-bg text-atrisk-fg">
                  Q2 2026
                </span>
              </div>
              <div className="mb-4"><TrendingUp className="h-8 w-8 text-maru-teal" aria-hidden="true" /></div>
              <div className="text-xs font-medium text-maru-blue-700 uppercase tracking-wide mb-2">
                Advanced Role-Specific
              </div>
              <h3 className="text-lg font-bold text-maru-navy mb-2 group-hover:text-maru-blue-700 transition-colors">
                AI mastery for marketing & sales
              </h3>
              <p className="text-maru-grey text-sm">
                Build AI-driven lead generation, content creation, and campaign optimization systems.
              </p>
            </div>

            {/* AI Mastery for HR */}
            <div className="relative bg-white rounded-xl border border-maru-line p-6 hover:border-maru-blue-300 hover:shadow-lg transition-all group opacity-80">
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-atrisk-bg text-atrisk-fg">
                  Q3 2026
                </span>
              </div>
              <div className="mb-4"><Users className="h-8 w-8 text-maru-teal" aria-hidden="true" /></div>
              <div className="text-xs font-medium text-maru-blue-700 uppercase tracking-wide mb-2">
                Advanced Role-Specific
              </div>
              <h3 className="text-lg font-bold text-maru-navy mb-2 group-hover:text-maru-blue-700 transition-colors">
                AI mastery for HR & people operations
              </h3>
              <p className="text-maru-grey text-sm">
                Streamline recruitment, onboarding, and employee engagement with intelligent automation.
              </p>
            </div>

            {/* Industry AI Tech Stack */}
            <div className="relative bg-white rounded-xl border border-maru-line p-6 hover:border-maru-blue-300 hover:shadow-lg transition-all group opacity-80">
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-atrisk-bg text-atrisk-fg">
                  Q3 2026
                </span>
              </div>
              <div className="text-4xl mb-4"></div>
              <div className="text-xs font-medium text-maru-blue-700 uppercase tracking-wide mb-2">
                Advanced Strategy
              </div>
              <h3 className="text-lg font-bold text-maru-navy mb-2 group-hover:text-maru-blue-700 transition-colors">
                Building your industry AI tech stack
              </h3>
              <p className="text-maru-grey text-sm">
                Design and implement the optimal AI toolkit for Hospitality, Retail, Healthcare, and more.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <p className="text-maru-grey text-sm">
              Want to be notified when these courses launch?{' '}
              <a href="/auth/signup" className="text-maru-blue-700 font-medium hover:underline">
                Create a free account
              </a>
              {' '}to get early access.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <div className="mt-24 pt-16 border-t border-maru-line text-center">
          <h2 className="text-2xl font-heading font-bold text-maru-navy mb-4">
            Not sure where to start?
          </h2>
          <p className="text-maru-grey mb-8">
            Take our quick assessment to find the perfect learning path for your goals.
          </p>
          <button className="text-maru-blue-700 font-semibold hover:text-maru-blue-700 underline">
            Take the AI Readiness Assessment &rarr;
          </button>
        </div>
      </div>
    </div>
  )
}
