import Navbar from '@/components/Navbar';
import FeedbackSection from '@/components/FeedbackSection';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const Feedback = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar showAfterIntro={true} />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Thank You Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 max-w-4xl mx-auto"
          >
            <div className="inline-block mb-6 px-4 py-2 rounded-full border border-primary/30 bg-primary/10">
              <span className="font-mono-tech text-sm text-primary uppercase tracking-wider">
                CyberFest 2026
              </span>
            </div>

            <h1 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Thank You for Being Part of</span>
              <br />
              <span className="text-primary">CyberFest 2026!</span>
            </h1>

            <div className="cyber-card rounded-xl p-6 md:p-8 neon-border mb-8">
              <p className="font-rajdhani text-lg md:text-xl text-foreground/90 leading-relaxed">
                It was an incredible journey bringing together cybersecurity enthusiasts, innovators, 
                and problem-solvers from across the nation. Your participation, energy, and creativity 
                made CyberFest 2026 a resounding success!
              </p>
              <div className="mt-6 pt-6 border-t border-primary/20">
                <p className="font-rajdhani text-base md:text-lg text-foreground/80">
                  Hackathon • Capture The Flag • Expert Sessions • Networking
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="cyber-card rounded-lg p-4 border border-primary/20"
              >
                <div className="text-3xl font-orbitron font-bold text-primary mb-2">450+</div>
                <div className="text-sm text-foreground/70 font-rajdhani">Participants</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="cyber-card rounded-lg p-4 border border-primary/20"
              >
                <div className="text-3xl font-orbitron font-bold text-primary mb-2">100+</div>
                <div className="text-sm text-foreground/70 font-rajdhani">Teams</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="cyber-card rounded-lg p-4 border border-primary/20"
              >
                <div className="text-3xl font-orbitron font-bold text-primary mb-2">48</div>
                <div className="text-sm text-foreground/70 font-rajdhani">Hours of Innovation</div>
              </motion.div>
            </div>

            <p className="font-rajdhani text-base text-foreground/70">
              We would love to hear about your experience! Your feedback helps us improve 
              and create even better events in the future.
            </p>
          </motion.div>

          {/* Feedback Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <FeedbackSection />
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Feedback;
