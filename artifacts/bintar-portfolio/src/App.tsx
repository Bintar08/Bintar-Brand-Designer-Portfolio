import { type ReactNode, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowDown, ArrowUpRight, Asterisk, Instagram, Mail, Menu, MessageCircle, X } from 'lucide-react';
import profileImage from '@assets/profile_me_1789444181030.jpg';
import aviaFeatureImage from '@assets/Avia_Cosmetic_1790048442735.jpg';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const projects = [
  {
    id: '01',
    title: 'Avia Cosmetic',
    type: 'Brand identity / Beauty Store',
    year: '2026',
    note: 'An elegant and beautiful brand identity for a beauty store with the slogan “Your one-stop beauty shopping center.”',
    className: 'art-avia',
    stamp: 'BEAUTY IN FOCUS',
  },
  {
    id: '02',
    title: 'Kawan Coffee',
    type: 'Strategy / Packaging',
    year: '2023',
    note: 'A visual language for a neighborhood coffee ritual, with just enough mischief.',
    className: 'art-kawan',
    stamp: 'GOOD COMPANY',
  },
  {
    id: '03',
    title: 'Layar Press',
    type: 'Identity / Editorial',
    year: '2023',
    note: 'A small press with a big point of view — built around the pleasure of looking closer.',
    className: 'art-layar',
    stamp: 'LOOK AGAIN',
  },
  {
    id: '04',
    title: 'Mori Botanics',
    type: 'Identity / Digital',
    year: '2022',
    note: 'A spirited identity for plant care that feels more like a daily practice than a chore.',
    className: 'art-mori',
    stamp: 'GROW SLOW',
  },
];

function Reveal({ children, className = '', delay = '' }: { children: ReactNode; className?: string; delay?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.14 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`${visible ? `reveal ${delay}` : 'opacity-0 translate-y-5'} ${className}`}>{children}</div>;
}

function Nav({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
  const links = [
    { href: '#about', label: 'About' },
    { href: '#work', label: 'Selected work' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className="absolute left-0 right-0 top-0 z-40 px-5 py-5 md:px-10 md:py-7">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between">
        <a href="#top" data-testid="link-logo" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-[-0.04em]">
          <span className="grid h-8 w-8 place-items-center bg-foreground text-background transition-transform duration-300 group-hover:rotate-12">B</span>
          <span>Bintar<span className="text-accent">.</span></span>
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} data-testid={`link-nav-${link.label.toLowerCase().replace(/\s/g, '-')}`} className="group relative text-xs font-bold uppercase tracking-[0.13em]">
              {link.label}
              <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          data-testid="button-mobile-menu"
          className="grid h-10 w-10 place-items-center border border-foreground md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
      <div className={`mx-auto mt-4 max-w-[1400px] overflow-hidden bg-foreground transition-[max-height] duration-500 md:hidden ${menuOpen ? 'max-h-72' : 'max-h-0'}`}>
        <nav className="flex flex-col p-5" aria-label="Mobile navigation">
          {links.map((link, index) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} data-testid={`link-mobile-${index}`} className="flex items-center justify-between border-b border-background/20 py-4 text-sm font-bold uppercase tracking-[0.12em] text-background last:border-0">
              {link.label}
              <ArrowUpRight size={16} />
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-[740px] overflow-hidden bg-background px-5 pb-16 pt-32 md:min-h-[850px] md:px-10 md:pt-40">
      <div className="pointer-events-none absolute left-[-8vw] top-[16%] h-[min(58vw,780px)] w-[min(58vw,780px)] rounded-full border-[1px] border-foreground/10" />
      <div className="pointer-events-none absolute left-[5vw] top-[27%] h-[min(38vw,510px)] w-[min(38vw,510px)] rounded-full border-[1px] border-foreground/10" />
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-end gap-10 lg:grid-cols-[1fr_340px]">
        <div className="relative z-10">
          <p className="reveal mb-6 flex items-center gap-3 font-mono-custom text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-accent" /> Design Think Lab / Yogyakarta, ID
          </p>
          <h1 className="font-display text-[clamp(5rem,17vw,15.5rem)] font-bold leading-[.76] tracking-[-0.1em]">
            <span className="reveal block">Make</span>
            <span className="reveal reveal-delay-1 ml-[10vw] block text-accent">your</span>
            <span className="reveal reveal-delay-2 block">mark.</span>
          </h1>
          <div className="reveal reveal-delay-3 mt-12 flex max-w-[520px] items-start gap-5 md:ml-[25vw]">
            <Asterisk className="mt-1 shrink-0 text-accent" size={23} strokeWidth={1.5} />
            <p className="max-w-sm text-base leading-relaxed text-muted-foreground md:text-lg">Brand identities for people building something worth remembering.</p>
          </div>
        </div>
        <div className="relative z-10 lg:pb-8">
          <div className="reveal reveal-delay-3 ml-auto max-w-[300px] border-t border-foreground pt-5">
            <div className="mb-8 flex justify-between font-mono-custom text-[10px] uppercase tracking-[0.15em]">
              <span>Available</span>
              <span>For Freelance</span>
            </div>
            <a href="#contact" className="group flex items-center justify-between text-xs font-bold uppercase tracking-[0.14em]">
              <span>Let's talk</span>
              <ArrowDown size={14} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function MainContent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const mainFeaturedProject = projects[0];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-background antialiased">
      <Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero />

        {/* --- SECTION ABOUT --- */}
        <section id="about" className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36 border-t border-foreground/10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[340px_1fr]">
            <Reveal>
              <h2 className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-muted-foreground">01 / The philosophy</h2>
            </Reveal>
            <div className="max-w-[760px]">
              <Reveal>
                <p className="text-xl leading-relaxed text-foreground md:text-3xl font-medium tracking-tight">
                  Hi, I’m Bintar. A brand designer based in Yogyakarta. I partner with founders to turn messy, beautiful ideas into sharp, intentional visual identities.
                </p>
              </Reveal>
              <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
                <Reveal delay="reveal-delay-1">
                  <h3 className="font-mono-custom text-[10px] uppercase tracking-[0.15em] border-b border-foreground/20 pb-3 mb-4">Core Focus</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">Brand Identity Systems, Creative Strategy, Packaging Design, and Visual Architecture that scales across digital and physical spaces.</p>
                </Reveal>
                <Reveal delay="reveal-delay-2">
                  <h3 className="font-mono-custom text-[10px] uppercase tracking-[0.15em] border-b border-foreground/20 pb-3 mb-4">Experience</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">Collaborating with local and global clients across skincare, editorial press, and specialty coffee. Building lasting design roots since 2022.</p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION WORK --- */}
        <section id="work" className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36 border-t border-foreground/10">
          <div className="mb-16 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <Reveal>
              <h2 className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-muted-foreground">02 / Selected work</h2>
            </Reveal>
            <Reveal delay="reveal-delay-1">
