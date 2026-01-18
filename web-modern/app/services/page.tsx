"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useChatbot } from '../hooks/useChatbot';

export default function ServicesPage() {
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
            <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-dark/95 backdrop-blur-xl py-2 shadow-md border-b border-white/10 transition-all duration-300">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex justify-between items-center">
                    <div className="logo">
                        <Link href="/" className="font-bebas text-2xl md:text-3xl bg-gradient-to-r from-primary to-yellow-500 bg-clip-text text-transparent uppercase tracking-wider">
                            Contenedores Benja
                        </Link>
                    </div>
                    <ul className="flex gap-4 md:gap-8 list-none hidden md:flex">
                        <li><Link href="/" className="text-white/75 hover:text-white transition-colors text-base font-medium relative group">Inicio<span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-0.5 bg-gradient-to-r from-primary to-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span></Link></li>
                        <li><Link href="/services" className="text-white hover:text-white transition-colors text-base font-medium relative group">Servicio<span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-0.5 bg-gradient-to-r from-primary to-yellow-500 scale-x-100 transition-transform duration-300"></span></Link></li>
                        <li><Link href="/#nosotros" className="text-white/75 hover:text-white transition-colors text-base font-medium relative group">Nosotros<span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-0.5 bg-gradient-to-r from-primary to-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span></Link></li>
                        <li><Link href="/#contacto" className="text-white/75 hover:text-white transition-colors text-base font-medium relative group">Contacto<span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-0.5 bg-gradient-to-r from-primary to-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span></Link></li>
                    </ul>
                </div>
            </nav>

            {/* Header */}
            <div className="pt-32 pb-16 text-center bg-bg-darker">
                <div className="text-center mb-0">
                    <h1 className="font-bebas text-4xl md:text-6xl uppercase bg-gradient-to-r from-primary to-yellow-500 bg-clip-text text-transparent mb-2">Nuestros Servicios</h1>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-yellow-500 mx-auto rounded-full mb-6"></div>
                </div>
                <p className="mt-6 text-white/75 max-w-[600px] mx-auto text-lg leading-relaxed px-4">
                    Soluciones integrales para la construcción y el movimiento de suelos. Calidad y eficiencia en cada trabajo.
                </p>
            </div>

            {/* Services Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto px-4 md:px-8 pb-16">

                {/* Service 1 */}
                <article className="bg-surface rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(235,152,78,0.2)] flex flex-col group">
                    <div className="h-[250px] w-full relative overflow-hidden">
                        <Image
                            src="/images/truck_real.jpg"
                            alt="Bateas para desechar"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/10 pointer-events-none"></div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                        <h3 className="font-bebas text-3xl tracking-wider text-primary mb-4">Bateas de Desechos</h3>
                        <p className="text-white/75 mb-8 text-lg flex-grow">Servicio de bateas y volquetes para el retiro de escombros, limpieza de obras y residuos de construcción. Disponemos de diferentes tamaños para adaptarnos a la magnitud de tu proyecto.</p>
                        <Link href="/#contacto" className="mt-auto self-start text-white no-underline font-semibold inline-flex items-center gap-2 transition-all duration-300 hover:gap-4 hover:text-primary">
                            Solicitar Presupuesto
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </article>

                {/* Service 2 */}
                <article className="bg-surface rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(235,152,78,0.2)] flex flex-col group">
                    <div className="h-[250px] w-full relative overflow-hidden">
                        <Image
                            src="/images/camiones_aridos.png"
                            alt="Venta y transporte de áridos"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/10 pointer-events-none"></div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                        <h3 className="font-bebas text-3xl tracking-wider text-primary mb-4">Venta de Áridos</h3>
                        <p className="text-white/75 mb-8 text-lg flex-grow">Provisión y transporte de áridos de primera calidad: arena, piedra, tierra negra y relleno. Contamos con camiones propios para garantizar entregas puntuales directo a tu obra.</p>
                        <Link href="/#contacto" className="mt-auto self-start text-white no-underline font-semibold inline-flex items-center gap-2 transition-all duration-300 hover:gap-4 hover:text-primary">
                            Solicitar Presupuesto
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </article>

                {/* Service 3 */}
                <article className="bg-surface rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(235,152,78,0.2)] flex flex-col group">
                    <div className="h-[250px] w-full relative overflow-hidden">
                        <Image
                            src="/images/container_2.png"
                            alt="Servicio de Mini Pala"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/10 pointer-events-none"></div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                        <h3 className="font-bebas text-3xl tracking-wider text-primary mb-4">Servicio de Maquinaria</h3>
                        <p className="text-white/75 mb-8 text-lg flex-grow">Alquiler de mini pala cargadora (Bobcat) con operador. Ideal para movimiento de suelos en espacios reducidos, nivelación de terrenos, carga de escombros y limpieza de predios.</p>
                        <Link href="/#contacto" className="mt-auto self-start text-white no-underline font-semibold inline-flex items-center gap-2 transition-all duration-300 hover:gap-4 hover:text-primary">
                            Solicitar Presupuesto
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </article>

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
