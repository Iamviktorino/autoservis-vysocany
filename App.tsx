
import React, { useState, useEffect, useRef } from 'react';
import { 
  Wrench, 
  Disc, 
  Car, 
  Cpu, 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  Menu, 
  X, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Send
} from 'lucide-react';
 import { SiMercedes, SiBmw, SiAudi, SiVolkswagen, SiSkoda, SiFord, SiToyota, SiHyundai } from "react-icons/si";
import { ServiceItem, PriceItem } from './types';

const PHONE_ZDENEK = "+420 602 388 800";
const PHONE_LINK_ZDENEK = "tel:+420602388800";
const PHONE_JAN = "+420 777 210 909";
const PHONE_LINK_JAN = "tel:+420777210909";
const ADDRESS = "Freyova 569/4, 190 00 Praha 9 - Vysočany";
const GOOGLE_REVIEWS_LINK = "https://www.google.com/maps/search/Autoservis+Vyso%C4%8Dany+Freyova+Praha";

const ORANGE = '#FF3E00';

// Modal content for each service (texty z 1. kroku)
const SERVICE_MODAL_CONTENT: Record<string, { intro: string; bullets: string[] }> = {
  mech: {
    intro: 'Komplexní péče, na kterou se můžete spolehnout – od drobné údržby po náročné opravy.',
    bullets: [
      'Záruční a pozáruční servis: Prohlídky vozů do 3,5 t',
      'Brzdový systém: Kompletní servis a přesné seřízení',
      'Podvozky a převodovky: Opravy, výměny čepů a tlumičů',
      'Speciality: Opravy po nehodách, výměna skel, STK příprava',
      'Doplňkové služby: Mytí vozu a seřízení světlometů',
      'Všechny značky: Servis vozů Škoda, VW, Audi, Mercedes a další',
    ],
  },
  pneu: {
    intro: 'Maximální bezpečnost a stabilita na každém kilometru.',
    bullets: [
      'Sezónní přezutí: Výměna pneu pro osobní vozy i dodávky',
      'Laserová geometrie: Špičkové seřízení kol a náprav',
      'Prodej a opravy: Zakoupení pneu a ALU kol, opravy defektů',
    ],
  },
  diag: {
    intro: 'Moderní technologie pro odhalení i těch nejsložitějších závad.',
    bullets: [
      'Počítačová diagnostika: Přesná lokalizace chyb u všech značek',
      'Autoelektrika: Opravy alternátorů, startérů a kabeláže',
      'Servis klimatizace: Čištění, dezinfekce a doplnění chladiva',
    ],
  },
  pujc: {
    intro: 'Zůstaňte v pohybu díky naší autopůjčovně. Nabízíme spolehlivé vícemístné i užitkové vozy pro vaše soukromé i pracovní cesty.',
    bullets: [
      'Vozový park: Renault a Mercedes (9 míst), Ford (6 míst) a užitkový Fiat Ducato',
      'Flexibilní pronájem: Možnost krátkodobého i dlouhodobého zapůjčení',
      'Individuální přístup: Pro stálé klienty našeho servisu nabízíme zvýhodněné ceny pronájmu',
    ],
  },
};

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: string | null;
  serviceTitle: string;
  serviceIcon: React.ReactNode;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, serviceId, serviceTitle, serviceIcon }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !serviceId) return null;
  const content = SERVICE_MODAL_CONTENT[serviceId];
  if (!content) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      {/* Overlay - darkened background */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal panel */}
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-sm border border-white/10 shadow-2xl"
        style={{ backgroundColor: '#0F0F0F' }}
      >
        <div className="p-8 md:p-10">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
            aria-label="Zavřít"
          >
            <X size={24} strokeWidth={2} />
          </button>
          <div className="pr-12">
            <div className="mb-6" style={{ color: ORANGE }}>{serviceIcon}</div>
            <h2 id="modal-title" className="text-2xl md:text-3xl font-heading font-black uppercase tracking-tight text-white mb-6">
              {serviceTitle}
            </h2>
            <p className="text-white/90 leading-relaxed mb-8 font-light">
              {content.intro}
            </p>
            <ul className="space-y-4">
              {content.bullets.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-white font-light">
                  <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full flex" style={{ backgroundColor: ORANGE }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Components
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Služby', href: '#sluzby' },
    { name: 'Ceník', href: '#cenik' },
    { name: 'O nás', href: '#o-nas' },
    { name: 'Kontakt', href: '#kontakt' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-[#0F0F0F]/95 backdrop-blur-xl border-b border-white/10 py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center space-x-2">
          <span className="text-xl md:text-2xl font-heading font-black tracking-tighter text-white uppercase italic">
            Autoservis <span className="text-brand-orange">Vysočany</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-xs font-bold hover:text-brand-orange transition-colors uppercase tracking-[0.2em] text-white/80 hover:text-white"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#rezervace" 
            className="bg-brand-orange hover:bg-white hover:text-brand-black text-white px-7 py-3 font-black text-xs transition-all uppercase tracking-[0.2em]"
          >
            Rezervovat
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={`fixed inset-0 bg-[#0F0F0F] z-40 transition-all duration-500 lg:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-10 px-6">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMenuOpen(false)}
              className="text-3xl font-heading font-black uppercase tracking-widest text-white hover:text-brand-orange transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#rezervace" 
            onClick={() => setIsMenuOpen(false)}
            className="w-full max-w-xs text-center bg-brand-orange py-5 font-black text-lg uppercase tracking-widest text-white"
          >
            Rezervovat termín
          </a>
        </div>
      </div>
    </nav>
  );
};

const Hero: React.FC = () => {
  const [heroProgress, setHeroProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const p = Math.min(1, Math.max(0, window.scrollY / 400));
      setHeroProgress(p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#1a1a1a]">
      {/* Background: moderní vůz (fallback barva #1a1a1a při chybě načtení) */}
      <div className="absolute inset-0 z-0 bg-[#1a1a1a]">
        <img 
          src="https://images.pexels.com/photos/4489749/pexels-photo-4489749.jpeg?auto=compress&cs=tinysrgb&w=1920" 
          alt="Moderní vůz - Autoservis Vysočany" 
          className="w-full h-full object-cover object-center scale-105 animate-slow-zoom"
          style={{ filter: `grayscale(${heroProgress})` }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: '#FF3E00', opacity: 0.12 * (1 - heroProgress) }} aria-hidden="true" />
        <div className="absolute inset-0 bg-black/70" aria-hidden="true" />
      </div>

      <div className="container mx-auto px-6 relative z-10 pb-40">
        <div className="max-w-4xl">
          <div className="inline-flex items-center space-x-3 bg-brand-orange/20 border border-brand-orange/40 px-4 py-1.5 mb-10 backdrop-blur-sm">
            <ShieldCheck className="text-brand-orange" size={18} />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-white">Certifikovaná kvalita & preciznost</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-heading font-black leading-[1.1] mb-8 uppercase tracking-tighter" style={{ color: '#FF3E00' }}>
            Prémiový servis <br /> 
            pro váš vůz <br />
            v srdci Prahy 9
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 mb-12 max-w-2xl leading-relaxed font-light">
            Profesionální diagnostika, rychlý servis a náhradní vozy. Jsme jen 5 minut od Galerie Fénix. Vaše auto si zaslouží špičkovou péči.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <a 
              href="#rezervace" 
              className="bg-brand-orange hover:bg-white hover:text-brand-black text-white px-10 py-5 font-black text-sm transition-all uppercase tracking-[0.2em] flex items-center justify-center group"
            >
              Rezervovat termín
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href={PHONE_LINK_ZDENEK} 
              className="border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white px-10 py-5 font-black text-sm transition-all uppercase tracking-[0.2em] flex items-center justify-center"
            >
              Volat: {PHONE_ZDENEK}
            </a>
          </div>
        </div>
      </div>

      {/* Trust bar at the bottom of hero - loga značek (hover jen na konkrétní logo) */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#0F0F0F]/95 backdrop-blur-md border-t border-white/5 py-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {[
              { alt: 'BMW', Icon: SiBmw },
              { alt: 'Audi', Icon: SiAudi },
              { alt: 'Volkswagen', Icon: SiVolkswagen },
              { alt: 'Škoda', Icon: SiSkoda },
              { alt: 'Mercedes-Benz', Icon: SiMercedes },
              { alt: 'Ford', Icon: SiFord },
              { alt: 'Toyota', Icon: SiToyota },
              { alt: 'Hyundai', Icon: SiHyundai },
            ].map(({ alt, Icon }) => (
              <div key={alt} className="w-12 h-12 flex items-center justify-center opacity-40 hover:opacity-100 transition-all cursor-pointer">
                <Icon size={32} aria-label={alt} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Services: React.FC = () => {
  const [openServiceId, setOpenServiceId] = useState<string | null>(null);
  const services: ServiceItem[] = [
    {
      id: 'mech',
      title: 'Mechanické opravy',
      description: 'Kompletní servis motorů, podvozků a brzdových systémů. Používáme špičkové náhradní díly a dbáme na transparentní ceny.',
      icon: <Wrench size={42} strokeWidth={1.5} />
    },
    {
      id: 'pneu',
      title: 'Pneuservis & Geometrie',
      description: 'Expresní přezutí, vyvážení a uskladnění pneumatik. Laserová geometrie kol pro přesné seřízení a bezpečnou jízdu.',
      icon: <Disc size={42} strokeWidth={1.5} />
    },
    {
      id: 'diag',
      title: 'Diagnostika & Elektro',
      description: 'Nejmodernější počítačová diagnostika pro přesnou lokalizaci závad u všech značek vozidel. Rychle zjistíme příčinu a navrhneme řešení.',
      icon: <Cpu size={42} strokeWidth={1.5} />
    },
    {
      id: 'pujc',
      title: 'Autopůjčovna & Mobilita',
      description: 'Zůstaňte v pohybu díky naší autopůjčovně. Spolehlivé vícemístné i užitkové vozy pro soukromé i pracovní cesty.',
      icon: <Car size={42} strokeWidth={1.5} />
    }
  ];

  return (
    <section id="sluzby" className="py-24 bg-[#0F0F0F]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-brand-orange font-black uppercase tracking-[0.4em] text-xs mb-4">Naše Specializace</h2>
          <h3 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter">Profesionální Služby</h3>
          <div className="w-24 h-1.5 bg-brand-orange mx-auto mt-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="group bg-[#121212] border border-white/5 p-10 transition-all duration-500 hover:border-brand-orange/40 hover:-translate-y-2"
            >
              <div className="text-brand-orange mb-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                {service.icon}
              </div>
              <h4 className="text-xl font-heading font-bold mb-5 uppercase tracking-tight text-white">{service.title}</h4>
              <p className="text-gray-400 leading-relaxed mb-8 font-light">
                {service.description}
              </p>
              <button
                type="button"
                onClick={() => setOpenServiceId(service.id)}
                className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange group-hover:text-white transition-colors"
              >
                Zjistit více <ChevronRight size={14} className="ml-1" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <ServiceModal
        isOpen={openServiceId !== null}
        onClose={() => setOpenServiceId(null)}
        serviceId={openServiceId}
        serviceTitle={services.find(s => s.id === openServiceId)?.title ?? ''}
        serviceIcon={services.find(s => s.id === openServiceId)?.icon ?? null}
      />
    </section>
  );
};

const TESTIMONIALS = [
  { name: 'Petr S.', text: 'Poctivý servis, kde mi vše srozumitelně vysvětlili. Oprava byla rychlá a za férovou cenu. Už nejezdím jinam.' },
  { name: 'Marek T.', text: 'Do Vysočan jezdím už roky. Oceňuji lidský přístup a to, že se na pány Přádu a Zycha mohu vždy spolehnout.' },
  { name: 'Lucie K.', text: 'Vynikající pneuservis. Geometrie udělána na počkání a auto sedí perfektně. Rozhodně doporučuji všem v okolí Devítky.' },
  { name: 'Jan M.', text: 'Skvělá komunikace a profesionální diagnostika. Našli závadu, se kterou si jinde nevěděli rady.' },
];

const Testimonials: React.FC = () => {
  return (
    <section id="recenze" className="py-24 bg-[#0F0F0F]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-brand-orange font-black uppercase tracking-[0.4em] text-xs mb-4">Co říkají zákazníci</h2>
          <h3 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter">Recenze</h3>
          <div className="w-24 h-1.5 bg-brand-orange mx-auto mt-8"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.name}
              className="bg-[#121212] border border-white/20 p-8 rounded-sm transition-transform duration-300 hover:scale-105"
            >
              <div className="flex gap-0.5 mb-5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={18} className="shrink-0" style={{ color: ORANGE }} fill={ORANGE} />
                ))}
              </div>
              <p className="text-gray-200 leading-relaxed mb-6 font-light italic">&bdquo;{item.text}&rdquo;</p>
              <p className="text-white font-bold text-sm uppercase tracking-wider">{item.name}</p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

const About: React.FC = () => {
  return (
    <section id="o-nas" className="py-24 bg-[#0F0F0F] border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-orange/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-stretch gap-20">
          <div className="lg:w-1/2 relative flex">
            <div className="w-full min-h-[380px] lg:min-h-0 lg:h-full overflow-hidden rounded-2xl flex-shrink-0">
              <AboutImage />
            </div>
            <a href="https://www.google.com/search?q=autoservis+a+pneuservis+-+auto Přáda,+půjčovna dodávek&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOW2ZH7zEaTqaMlha_edVE5XJhFgHR-qKtAIOsipwv8sLOn3ZqPps7rK6tFMUidK4TQv9ZRM%3D" target="_blank" rel="noopener noreferrer" className="absolute -bottom-10 -right-10 bg-brand-orange p-10 text-white shadow-2xl hidden md:block border border-white/20">
              <div className="flex items-center space-x-1 mb-3">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} fill="white" size={18} />)}
              </div>
              <div className="text-4xl font-black font-heading tracking-tighter mb-1">4.6+ RATING</div>
              <div className="text-[10px] uppercase font-black tracking-[0.3em] opacity-80">Google Business Reviews</div>
            </a>
          </div>
          
          <div className="lg:w-1/2">
            <h2 className="text-brand-orange font-black uppercase tracking-[0.4em] text-xs mb-4">Tradicí v Praze 9</h2>
            <h3 className="text-4xl md:text-6xl font-heading font-black uppercase mb-10 tracking-tighter leading-tight">Váš lokální expert <br/><span className="text-brand-orange">ve Vysočanech</span></h3>
            <p className="text-xl text-gray-300 mb-6 leading-relaxed font-light">
              Na trhu působíme již od roku 1994. Za více než 30 let jsme se stali synonymem pro poctivé řemeslo a spolehlivost ve Vysočanech.
            </p>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed font-light">
              Jsme tým odborníků, kteří věří, že servis auta musí být postaven na důvěře a preciznosti. Poskytujeme v Praze 9 služby, které kombinují moderní technologie a poctivé řemeslo.
            </p>
            
            <ul className="space-y-6 mb-12">
              {[
                'Transparentní komunikace o každém kroku opravy',
                'Nejmodernější vybavení pro vozy prémiových značek',
                'Zkušení mechanici s mezinárodní certifikací',
                'Skvělá dostupnost - 5 min od metra Vysočanská'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center space-x-4 text-gray-200">
                  <div className="bg-brand-orange/20 p-1.5 rounded-full">
                    <CheckCircle2 className="text-brand-orange" size={18} />
                  </div>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center space-x-12">
              <div>
                <div className="text-5xl font-heading font-black text-white tracking-tighter">1 500+</div>
                <div className="text-[10px] uppercase font-black text-gray-500 tracking-[0.2em] mt-2">Zakázek ročně</div>
              </div>
              <div className="w-px h-16 bg-white/10"></div>
              <div>
                <div className="text-5xl font-heading font-black text-white tracking-tighter">99%</div>
                <div className="text-[10px] uppercase font-black text-gray-500 tracking-[0.2em] mt-2">Spokojenost</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutImage: React.FC = () => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [p, setP] = useState(0);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const el = imgRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const ratio = Math.min(1, Math.max(0, (vh - r.top) / vh));
      setP(ratio);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const filter = hover ? 'none' : `grayscale(${1 - p}) saturate(${1 + p}) sepia(${0.3 * p}) hue-rotate(-10deg) brightness(${0.7 + 0.3 * p})`;
  return (
    <img
      ref={imgRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=800"
      alt="Autoservis Vysočany - dílna a tým"
      className="w-full h-full object-cover rounded-2xl transition-all duration-700"
      style={{ filter }}
    />
  );
};

const PriceList: React.FC = () => {
  const prices: PriceItem[] = [
    { service: 'Mechanické práce (všechny značky)', price: '450 – 650 Kč / hod' },
    { service: 'Pneuservis (přezutí kompletní sady)', price: 'od 600 Kč' },
    { service: 'Příprava na STK a emise (včetně vyřízení)', price: '1 500 – 2 500 Kč' },
    { service: 'Servis a plnění klimatizace', price: 'od 800 Kč' },
    { service: 'Počítačová diagnostika (profi software)', price: '600 Kč' },
    { service: 'Geometrie (test a seřízení náprav)', price: 'od 800 Kč' },
  ];

  return (
    <section id="cenik" className="py-24 bg-[#0F0F0F]">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-brand-orange font-black uppercase tracking-[0.4em] text-xs mb-4">Transparentnost</h2>
            <h3 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter">Orientační Ceník</h3>
            <p className="text-gray-400 mt-6 italic font-light">Ceny jsou uváděny bez materiálu a náhradních dílů.</p>
          </div>

          <div className="bg-[#121212] border border-white/5 shadow-2xl">
            {prices.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center p-8 border-b border-white/5 hover:bg-brand-orange/[0.03] transition-colors group">
                <span className="font-bold text-lg text-white group-hover:text-brand-orange transition-colors">{item.service}</span>
                <span className="font-heading font-black text-brand-orange text-xl">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Reservation: React.FC = () => {
  return (
    <section id="rezervace" className="py-24 bg-[#0F0F0F] relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto bg-[#0F0F0F] border border-white/10 flex flex-col lg:flex-row overflow-hidden shadow-2xl">
          <div className="lg:w-1/2 p-12 lg:p-20 bg-brand-orange text-white">
            <h3 className="text-4xl md:text-5xl font-heading font-black uppercase mb-8 leading-tight">Rezervujte si termín online</h3>
            <p className="text-white/80 text-lg mb-12 leading-relaxed font-light">
              Napište nám preferredovaný čas a typ servisu. Ozveme se vám zpět do 30 minut s potvrzením.
            </p>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-lg"><Calendar size={24} /></div>
                <span className="font-bold text-lg">Garance termínu do 48h</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-lg"><MapPin size={24} /></div>
                <span className="font-bold text-lg">Lokalita: 5 min od metra Vysočanská</span>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 p-12 lg:p-20">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 mb-2">Jméno a příjmení</label>
                  <input type="text" className="w-full bg-[#161616] border border-white/10 p-4 text-white focus:border-brand-orange outline-none transition-colors" placeholder="Jan Novák" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 mb-2">Telefonní číslo</label>
                  <input type="tel" className="w-full bg-[#161616] border border-white/10 p-4 text-white focus:border-brand-orange outline-none transition-colors" placeholder="+420 000 000 000" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 mb-2">E-mail</label>
                <input type="email" className="w-full bg-[#161616] border border-white/10 p-4 text-white focus:border-brand-orange outline-none transition-colors" placeholder="vas@email.cz" />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 mb-2">Jaký servis potřebujete?</label>
                <textarea rows={4} className="w-full bg-[#161616] border border-white/10 p-4 text-white focus:border-brand-orange outline-none transition-colors" placeholder="Výměna oleje, kontrola brzd..."></textarea>
              </div>
              <button className="w-full bg-brand-orange hover:bg-white hover:text-brand-black text-white font-black py-5 uppercase tracking-[0.3em] transition-all flex items-center justify-center group">
                Odeslat poptávku
                <Send size={18} className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact: React.FC = () => {
  return (
    <section id="kontakt" className="py-24 bg-[#0F0F0F]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-24 items-start">
          <div className="lg:w-2/5">
            <h2 className="text-brand-orange font-black uppercase tracking-[0.4em] text-xs mb-4">Kde nás najdete</h2>
            <h3 className="text-4xl md:text-6xl font-heading font-black uppercase mb-16 tracking-tighter">Jsme Vám <br/><span className="text-brand-orange">nablízku</span></h3>
            
            <div className="space-y-12">
              <div className="flex items-start space-x-8">
                <div className="bg-[#161616] p-5 border border-white/10">
                  <MapPin className="text-brand-orange" size={28} />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-3 text-gray-400">Adresa</h4>
                  <p className="text-white text-2xl font-bold leading-tight">{ADDRESS}</p>
                </div>
              </div>

              <div className="flex items-start space-x-8">
                <div className="bg-[#161616] p-5 border border-white/10">
                  <Clock className="text-brand-orange" size={28} />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-3 text-gray-400">Provozní doba</h4>
                  <p className="text-white text-2xl font-bold leading-tight">Po – Pá: 08:00 – 18:00<br />So: 09:00 – 13:00</p>
                </div>
              </div>

              <div className="flex items-start space-x-8">
                <div className="bg-[#161616] p-5 border border-white/10">
                  <Phone className="text-brand-orange" size={28} />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-3 text-gray-400">Kontaktní osoby</h4>
                  <div className="space-y-3 mt-2">
                    <a href={PHONE_LINK_ZDENEK} className="block text-xl md:text-2xl font-heading font-black text-white hover:text-brand-orange transition-colors tracking-tighter">
                      Zdeněk Přáda: {PHONE_ZDENEK}
                    </a>
                    <a href={PHONE_LINK_JAN} className="block text-xl md:text-2xl font-heading font-black text-white hover:text-brand-orange transition-colors tracking-tighter">
                      Jan Zych: {PHONE_JAN}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-3/5 w-full h-[600px] bg-[#0F0F0F] border border-white/10 relative overflow-hidden group shadow-2xl">
            {/* Dark Styled Map Area */}
            <div className="absolute inset-0 flex items-center justify-center bg-[#0F0F0F] overflow-hidden">
               {/* Patterned Background for Map Placeholder */}
               <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
               <div className="text-center px-10 relative z-10">
                  <div className="relative mb-8 inline-block">
                    <div className="absolute inset-0 bg-brand-orange blur-3xl opacity-20 scale-150"></div>
                    <MapPin size={80} className="text-brand-orange mx-auto relative z-10 animate-bounce" />
                  </div>
                  <p className="text-3xl font-heading font-black uppercase mb-6 tracking-tighter text-white">Navigovat k nám</p>
                  <p className="text-gray-400 max-w-sm mx-auto mb-10 text-lg leading-relaxed font-light">Náš autoservis najdete na hlavní tepně Prahy 9, jen pár minut od Galerie Fénix a metra Vysočanská.</p>
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-white text-brand-black px-12 py-5 uppercase font-black text-sm hover:bg-brand-orange hover:text-white transition-all tracking-[0.3em]"
                  >
                    Otevřít v navigaci
                  </a>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F0F0F] py-20 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-10">
          <div>
            <span className="text-2xl font-heading font-black tracking-tighter text-white uppercase italic">
              Autoservis <span className="text-brand-orange">Vysočany</span>
            </span>
            <p className="text-gray-500 text-xs mt-4 font-black tracking-[0.3em] uppercase">Váš partner pro mobilitu v Praze 9.</p>
            <p className="text-gray-500 text-xs mt-3 font-bold tracking-wide">IČO: 62462679</p>
            <p className="text-gray-500 text-xs mt-1 font-bold tracking-wide">Provozovna: {ADDRESS}</p>
          </div>
          
          <div className="flex flex-wrap gap-x-12 gap-y-6"></div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-6">
          <p className="text-gray-600 text-[10px] uppercase font-bold tracking-[0.2em]">© 2026 Autoservis Vysočany. Všechna práva vyhrazena.</p>
          <div className="flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-white transition-colors uppercase text-[10px] font-bold tracking-[0.2em]">Ochrana údajů</a>
            <a href="#" className="text-gray-600 hover:text-white transition-colors uppercase text-[10px] font-bold tracking-[0.2em]">VOP</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen font-sans selection:bg-brand-orange selection:text-white bg-[#0F0F0F]">
      <Header />
      <Hero />
      <Services />
      <Testimonials />
      <About />
      <PriceList />
      <Reservation />
      <Contact />
      <Footer />

      {/* Persistent Mobile CTA for high conversion */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#0F0F0F]/95 backdrop-blur-xl border-t border-white/10 flex space-x-3">
        <a 
          href={PHONE_LINK_ZDENEK} 
          className="flex-1 bg-white text-black py-4 font-black text-center uppercase tracking-widest text-[10px] flex items-center justify-center border border-white"
        >
          <Phone size={14} className="mr-2" /> Volat
        </a>
        <a 
          href="#rezervace" 
          className="flex-1 bg-brand-orange text-white py-4 font-black text-center uppercase tracking-widest text-[10px] flex items-center justify-center"
        >
          Rezervovat
        </a>
      </div>
    </div>
  );
};

export default App;
