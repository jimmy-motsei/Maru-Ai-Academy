'use client';

import { useState } from 'react';
import { Button, Card } from '@/components/ui';
import { X } from 'lucide-react';

interface FeedbackModalProps {
  moduleSlug: string;
  lessonSlug: string;
  lessonTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

export function FeedbackModal({
  moduleSlug,
  lessonSlug,
  lessonTitle,
  isOpen,
  onClose,
  onSubmit
}: FeedbackModalProps) {
  const [ratings, setRatings] = useState({
    contentQuality: 0,
    difficulty: 0,
    relevance: 0,
    overallRating: 0
  });

  const [feedback, setFeedback] = useState({
    whatWorked: '',
    improvements: '',
    comments: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [awardedBadges, setAwardedBadges] = useState<any[]>([]);

  if (!isOpen) return null;

  const handleRating = (category: keyof typeof ratings, value: number) => {
    setRatings(prev => ({ ...prev, [category]: value }));
  };

  const handleSubmit = async () => {
    // Validate all ratings are filled
    if (Object.values(ratings).some(r => r === 0)) {
      alert('Please provide all ratings before submitting');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/feedback/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleSlug,
          lessonSlug,
          ...ratings,
          ...feedback
        })
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        
        // Check for newly awarded badges
        if (data.newBadges && data.newBadges.length > 0) {
          setAwardedBadges(data.newBadges);
        }
        
        if (onSubmit) onSubmit();
        
        // Auto-close after 3 seconds (longer if badge awarded)
        const closeDelay = data.newBadges?.length > 0 ? 5000 : 2000;
        setTimeout(() => {
          onClose();
        }, closeDelay);
      } else {
        alert('Failed to submit feedback. Please try again.');
      }
    } catch (error) {
      console.error('Feedback error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const RatingScale = ({ 
    label, 
    category, 
    description 
  }: { 
    label: string; 
    category: keyof typeof ratings; 
    description: string;
  }) => (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-900 mb-1">
        {label}
      </label>
      <p className="text-xs text-gray-500 mb-3">{description}</p>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => handleRating(category, num)}
            className={`w-10 h-10 rounded-lg border-2 transition-all font-semibold ${
              ratings[category] === num
                ? 'bg-primary-600 text-white border-primary-600 scale-110'
                : 'bg-white text-gray-700 border-gray-300 hover:border-primary-300 hover:bg-primary-50'
            }`}
          >
            {num}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>Poor</span>
        <span>Excellent</span>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {submitted ? (
          // Success state
          <div className="text-center py-12">
            {awardedBadges.length > 0 ? (
              // Badge awarded state
              <>
                <div className="text-6xl mb-4 animate-bounce">🏆</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Congratulations! 🎉
                </h2>
                <p className="text-gray-600 mb-6">
                  You've earned {awardedBadges.length > 1 ? 'new badges' : 'a new badge'}!
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                  {awardedBadges.map((badge: any) => (
                    <div 
                      key={badge.id} 
                      className="bg-gradient-to-br from-amber-50 to-yellow-100 border-2 border-amber-300 rounded-xl p-4 text-center animate-pulse"
                    >
                      <div className="text-4xl mb-2">🎖️</div>
                      <h3 className="font-bold text-gray-900">{badge.name}</h3>
                      <p className="text-xs text-gray-600">{badge.description}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  View all your badges in your Dashboard
                </p>
              </>
            ) : (
              // Standard thank you state
              <>
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Thank You!
                </h2>
                <p className="text-gray-600">
                  Your feedback helps us improve the learning experience for everyone.
                </p>
              </>
            )}
          </div>
        ) : (
          // Feedback form
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                How was this lesson?
              </h2>
              <p className="text-gray-600">
                Tell us about <strong>{lessonTitle}</strong>
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
              {/* Ratings */}
              <RatingScale
                label="Content Quality"
                category="contentQuality"
                description="How well was the content explained?"
              />

              <RatingScale
                label="Difficulty Level"
                category="difficulty"
                description="Was the difficulty appropriate for you?"
              />

              <RatingScale
                label="Relevance"
                category="relevance"
                description="How relevant is this to your work?"
              />

              <RatingScale
                label="Overall Rating"
                category="overallRating"
                description="How would you rate this lesson overall?"
              />

              <hr className="my-6 border-gray-200" />

              {/* Text feedback */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    What worked well? (Optional)
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    rows={3}
                    maxLength={500}
                    placeholder="What did you enjoy or find helpful?"
                    value={feedback.whatWorked}
                    onChange={(e) => setFeedback(prev => ({ ...prev, whatWorked: e.target.value }))}
                  />
                  <div className="text-xs text-gray-400 text-right mt-1">
                    {feedback.whatWorked.length}/500
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    What could be improved? (Optional)
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    rows={3}
                    maxLength={500}
                    placeholder="What could make this lesson better?"
                    value={feedback.improvements}
                    onChange={(e) => setFeedback(prev => ({ ...prev, improvements: e.target.value }))}
                  />
                  <div className="text-xs text-gray-400 text-right mt-1">
                    {feedback.improvements.length}/500
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Additional Comments (Optional)
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    rows={3}
                    maxLength={1000}
                    placeholder="Any other thoughts or suggestions?"
                    value={feedback.comments}
                    onChange={(e) => setFeedback(prev => ({ ...prev, comments: e.target.value }))}
                  />
                  <div className="text-xs text-gray-400 text-right mt-1">
                    {feedback.comments.length}/1000
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  fullWidth
                  disabled={loading}
                >
                  Maybe Later
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={loading || Object.values(ratings).some(r => r === 0)}
                >
                  {loading ? 'Submitting...' : 'Submit Feedback'}
                </Button>
              </div>
            </form>
          </>
        )}
      </Card>
    </div>
  );
}
