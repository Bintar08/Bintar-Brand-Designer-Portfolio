import { type ReactNode, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowDown, ArrowUpRight, Asterisk, Instagram, Mail, Menu, X } from 'lucide-react';
import profileImage from '@assets/profile_me_1789444181030.jpg';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const projects = [
  {
    id: '01',
    title: 'Sora Objects',
    type: 'Brand identity / Art direction',
    year: '2024',
    note: 'A warm, tactile identity for a furniture studio making fewer, better things.',
    className: 'art-sora',
    stamp: 'MADE TO LAST',
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
            <span className="h-2 w-2 rounded-full bg-accent" /> Independent designer / Yogyakarta, ID
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
              <span>Est. 2018</span><span>Scroll to explore</span>
            </div>
            <a href="#work" data-testid="link-hero-work" className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.08em]">
              See the work <span className="grid h-10 w-10 place-items-center bg-foreground text-background transition-colors duration-300 group-hover:bg-accent group-hover:text-foreground"><ArrowDown size={17} /></span>
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 flex w-full overflow-hidden border-y border-foreground bg-accent py-3 font-mono-custom text-[10px] uppercase tracking-[0.18em]">
        <div className="marquee flex min-w-max gap-12 whitespace-nowrap">
          <span>Identity with a point of view</span><span>+</span><span>Less noise, more signal</span><span>+</span><span>Identity with a point of view</span><span>+</span><span>Less noise, more signal</span><span>+</span>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="bg-foreground px-5 py-20 text-background md:px-10 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-12 flex items-center justify-between border-b border-background/25 pb-5">
          <p className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-background/60">01 / About me</p>
          <Asterisk className="text-accent" size={20} />
        </Reveal>
        <div className="grid gap-12 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-stretch lg:gap-16">
          <Reveal delay="reveal-delay-1">
            <p className="mb-7 max-w-[260px] font-mono-custom text-[10px] uppercase leading-[1.6] tracking-[0.15em] text-background/60">A curious eye for the details that make a thing feel like itself.</p>
            <figure className="max-w-[330px] lg:max-w-[260px]">
              <div className="relative aspect-[4/5] overflow-hidden bg-background/10">
                <img
                  src={profileImage}
                  alt="Bintar, brand identity and logo designer based in Yogyakarta"
                  className="h-full w-full object-cover object-center grayscale-[12%] transition-transform duration-700 hover:scale-[1.03]"
                />
                <span className="absolute bottom-3 left-3 bg-foreground/80 px-2 py-1 font-mono-custom text-[9px] uppercase tracking-[0.15em] text-background">Bintar / Yogyakarta</span>
              </div>
              <figcaption className="mt-3 flex justify-between font-mono-custom text-[9px] uppercase tracking-[0.15em] text-background/45">
                <span>Portrait</span>
                <span>01—24</span>
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay="reveal-delay-2" className="lg:flex lg:min-h-[380px] lg:flex-col lg:justify-center">
            <p data-testid="text-about-copy" className="max-w-[650px] font-display text-[12px] font-medium leading-[1.65] tracking-[0.01em]">
              I’m Bintar, a logo brand identity and logo designer based in Yogyakarta, Indonesia, working independently with founders, teams, and the occasional dreamer. My approach is collaborative, curious, and grounded in the belief that a strong brand should feel unmistakably yours — not like a trend report in disguise.
            </p>
            <p className="mt-8 max-w-[360px] text-sm leading-relaxed text-background/60 md:ml-auto md:mt-12">The work starts with listening closely, then finding the clearest and most honest way to make a brand recognizable.</p>
          </Reveal>
        </div>
        <Reveal className="mt-16 grid border-t border-background/25 pt-6 md:grid-cols-3" delay="reveal-delay-3">
          <p className="font-mono-custom text-[10px] uppercase tracking-[0.15em] text-background/55">What I do</p>
          <div className="mt-5 grid grid-cols-2 gap-y-3 text-sm font-bold md:col-span-2 md:mt-0 md:grid-cols-3">
            <span>Brand strategy</span><span>Visual identity</span><span>Logotypes</span><span>Packaging</span><span>Art direction</span><span>Digital design</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProjectArtwork({ project }: { project: typeof projects[number] }) {
  return (
    <div className={`project-art relative aspect-[1.15/1] w-full overflow-hidden ${project.className}`}>
      <div className="absolute inset-0 opacity-90" />
      {project.className === 'art-sora' && (
        <>
          <div className="absolute left-[14%] top-[13%] h-[62%] w-[70%] rotate-[-7deg] bg-[#f7e9c7] shadow-[18px_18px_0_hsl(40_18%_9%/.18)]" />
          <div className="absolute left-[27%] top-[24%] h-[40%] w-[43%] rounded-full border-[18px] border-accent" />
          <div className="absolute left-[39%] top-[36%] h-[17%] w-[20%] rounded-full bg-foreground" />
          <span className="absolute bottom-[10%] left-[9%] font-mono-custom text-[10px] tracking-[.16em] text-foreground">SORA / FORM 01</span>
        </>
      )}
      {project.className === 'art-kawan' && (
        <>
          <div className="absolute left-[12%] top-[16%] h-[67%] w-[36%] rotate-[-8deg] border-[3px] border-foreground bg-accent" />
          <div className="absolute left-[39%] top-[9%] h-[72%] w-[40%] rotate-[7deg] border-[3px] border-foreground bg-[#e5d7bd]" />
          <div className="absolute left-[26%] top-[28%] h-28 w-28 rounded-full border-[10px] border-foreground bg-accent" />
          <span className="absolute bottom-[9%] right-[11%] rotate-90 font-display text-4xl font-bold tracking-[-.08em]">KAWAN</span>
        </>
      )}
      {project.className === 'art-layar' && (
        <>
          <div className="absolute inset-[12%] border border-[#e6d8b9]/40" />
          <div className="absolute left-[12%] top-[19%] font-display text-[clamp(3rem,9vw,7rem)] font-bold leading-[.8] tracking-[-.1em] text-[#e6d8b9]">look<br />again.</div>
          <div className="absolute bottom-[14%] right-[13%] h-16 w-16 rounded-full bg-accent" />
          <div className="absolute bottom-[16%] right-[16%] h-10 w-10 rounded-full border border-foreground" />
        </>
      )}
      {project.className === 'art-mori' && (
        <>
          <div className="absolute left-[19%] top-[7%] h-[82%] w-[59%] rounded-[50%_50%_8%_8%] border-[3px] border-foreground bg-[#c4d1bd]" />
          <div className="absolute left-[33%] top-[26%] h-[51%] w-[31%] rounded-[50%_50%_45%_45%] border-[2px] border-foreground bg-accent" />
          <div className="absolute left-[43%] top-[40%] h-[15%] w-[12%] rounded-full bg-foreground" />
          <span className="absolute bottom-[9%] left-[11%] font-mono-custom text-[10px] tracking-[.16em]">MORI / DAILY CARE</span>
        </>
      )}
    </div>
  );
}

function Work() {
  return (
    <section id="work" className="bg-background px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-16 flex items-end justify-between border-b border-foreground pb-5">
          <div>
            <p className="mb-5 font-mono-custom text-[10px] uppercase tracking-[0.2em] text-muted-foreground">02 / Selected work</p>
            <h2 className="font-display text-[clamp(3.6rem,9vw,9rem)] font-bold leading-[.78] tracking-[-0.09em]">A few<br /><span className="text-accent">good ones.</span></h2>
          </div>
          <p className="hidden max-w-[170px] pb-1 text-right text-xs leading-relaxed text-muted-foreground md:block">A selection of identities, marks, and other visual arguments.</p>
        </Reveal>
        <div className="grid gap-x-8 gap-y-20 md:grid-cols-2 md:gap-y-28">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={`reveal-delay-${(index % 3) + 1}`}>
              <article className={`project-card group ${index % 2 === 1 ? 'md:mt-28' : ''}`} data-testid={`card-project-${project.id}`}>
                <div className="relative overflow-hidden border border-foreground/10">
                  <ProjectArtwork project={project} />
                  <span className="absolute left-4 top-4 bg-accent px-2 py-1 font-mono-custom text-[9px] font-medium tracking-[.16em]">{project.stamp}</span>
                  <span className="absolute right-4 top-4 font-mono-custom text-[10px] text-foreground/60">{project.id}</span>
                </div>
                <div className="flex items-start justify-between border-b border-foreground/20 py-5">
                  <div>
                    <h3 className="font-display text-3xl font-bold tracking-[-.06em]">{project.title}</h3>
                    <p className="mt-2 text-xs text-muted-foreground">{project.type} <span className="mx-1 text-accent">/</span> {project.year}</p>
                    <p className="mt-4 max-w-[290px] text-sm leading-relaxed text-muted-foreground">{project.note}</p>
                  </div>
                  <button type="button" data-testid={`button-project-${project.id}`} className="project-arrow grid h-11 w-11 shrink-0 place-items-center border border-foreground group-hover:bg-accent" aria-label={`View ${project.title} project`}>
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-28 flex flex-col items-start justify-between gap-6 border-t border-foreground pt-6 md:flex-row md:items-center" delay="reveal-delay-2">
          <p className="max-w-lg font-display text-2xl font-medium leading-tight tracking-[-.04em] md:text-3xl">The best work usually starts with a good conversation.</p>
          <a href="#contact" data-testid="link-work-contact" className="group inline-flex items-center gap-3 bg-foreground px-5 py-3 text-xs font-bold uppercase tracking-[.1em] text-background transition-colors hover:bg-accent hover:text-foreground">
            Start a conversation <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-accent px-5 py-24 md:px-10 md:py-36">
      <div className="pointer-events-none absolute -right-20 top-0 font-display text-[22rem] font-bold leading-none tracking-[-.18em] text-foreground/10">?</div>
      <div className="relative mx-auto max-w-[1400px]">
        <Reveal className="flex items-center justify-between border-b border-foreground/30 pb-5">
          <p className="font-mono-custom text-[10px] uppercase tracking-[0.2em]">03 / Contact</p>
          <Asterisk size={20} />
        </Reveal>
        <div className="grid gap-14 py-16 md:py-24 lg:grid-cols-[1fr_310px]">
          <Reveal delay="reveal-delay-1">
            <h2 className="max-w-4xl font-display text-[clamp(4rem,11vw,11rem)] font-bold leading-[.76] tracking-[-.1em]">Have a<br /><span className="text-background">good idea?</span></h2>
          </Reveal>
          <Reveal delay="reveal-delay-2" className="flex flex-col justify-end">
            <p className="max-w-[270px] text-sm leading-relaxed">Tell me what you’re making, where you’re at, and what you want people to feel.</p>
            <a href="mailto:hello@bintar.studio" data-testid="link-email" className="group mt-7 flex items-center justify-between border-b-2 border-foreground py-3 text-sm font-bold">
              hello@bintar.studio <ArrowUpRight size={19} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </Reveal>
        </div>
        <Reveal className="flex flex-col justify-between gap-8 border-t border-foreground/30 pt-5 text-xs md:flex-row md:items-center" delay="reveal-delay-3">
          <div className="flex gap-6">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" data-testid="link-instagram" className="inline-flex items-center gap-2 font-bold uppercase tracking-[.12em] hover:underline"><Instagram size={15} /> Instagram</a>
            <a href="mailto:hello@bintar.studio" data-testid="link-footer-email" className="inline-flex items-center gap-2 font-bold uppercase tracking-[.12em] hover:underline"><Mail size={15} /> Email</a>
          </div>
          <p className="font-mono-custom text-[10px] uppercase tracking-[.12em]">Yogyakarta / Indonesia / 2025</p>
          <a href="#top" data-testid="link-back-top" className="inline-flex items-center gap-2 font-mono-custom text-[10px] uppercase tracking-[.12em] hover:underline">Back to top <ArrowUpRight size={14} /></a>
        </Reveal>
      </div>
    </section>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="site-shell min-h-[100dvh]">
      <Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero />
        <About />
        <Work />
        <Contact />
      </main>
      <footer className="flex items-center justify-between bg-foreground px-5 py-5 text-background md:px-10">
        <span className="font-mono-custom text-[9px] uppercase tracking-[.16em] text-background/50">© Bintar studio</span>
        <span className="font-mono-custom text-[9px] uppercase tracking-[.16em] text-background/50">Built with care</span>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;