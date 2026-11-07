/**
 * CodSign decorative background. Gradients sit at the page edges and the
 * signature watermarks stay in the outer/bottom areas, so the working area
 * (titles, filters, tables, forms) stays clean. Purely visual.
 */
const SIGNATURE_PATH =
  'M10 120 C 60 20, 110 20, 120 90 S 170 160, 200 80 S 260 20, 280 100 S 330 150, 360 70 C 380 30, 420 40, 400 100 C 390 140, 440 130, 480 90';
const FLOURISH_PATH = 'M50 150 C 200 138, 350 146, 470 132';

const Signature = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 500 170" fill="none" className={className} aria-hidden="true">
    <path d={SIGNATURE_PATH} stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d={FLOURISH_PATH} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const AppBackground = () => (
  <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    {/* Light theme */}
    <div className="absolute inset-0 dark:hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#EEF4FF] via-[#F8FAFC] to-white" />
      <div className="absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-[#2563EB] opacity-[0.10] blur-3xl" />
      <div className="absolute -bottom-48 -right-32 h-[36rem] w-[36rem] rounded-full bg-[#06D6A0] opacity-[0.12] blur-3xl" />
      <Signature className="absolute -right-10 bottom-6 w-[46rem] rotate-[-6deg] text-[#0B3D5E] opacity-[0.06]" />
    </div>

    {/* Dark theme (default): deep navy #071D33, glow only at the edges */}
    <div className="absolute inset-0 hidden bg-[#071D33] dark:block">
      <div className="absolute -left-56 -top-56 h-[34rem] w-[34rem] rounded-full bg-[#2563EB] opacity-[0.20] blur-3xl" />
      <div className="absolute -bottom-72 -left-40 h-[30rem] w-[30rem] rounded-full bg-[#2563EB] opacity-[0.14] blur-3xl" />
      {/* Curved light arcs at the edges, as in the concept */}
      <div className="absolute -left-[46rem] -top-[32rem] h-[60rem] w-[60rem] rounded-full border-2 border-[#3B82F6]/40 shadow-[0_0_60px_10px_rgba(37,99,235,0.25)]" />
      <div className="absolute -right-[46rem] top-[18rem] h-[60rem] w-[60rem] rounded-full border-2 border-[#22D3EE]/25 shadow-[0_0_60px_10px_rgba(6,214,160,0.15)]" />
      {/* Turquoise glow + signature in the bottom-right corner */}
      <div className="absolute -bottom-40 -right-32 h-[34rem] w-[44rem] rounded-full bg-[#06D6A0] opacity-[0.22] blur-3xl" />
      <div className="absolute -bottom-24 right-1/4 h-64 w-[36rem] rounded-full bg-[#2563EB] opacity-[0.18] blur-3xl" />
      <Signature className="absolute -bottom-10 right-0 w-[56rem] rotate-[-4deg] text-[#06D6A0] opacity-[0.11]" />
      <Signature className="absolute -left-40 top-1/2 w-[30rem] rotate-[10deg] text-[#F3F7FB] opacity-[0.04]" />
    </div>
  </div>
);
