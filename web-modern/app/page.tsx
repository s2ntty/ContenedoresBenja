"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useChatbot } from './hooks/useChatbot';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Custom Hook for Chatbot Logic
  const {
    isOpen: isChatOpen,
    toggleChat,
    messages,
    chatState,
    inputEnabled,
    handleOptionSelect,
    handleInputSubmit,
    scrollRef
  } = useChatbot();

  const [inputValue, setInputValue] = useState("");

  const slides = [
    { src: "/images/truck_real.jpg", alt: "Camión con contenedores Benja" },
    { src: "/images/container_1.png", alt: "Servicio de contenedores" },
    { src: "/images/container_2.png", alt: "Transporte de contenedores" },
  ];

  // Carousel Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const onChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleInputSubmit(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="font-outfit text-white bg-bg-dark min-h-screen selection:bg-primary selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-bg-dark/95 py-2 shadow-md'
          : 'bg-bg-dark/70 backdrop-blur-xl py-4 border-b border-white/10'
        }`}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex justify-between items-center">
          <div className="logo cursor-pointer" onClick={() => scrollToSection('inicio')}>
            <span className="font-bebas text-2xl md:text-3xl bg-gradient-to-r from-primary to-yellow-500 bg-clip-text text-transparent uppercase tracking-wider">
              Contenedores Benja
            </span>
          </div>
          <ul className="flex gap-4 md:gap-8 list-none hidden md:flex">
            <li><button onClick={() => scrollToSection('inicio')} className="text-white/75 hover:text-white transition-colors text-base font-medium relative group">Inicio<span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-0.5 bg-gradient-to-r from-primary to-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span></button></li>
            <li><Link href="/services" className="text-white/75 hover:text-white transition-colors text-base font-medium relative group">Servicio<span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-0.5 bg-gradient-to-r from-primary to-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span></Link></li>
            <li><button onClick={() => scrollToSection('nosotros')} className="text-white/75 hover:text-white transition-colors text-base font-medium relative group">Nosotros<span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-0.5 bg-gradient-to-r from-primary to-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span></button></li>
            <li><button onClick={() => scrollToSection('contacto')} className="text-white/75 hover:text-white transition-colors text-base font-medium relative group">Contacto<span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-0.5 bg-gradient-to-r from-primary to-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span></button></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Carousel */}
        <div className="absolute inset-0 z-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/40 z-10 bg-gradient-to-br from-black/70 to-black/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center max-w-[900px] px-8 animate-fade-in-up">
          <h1 className="font-bebas text-5xl md:text-8xl font-normal leading-[0.9] mb-6 flex flex-col uppercase tracking-widest text-transparent bg-clip-text">
            <span className="block bg-gradient-to-r from-primary to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(235,152,78,0.3)]">Contenedores</span>
            <span className="block bg-gradient-to-r from-primary to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(235,152,78,0.3)]">Benja</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/75 mb-12 font-light tracking-wide">
            Bateas, aridos y servicios de maquinaria
          </p>

          <Link href="/services" className="inline-flex items-center gap-6 px-8 py-6 bg-white/5 backdrop-blur-md border-[2px] border-white/10 rounded-2xl text-white no-underline transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
            <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-primary to-yellow-500 rounded-xl shrink-0 group-hover:rotate-12 group-hover:scale-110 transition-transform">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-1">Nuestros Servicios</h3>
              <p className="text-white/75 text-sm font-light">Descubre lo que podemos crear para ti</p>
            </div>
            <div className="text-primary transition-transform group-hover:translate-x-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Carousel Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full border-2 border-white/50 transition-all duration-300 ${idx === currentSlide ? 'bg-primary border-primary scale-125 shadow-[0_0_10px_var(--color-primary)]' : 'bg-white/30 hover:bg-white/50'
                }`}
            />
          ))}
        </div>
      </section>

      {/* Nosotros Section */}
      <section id="nosotros" className="py-24 px-4 md:px-8 bg-bg-darker relative">
        <div className="max-w-[1400px] mx-auto min-h-[calc(100vh-60px)] flex flex-col justify-center">
          <div className="text-center mb-12">
            <h2 className="font-bebas text-4xl md:text-5xl uppercase bg-gradient-to-r from-primary to-yellow-500 bg-clip-text text-transparent mb-2">Nosotros</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-yellow-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
            <div>
              <h3 className="text-2xl text-primary mb-3">Contenedores Benja</h3>
              <p className="text-white/75 mb-3 text-lg leading-relaxed">
                Somos una empresa dedicada al servicio de contenedores, transporte de áridos y alquiler de maquinaria pesada. Con años de experiencia en el sector de la construcción, nos especializamos en brindar soluciones eficientes y confiables para obras de todo tipo.
              </p>
              <p className="text-white/75 mb-6 text-lg leading-relaxed">
                Nuestro compromiso es ofrecer un servicio de calidad, puntual y profesional, adaptándonos a las necesidades específicas de cada proyecto. Contamos con equipamiento moderno y un equipo capacitado para garantizar la satisfacción de nuestros clientes.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                {[
                  { title: "Experiencia", text: "Años de trayectoria", icon: "✓" },
                  { title: "Confiabilidad", text: "Servicio puntual", icon: "✓" },
                  { title: "Equipamiento", text: "Maquinaria moderna", icon: "✓" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:border-primary/50 transition-colors">
                    <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-primary to-yellow-500 rounded-full font-bold text-white shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{item.title}</h4>
                      <p className="text-xs text-white/50">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <Image
                src="/images/truck_real.jpg"
                alt="Contenedores Benja Team"
                width={600}
                height={400}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/10 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto Section */}
      <section id="contacto" className="py-24 px-4 md:px-8 bg-bg-dark">
        <div className="max-w-[1400px] mx-auto min-h-[calc(100vh-60px)] flex flex-col justify-center">
          <div className="text-center mb-12">
            <h2 className="font-bebas text-4xl md:text-5xl uppercase bg-gradient-to-r from-primary to-yellow-500 bg-clip-text text-transparent mb-2">Contacto</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-yellow-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 gap-12 max-w-[1400px] mx-auto w-full">
            {/* Contact Form */}
            <div className="w-full">
              <h3 className="text-2xl text-center mb-5 font-semibold">Envíanos tu consulta</h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <div className="flex flex-col gap-2">
                  <label htmlFor="nombre" className="text-sm font-medium text-white/75">Nombre</label>
                  <input type="text" id="nombre" className="p-3 bg-surface border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all" placeholder="Tu nombre" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-white/75">Email</label>
                  <input type="email" id="email" className="p-3 bg-surface border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all" placeholder="tu@email.com" required />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label htmlFor="telefono" className="text-sm font-medium text-white/75">Teléfono</label>
                  <input type="tel" id="telefono" className="p-3 bg-surface border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all" placeholder="+54 297 ..." />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label htmlFor="mensaje" className="text-sm font-medium text-white/75">Mensaje</label>
                  <textarea id="mensaje" rows={3} className="p-3 bg-surface border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all resize-y min-h-[80px]" placeholder="Tu consulta..." required></textarea>
                </div>
                <button type="submit" className="md:col-span-2 flex items-center justify-center gap-3 py-3 px-6 bg-gradient-to-r from-primary to-yellow-500 rounded-xl text-white font-semibold shadow-md hover:-translate-y-1 hover:shadow-lg transition-all">
                  <span>Enviar</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-2xl text-center mb-5 font-semibold">Información de contacto</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "Teléfono", text: "297-4681748", icon: (<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>) },
                  { title: "Email", text: "info@contenedoresbenja.com", icon: (<> <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path> <polyline points="22,6 12,13 2,6"></polyline> </>) },
                  { title: "Ubicación", text: "Comodoro Rivadavia, Chubut", icon: (<> <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path> <circle cx="12" cy="10" r="3"></circle> </>) },
                  { title: "Horario", text: "Lun-Vie: 8-18 | Sab: 9-13", icon: (<> <circle cx="12" cy="12" r="10"></circle> <polyline points="12 6 12 12 16 14"></polyline> </>) }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center text-center gap-3 p-5 bg-white/5 rounded-xl border border-white/10 hover:border-primary hover:-translate-y-1 transition-all">
                    <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-primary to-yellow-500 rounded-lg text-white">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{item.icon}</svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white">{item.title}</h4>
                      <p className="text-sm text-white/75">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg-darker border-t border-white/10 py-12">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8 text-center md:text-left">
            <div>
              <h3 className="font-bebas text-3xl uppercase bg-gradient-to-r from-primary to-yellow-500 bg-clip-text text-transparent mb-2">Contenedores Benja</h3>
              <p className="text-white/75">Bateas, áridos y servicios de maquinaria</p>
            </div>
            <div className="text-center md:text-right">
              <h4 className="text-xl font-semibold mb-4">Contacto</h4>
              <p className="text-white/75 mb-1">Tel: 297-4681748</p>
              <p className="text-white/75">Email: info@contenedoresbenja.com</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-white/50 text-sm">&copy; 2026 Contenedores Benja. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col items-center gap-4">
        {/* WhatsApp */}
        <a href="https://wa.me/5492974309758" target="_blank" className="w-[50px] h-[50px] rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform order-1" title="Chat en WhatsApp">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-8.68-2.031-.967-.272-.297-.471-.446-.917-.446-.445 0-.965.174-1.46.719-.495.545-1.908 1.865-1.908 4.548 0 2.682 1.957 5.274 2.229 5.645.271.373 3.824 5.835 9.27 8.017 3.626 1.453 4.363 1.163 5.155 1.089.792-.074 1.758-.718 2.006-1.411.248-.694.248-1.289.173-1.413z" />
          </svg>
        </a>

        {/* Chatbot Toggle */}
        <button
          onClick={toggleChat}
          className="w-[60px] h-[60px] rounded-full bg-gradient-to-r from-primary to-yellow-500 border-none cursor-pointer flex items-center justify-center text-white transition-all duration-300 hover:scale-110 order-2 animate-pulse-slow shadow-[0_4px_20px_rgba(235,152,78,0.4)]"
        >
          {isChatOpen ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          )}
        </button>
      </div>

      {/* Chatbot Window */}
      <div className={`fixed bottom-[160px] right-5 w-[380px] max-w-[calc(100vw-40px)] h-[500px] bg-surface rounded-2xl shadow-xl border border-white/10 flex flex-col overflow-hidden transition-all duration-300 z-[9998] ${isChatOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-5 pointer-events-none'}`}>
        <div className="bg-gradient-to-r from-primary to-yellow-500 p-4 flex justify-between items-center shrink-0">
          <h3 className="text-white font-semibold m-0">Asistente Virtual</h3>
          <button onClick={toggleChat} className="bg-white/20 border-none text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">×</button>
        </div>

        <div className="p-4 flex-grow overflow-y-auto flex flex-col gap-4" ref={scrollRef}>
          {messages.map((msg, i) => (
            <div key={i} className={`flex max-w-[85%] ${msg.sender === 'user' ? 'self-end justify-end' : 'self-start'}`}>
              <p className={`p-3 text-sm border border-white/10 ${msg.sender === 'user'
                  ? 'bg-gradient-to-r from-primary to-yellow-500 text-white rounded-t-xl rounded-bl-xl'
                  : 'bg-surface-light text-white/90 rounded-t-xl rounded-br-xl'
                } `} dangerouslySetInnerHTML={{ __html: msg.text }} />
            </div>
          ))}

          {chatState === 'MENU' && (
            <div className="w-[90%] flex flex-col gap-2 self-start animate-fade-in-up">
              {[
                { id: 'bateas', label: "Bateas / Contenedores", icon: <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path> },
                { id: 'aridos', label: "Tierra / Áridos", icon: <> <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path> <circle cx="12" cy="10" r="3"></circle> </> },
                { id: 'maquinaria', label: "Mini Pala / Maquinaria", icon: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path> },
                { id: 'consultas', label: "Otras consultas", icon: <> <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path> <circle cx="12" cy="7" r="4"></circle> </> }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleOptionSelect(opt.label, opt.id)}
                  className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm hover:bg-white/10 hover:border-primary hover:translate-x-1 transition-all text-left"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary shrink-0">{opt.icon}</svg>
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-3 bg-black/20 border-t border-white/10 flex gap-2 shrink-0">
          <form onSubmit={onChatSubmit} className="flex gap-2 w-full">
            <input
              type="text"
              placeholder={inputEnabled ? "Escribe tu respuesta..." : "Selecciona una opción..."}
              disabled={!inputEnabled}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-grow bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              disabled={!inputEnabled || !inputValue.trim()}
              className="bg-gradient-to-r from-primary to-yellow-500 border-none w-9 h-9 rounded-full text-white flex items-center justify-center disabled:opacity-50 disabled:bg-gray-600 transition-all hover:scale-110"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}
