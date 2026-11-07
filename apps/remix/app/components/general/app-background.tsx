/**
 * CodSign decorative background: soft brand gradients and discreet
 * signature-stroke watermarks. Purely visual, sits behind all content.
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
  <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden dark:hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-[#EEF4FF] via-[#F8FAFC] to-white" />
    <div className="absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-[#2563EB] opacity-[0.10] blur-3xl" />
    <div className="absolute -bottom-48 -right-32 h-[36rem] w-[36rem] rounded-full bg-[#06D6A0] opacity-[0.12] blur-3xl" />
    <div className="absolute right-1/4 top-1/3 h-72 w-72 rounded-full bg-[#0B3D5E] opacity-[0.05] blur-3xl" />
    <Signature className="absolute -right-10 bottom-6 w-[46rem] rotate-[-6deg] text-[#0B3D5E] opacity-[0.06]" />
    <Signature className="absolute -left-24 top-40 w-[28rem] rotate-[8deg] text-[#2563EB] opacity-[0.05]" />
  </div>
);
