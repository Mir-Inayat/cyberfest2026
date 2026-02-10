import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import StarRating from '@/components/StarRating';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const FeedbackSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<string>('overall');
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    // Validation
    if (!name.trim()) {
      setSubmitError('Please enter your name.');
      return;
    }

    if (!email.trim()) {
      setSubmitError('Please enter your email.');
      return;
    }

    if (!category) {
      setSubmitError('Please select a feedback category.');
      return;
    }

    if (rating === 0) {
      setSubmitError('Please provide a rating.');
      return;
    }

    if (!feedback.trim()) {
      setSubmitError('Please enter your feedback.');
      return;
    }

    setSubmitting(true);

    try {
      await addDoc(collection(db, 'feedback'), {
        name: name.trim(),
        email: email.trim(),
        category,
        rating,
        feedback: feedback.trim(),
        submittedAt: serverTimestamp(),
      });

      setSubmitSuccess(true);
      // Reset form
      setName('');
      setEmail('');
      setCategory('overall');
      setRating(0);
      setFeedback('');
      
      // Scroll to success message
      setTimeout(() => {
        document.getElementById('feedback-success')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    } catch (error: unknown) {
      console.error('Error submitting feedback:', error);
      let errorMsg = 'Failed to submit feedback. Please try again.';
      
      if (error && typeof error === 'object' && 'code' in error) {
        const code = (error as { code?: string }).code;
        if (code === 'permission-denied') {
          errorMsg = 'Access denied. Please contact organizers.';
        } else if (code === 'unavailable') {
          errorMsg = 'Connection error. Please check your internet connection.';
        }
      } else if (error && typeof error === 'object' && 'message' in error) {
        const message = (error as { message?: string }).message;
        if (message) errorMsg = message;
      }
      
      setSubmitError(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="feedback" className="max-w-3xl mx-auto">
      <div className="cyber-card rounded-xl p-6 md:p-8 neon-border">
            {submitSuccess && (
              <div 
                id="feedback-success" 
                className="rounded-lg border border-green-500/40 bg-green-500/10 px-4 py-3 mb-6"
              >
                <div className="text-sm font-semibold text-green-200 mb-1">✓ Thank You!</div>
                <div className="text-sm text-green-200/80">
                  Your feedback has been submitted successfully. We appreciate your input!
                </div>
              </div>
            )}

            {submitError && (
              <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 mb-6">
                <div className="text-sm font-semibold text-red-200 mb-1">Error</div>
                <div className="text-sm text-red-200/80">{submitError}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="feedback-name">
                    Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="feedback-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    disabled={submitting}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback-email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="feedback-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    disabled={submitting}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="feedback-category">
                    Feedback Category <span className="text-red-500">*</span>
                  </Label>
                  <Select value={category} onValueChange={setCategory} disabled={submitting}>
                    <SelectTrigger id="feedback-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="overall">Overall Experience</SelectItem>
                      <SelectItem value="hackathon">Hackathon</SelectItem>
                      <SelectItem value="ctf">CTF Competition</SelectItem>
                      <SelectItem value="sessions">Expert Sessions</SelectItem>
                      <SelectItem value="organization">Event Organization</SelectItem>
                      <SelectItem value="venue">Venue & Facilities</SelectItem>
                      <SelectItem value="food">Food & Refreshments</SelectItem>
                      <SelectItem value="swag">Swag & Goodies</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>
                    Rating <span className="text-red-500">*</span>
                  </Label>
                  <div className="pt-2">
                    <StarRating
                      value={rating}
                      onChange={setRating}
                      disabled={submitting}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback-message">
                  Your Feedback <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="feedback-message"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your thoughts, suggestions, or experiences..."
                  rows={6}
                  disabled={submitting}
                  required
                  className="resize-none"
                />
                <div className="text-xs text-foreground/60">
                  {feedback.length}/1000 characters
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 pt-4">
                <div className="text-xs text-foreground/60">
                  <span className="text-red-500">*</span> Required fields
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="min-w-[150px]"
                >
                  {submitting ? 'Submitting...' : 'Submit Feedback'}
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-8 text-center">
            <p className="font-rajdhani text-sm text-foreground/60">
              Your feedback is valuable to us and will help shape future CyberFest events.
              <br />
              All responses are confidential and will be reviewed by the organizing committee.
            </p>
          </div>
    </section>
  );
};

export default FeedbackSection;
