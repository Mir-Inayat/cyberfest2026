import Navbar from '@/components/Navbar';
import ProblemStatementsReadOnly from '@/components/ProblemStatementsReadOnly';

const ProblemStatements = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar showAfterIntro={true} />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto mb-8">
            <h1 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              <span className="gradient-text">Problem Statements</span>
            </h1>
            <p className="font-rajdhani text-foreground/80">
              View all problem statements from CyberFest 2026 Hackathon. The event has now concluded.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <ProblemStatementsReadOnly />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProblemStatements;
