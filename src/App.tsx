import React, { useState } from 'react';
import { Brain, Users, Lightbulb, ArrowRight, Sparkles, CircuitBoard, GraduationCap, Youtube, Instagram } from 'lucide-react';
import { NewsletterPopup } from './components/NewsletterPopup';
import { MinimalNavigation } from './components/MinimalNavigation';
import ResourcesGrid from './components/ResourcesGrid';
import CursosGrid from './components/CursosGrid';

function App() {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black text-white relative overflow-x-hidden">
      {/* Minimal Navigation */}
      <MinimalNavigation onNewsletterOpen={() => setIsNewsletterOpen(true)} />
      
      {/* Newsletter Popup */}
      <NewsletterPopup 
        isOpen={isNewsletterOpen} 
        onClose={() => setIsNewsletterOpen(false)} 
      />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-3xl animate-pulse -top-48 -left-24"></div>
        <div className="absolute w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-3xl animate-pulse delay-1000 top-96 -right-48"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,rgba(29,78,216,0.15),transparent)]"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzE5MkM0QSIgb3BhY2l0eT0iMC4xNSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
      </div>

      <main>
        {/* Hero Section */}
        <header id="inicio" className="container mx-auto px-4 py-32 relative">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-3xl" aria-hidden="true"></div>
          <div className="relative flex flex-col items-center text-center">
            <div className="relative mb-8" aria-hidden="true">
              <Brain className="w-32 h-32 text-blue-500 animate-pulse" aria-label="Icono de cerebro representando inteligencia artificial" />
              <div className="absolute -inset-4 bg-blue-500/20 blur-2xl rounded-full"></div>
              <Sparkles className="absolute -right-6 -top-6 w-10 h-10 text-yellow-400 animate-soft-bounce transition-transform duration-300" />
              <CircuitBoard className="absolute -left-6 -bottom-6 w-10 h-10 text-purple-400 animate-soft-bounce-delayed transition-transform duration-300" />
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-bold mb-8 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(59,130,246,0.5)] whitespace-nowrap">
              El Proyecto IA
            </h1>
            <p className="text-lg sm:text-2xl md:text-3xl text-blue-100 max-w-4xl mb-16 leading-relaxed">
              Navegando juntos hacia el futuro de la inteligencia artificial. 
              <span className="block mt-4 text-blue-400 font-light">Te guiamos para aprovechar las oportunidades del futuro digital.</span>
            </p>
            <nav className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto" aria-label="Navegación principal">
              <button 
                onClick={() => setIsNewsletterOpen(true)}
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 px-6 sm:px-10 py-3 sm:py-5 rounded-full text-lg sm:text-xl font-semibold flex items-center justify-center gap-3 transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(37,99,235,0.5)] hover:from-blue-500 hover:to-indigo-500 w-full sm:w-auto"
                aria-label="Unirse a la comunidad de El Proyecto IA"
              >
                Únete a la comunidad 
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>
              <button 
                onClick={() => document.getElementById('cursos')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 sm:px-10 py-3 sm:py-5 rounded-full text-lg sm:text-xl font-semibold border border-blue-900 hover:border-blue-700 hover:bg-blue-900/20 transition-all backdrop-blur-sm hover:shadow-[0_0_30px_rgba(37,99,235,0.2)] w-full sm:w-auto"
                aria-label="Navegar a la sección de cursos"
              >
                Ver Cursos
              </button>
              <button 
                onClick={() => document.getElementById('recursos')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 sm:px-10 py-3 sm:py-5 rounded-full text-lg sm:text-xl font-semibold border border-purple-900 hover:border-purple-700 hover:bg-purple-900/20 transition-all backdrop-blur-sm hover:shadow-[0_0_30px_rgba(147,51,234,0.2)] w-full sm:w-auto"
                aria-label="Navegar a la sección de recursos"
              >
                Descargar Recursos
              </button>
            </nav>
          </div>
        </header>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-32" aria-labelledby="features-heading">
          <h2 id="features-heading" className="sr-only">Características principales de El Proyecto IA</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <article className="group bg-gradient-to-b from-slate-900 to-black p-10 rounded-3xl backdrop-blur-xl border border-blue-900/50 hover:border-blue-500/50 transition-all hover:shadow-[0_0_50px_rgba(37,99,235,0.2)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-blue-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" aria-hidden="true"></div>
              <Users className="w-16 h-16 text-blue-500 mb-6" aria-hidden="true" />
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-blue-500 bg-clip-text text-transparent">Comunidad Activa</h3>
              <p className="text-lg text-blue-100">Conecta con profesionales y entusiastas de la IA, comparte experiencias y crece junto a otros.</p>
            </article>
            <article className="group bg-gradient-to-b from-slate-900 to-black p-10 rounded-3xl backdrop-blur-xl border border-purple-900/50 hover:border-purple-500/50 transition-all hover:shadow-[0_0_50px_rgba(147,51,234,0.2)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-purple-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" aria-hidden="true"></div>
              <GraduationCap className="w-16 h-16 text-purple-500 mb-6" aria-hidden="true" />
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-purple-500 bg-clip-text text-transparent">Formación Continua</h3>
              <p className="text-lg text-blue-100">Accede a recursos actualizados, workshops y mentorías para mantenerte al día con la tecnología.</p>
            </article>
            <article className="group bg-gradient-to-b from-slate-900 to-black p-10 rounded-3xl backdrop-blur-xl border border-indigo-900/50 hover:border-indigo-500/50 transition-all hover:shadow-[0_0_50px_rgba(99,102,241,0.2)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/0 via-indigo-600/5 to-indigo-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" aria-hidden="true"></div>
              <Lightbulb className="w-16 h-16 text-indigo-500 mb-6" aria-hidden="true" />
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-indigo-500 bg-clip-text text-transparent">Innovación Práctica</h3>
              <p className="text-lg text-blue-100">Aprende a implementar soluciones de IA en casos reales y proyectos prácticos.</p>
            </article>
          </div>
        </section>

        {/* Courses Grid Section */}
        <section id="cursos" className="container mx-auto px-4 py-32 relative" aria-labelledby="cursos-heading">
          <header className="text-center mb-20">
            <h2 id="cursos-heading" className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Nuestros Cursos
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Formación especializada para dominar las tecnologías del futuro
            </p>
          </header>
          
          <CursosGrid />
        </section>

        {/* Resources Section */}
        <section id="recursos" className="container mx-auto px-4 py-32 relative" aria-labelledby="recursos-heading">
          <header className="text-center mb-20">
            <h2 id="recursos-heading" className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Descargar Recursos
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Encuentra y descarga recursos útiles para potenciar tus proyectos con IA
            </p>
          </header>
          <ResourcesGrid />
        </section>

        {/* Stats Section */}
        <section className="py-40 relative" aria-labelledby="stats-heading">
          <h2 id="stats-heading" className="sr-only">Estadísticas del mercado de Inteligencia Artificial</h2>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-indigo-900/10 to-purple-900/10 skew-y-6" aria-hidden="true"></div>
          <div className="container mx-auto px-4 relative">
            <div className="grid md:grid-cols-3 gap-16 text-center">
              <article className="group">
                <div className="text-7xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-6 transition-all group-hover:scale-110 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">97M+</div>
                <div className="text-xl text-blue-100">Empleos en IA en 2025</div>
              </article>
              <article className="group">
                <div className="text-7xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-6 transition-all group-hover:scale-110 drop-shadow-[0_0_15px_rgba(147,51,234,0.5)]">89%</div>
                <div className="text-xl text-blue-100">Pymes implementando IA</div>
              </article>
              <article className="group">
                <div className="text-7xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent mb-6 transition-all group-hover:scale-110 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">8B</div>
                <div className="text-xl text-blue-100">Asistentes virtuales en el mundo</div>
              </article>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-32" aria-labelledby="cta-heading">
          <article className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-[3rem] p-20 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] opacity-5 bg-cover bg-center mix-blend-overlay" aria-hidden="true"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>
            <div className="relative z-10">
              <Sparkles className="w-16 h-16 text-blue-400 mx-auto mb-10" aria-hidden="true" />
              <h2 id="cta-heading" className="text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">¿Listo para el futuro?</h2>
              <p className="text-2xl text-blue-200 mb-16 max-w-3xl mx-auto leading-relaxed">
                Únete a El Proyecto IA y forma parte de una comunidad que está definiendo el futuro de la tecnología.
              </p>
              <button 
                onClick={() => setIsNewsletterOpen(true)}
                className="bg-gradient-to-r from-blue-400 to-indigo-400 px-16 py-8 rounded-full text-2xl font-semibold hover:from-blue-300 hover:to-indigo-300 transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(59,130,246,0.5)]"
                aria-label="Comenzar el viaje con El Proyecto IA"
              >
                Comienza tu viaje
              </button>
            </div>
          </article>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-blue-900/50 py-16 relative overflow-hidden" role="contentinfo">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent" aria-hidden="true"></div>
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Brain className="w-10 h-10 text-blue-500" aria-label="Logo de El Proyecto IA" />
                <div className="absolute -inset-2 bg-blue-500/20 blur-xl rounded-full" aria-hidden="true"></div>
              </div>
              <span className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">El Proyecto IA</span>
            </div>
            <nav className="flex gap-10" aria-label="Redes sociales">
              <a href="https://www.youtube.com/@ElProyectoIA" target="_blank" rel="noopener noreferrer" className="group relative" aria-label="Canal de YouTube de El Proyecto IA">
                <Youtube className="w-8 h-8 text-red-400 group-hover:text-red-300 cursor-pointer transition-colors" />
                <div className="absolute -inset-2 bg-red-500/20 opacity-0 group-hover:opacity-100 blur-xl rounded-full transition-opacity" aria-hidden="true"></div>
              </a>
              <a href="https://www.instagram.com/elproyectoia/" target="_blank" rel="noopener noreferrer" className="group relative" aria-label="Perfil de Instagram de El Proyecto IA">
                <Instagram className="w-8 h-8 text-pink-400 group-hover:text-pink-300 cursor-pointer transition-colors" />
                <div className="absolute -inset-2 bg-pink-500/20 opacity-0 group-hover:opacity-100 blur-xl rounded-full transition-opacity" aria-hidden="true"></div>
              </a>
              <a href="https://www.tiktok.com/@elproyectoia" target="_blank" rel="noopener noreferrer" className="group relative" aria-label="Perfil de TikTok de El Proyecto IA">
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-8 h-8 text-[#00F2EA] group-hover:text-[#00F2EA]/80 cursor-pointer transition-colors"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"/>
                </svg>
                <div className="absolute -inset-2 bg-[#00F2EA]/20 opacity-0 group-hover:opacity-100 blur-xl rounded-full transition-opacity" aria-hidden="true"></div>
              </a>
            </nav>
            <div className="text-blue-300 text-lg">
              © 2026 El Proyecto IA. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;