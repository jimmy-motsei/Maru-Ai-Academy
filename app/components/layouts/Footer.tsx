import Link from 'next/link'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="font-heading font-bold text-xl text-white">
                Maru AI Academy
              </span>
            </div>
            <p className="text-gray-400 max-w-md">
              Master AI productivity tools and transform your business workflows. 
              Learn from basic AI concepts to advanced team automation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/modules" className="hover:text-primary-400 transition-colors">
                  Modules
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-primary-400 transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="hover:text-primary-400 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-primary-400 transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Maru AI Academy. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/refund-policy" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
              Refund Policy
            </Link>
            <Link href="/cancellation-policy" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
              Cancellation Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
