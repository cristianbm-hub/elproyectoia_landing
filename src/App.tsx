import React, { useState } from 'react';
import { Brain, Users, Lightbulb, ArrowRight, Globe2, Code2, GraduationCap, Sparkles, CircuitBoard, Youtube, Instagram, Bot, Cpu, Network, LineChart, Blocks, Radar } from 'lucide-react';
import { NewsletterPopup } from './components/NewsletterPopup';

function App() {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black text-white relative">
      {/* Newsletter Popup */}
      <NewsletterPopup 
        isOpen={isNewsletterOpen} 
        onClose={() => setIsNewsletterOpen(false)} 
      />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-3xl animate-pulse -top-48 -left-24"></div>
        <div className="absolute w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-3xl animate-pulse delay-1000 top-96 -right-48"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,rgba(29,78,216,0.15),transparent)]"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzE5MkM0QSIgb3BhY2l0eT0iMC4xNSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
      </div>

      {/* Hero Section */}
      <header className="container mx-auto px-4 py-32 relative">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-3xl"></div>
        <div className="relative flex flex-col items-center text-center">
          <div className="relative mb-8">
            <Brain className="w-32 h-32 text-blue-500 animate-pulse" />
            <div className="absolute -inset-4 bg-blue-500/20 blur-2xl rounded-full"></div>
            <Sparkles className="absolute -right-6 -top-6 w-10 h-10 text-yellow-400 animate-bounce" />
            <CircuitBoard className="absolute -left-6 -bottom-6 w-10 h-10 text-purple-400 animate-bounce delay-100" />
          </div>
          <h1 className="text-7xl md:text-9xl font-bold mb-8 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]">
            El Proyecto IA
          </h1>
          <p className="text-2xl md:text-3xl text-blue-100 max-w-4xl mb-16 leading-relaxed">
            Navegando juntos hacia el futuro de la inteligencia artificial. 
            <span className="block mt-4 text-blue-400 font-light">Te guiamos para aprovechar las oportunidades del futuro digital.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
            <button 
              onClick={() => setIsNewsletterOpen(true)}
              className="group bg-gradient-to-r from-blue-600 to-indigo-600 px-6 sm:px-10 py-3 sm:py-5 rounded-full text-lg sm:text-xl font-semibold flex items-center justify-center gap-3 transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(37,99,235,0.5)] hover:from-blue-500 hover:to-indigo-500 w-full sm:w-auto"
            >
              Únete a la comunidad 
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => document.getElementById('cursos')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 sm:px-10 py-3 sm:py-5 rounded-full text-lg sm:text-xl font-semibold border border-blue-900 hover:border-blue-700 hover:bg-blue-900/20 transition-all backdrop-blur-sm hover:shadow-[0_0_30px_rgba(37,99,235,0.2)] w-full sm:w-auto"
            >
              Ver Cursos
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-32">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="group bg-gradient-to-b from-slate-900 to-black p-10 rounded-3xl backdrop-blur-xl border border-blue-900/50 hover:border-blue-500/50 transition-all hover:shadow-[0_0_50px_rgba(37,99,235,0.2)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-blue-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <Users className="w-16 h-16 text-blue-500 mb-6" />
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-blue-500 bg-clip-text text-transparent">Comunidad Activa</h3>
            <p className="text-lg text-blue-100">Conecta con profesionales y entusiastas de la IA, comparte experiencias y crece junto a otros.</p>
          </div>
          <div className="group bg-gradient-to-b from-slate-900 to-black p-10 rounded-3xl backdrop-blur-xl border border-purple-900/50 hover:border-purple-500/50 transition-all hover:shadow-[0_0_50px_rgba(147,51,234,0.2)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-purple-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <GraduationCap className="w-16 h-16 text-purple-500 mb-6" />
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-purple-500 bg-clip-text text-transparent">Formación Continua</h3>
            <p className="text-lg text-blue-100">Accede a recursos actualizados, workshops y mentorías para mantenerte al día con la tecnología.</p>
          </div>
          <div className="group bg-gradient-to-b from-slate-900 to-black p-10 rounded-3xl backdrop-blur-xl border border-indigo-900/50 hover:border-indigo-500/50 transition-all hover:shadow-[0_0_50px_rgba(99,102,241,0.2)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/0 via-indigo-600/5 to-indigo-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <Lightbulb className="w-16 h-16 text-indigo-500 mb-6" />
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-indigo-500 bg-clip-text text-transparent">Innovación Práctica</h3>
            <p className="text-lg text-blue-100">Aprende a implementar soluciones de IA en casos reales y proyectos prácticos.</p>
          </div>
        </div>
      </section>

      {/* Courses Grid Section */}
      <section id="cursos" className="container mx-auto px-4 py-32 relative">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Nuestros Cursos
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Formación especializada para dominar las tecnologías del futuro
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Course 1 */}
          <div className="group relative">
            <div className="absolute inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-gradient-to-b from-slate-900 to-black border border-blue-900/50 rounded-3xl p-8 h-full hover:border-blue-500/50 transition-all">
              <div className="absolute top-4 right-4 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-blue-500/30">
                Próximamente
              </div>
              <Bot className="w-12 h-12 text-blue-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Fundamentos de IA</h3>
              <p className="text-blue-100 mb-6">Domina los conceptos básicos y principios fundamentales de la Inteligencia Artificial.</p>
              <div className="flex items-center gap-4 text-sm text-blue-300">
                <span>8 semanas</span>
                <span>•</span>
                <span>Inicial</span>
              </div>
            </div>
          </div>

          {/* Course 2 */}
          <div className="group relative">
            <div className="absolute inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-gradient-to-b from-slate-900 to-black border border-purple-900/50 rounded-3xl p-8 h-full hover:border-purple-500/50 transition-all">
              <div className="absolute top-4 right-4 bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-purple-500/30">
                Próximamente
              </div>
              <Cpu className="w-12 h-12 text-purple-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">Resolver Problemas con IA</h3>
              <p className="text-blue-100 mb-6">Aprende técnicas y herramientas para resolver problemas con IA en proyectos reales.</p>
              <div className="flex items-center gap-4 text-sm text-blue-300">
                <span>12 semanas</span>
                <span>•</span>
                <span>Proyectos prácticos</span>
              </div>
            </div>
          </div>

          {/* Course 3 */}
          <div className="group relative">
            <div className="absolute inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-gradient-to-b from-slate-900 to-black border border-indigo-900/50 rounded-3xl p-8 h-full hover:border-indigo-500/50 transition-all">
              <div className="absolute top-4 right-4 bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-indigo-500/30">
                Próximamente
              </div>
              <Network className="w-12 h-12 text-indigo-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">Automatizaciones</h3>
              <p className="text-blue-100 mb-6">Aprende a automatizar tareas y procesos con IA para aumentar la eficiencia.</p>
              <div className="flex items-center gap-4 text-sm text-blue-300">
                <span>10 semanas</span>
                <span>•</span>
                <span>Casos reales</span>
              </div>
            </div>
          </div>

          {/* Course 4 */}
          <div className="group relative">
            <div className="absolute inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-gradient-to-b from-slate-900 to-black border border-cyan-900/50 rounded-3xl p-8 h-full hover:border-cyan-500/50 transition-all">
              <div className="absolute top-4 right-4 bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-cyan-500/30">
                Próximamente
              </div>
              <LineChart className="w-12 h-12 text-cyan-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">Data Science para IA</h3>
              <p className="text-blue-100 mb-6">Análisis de datos y visualización para proyectos de Inteligencia Artificial.</p>
              <div className="flex items-center gap-4 text-sm text-blue-300">
                <span>8 semanas</span>
                <span>•</span>
                <span>Casos prácticos</span>
              </div>
            </div>
          </div>

          {/* Course 5 */}
          <div className="group relative">
            <div className="absolute inset-0.5 bg-gradient-to-r from-fuchsia-500 to-purple-500 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-gradient-to-b from-slate-900 to-black border border-fuchsia-900/50 rounded-3xl p-8 h-full hover:border-fuchsia-500/50 transition-all">
              <div className="absolute top-4 right-4 bg-fuchsia-500/20 text-fuchsia-300 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-fuchsia-500/30">
                Próximamente
              </div>
              <Blocks className="w-12 h-12 text-fuchsia-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-fuchsia-400 to-fuchsia-600 bg-clip-text text-transparent">IA Generativa</h3>
              <p className="text-blue-100 mb-6">Creación de contenido y modelos generativos con tecnologías de última generación.</p>
              <div className="flex items-center gap-4 text-sm text-blue-300">
                <span>6 semanas</span>
                <span>•</span>
                <span>Portfolio</span>
              </div>
            </div>
          </div>

          {/* Course 6 */}
          <div className="group relative">
            <div className="absolute inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-gradient-to-b from-slate-900 to-black border border-emerald-900/50 rounded-3xl p-8 h-full hover:border-emerald-500/50 transition-all">
              <div className="absolute top-4 right-4 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-emerald-500/30">
                Próximamente
              </div>
              <Radar className="w-12 h-12 text-emerald-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">IA en Producción</h3>
              <p className="text-blue-100 mb-6">Implementación y despliegue de modelos de IA en entornos productivos.</p>
              <div className="flex items-center gap-4 text-sm text-blue-300">
                <span>10 semanas</span>
                <span>•</span>
                <span>Proyecto real</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-40 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-indigo-900/10 to-purple-900/10 skew-y-6"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-3 gap-16 text-center">
            <div className="group">
              <div className="text-7xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-6 transition-all group-hover:scale-110 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">97M+</div>
              <div className="text-xl text-blue-100">Empleos en IA en 2025</div>
            </div>
            <div className="group">
              <div className="text-7xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-6 transition-all group-hover:scale-110 drop-shadow-[0_0_15px_rgba(147,51,234,0.5)]">89%</div>
              <div className="text-xl text-blue-100">Pymes implementando IA</div>
            </div>
            <div className="group">
              <div className="text-7xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent mb-6 transition-all group-hover:scale-110 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">8B</div>
              <div className="text-xl text-blue-100">Asistentes virtuales en el mundo</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-32">
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-[3rem] p-20 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] opacity-5 bg-cover bg-center mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <Sparkles className="w-16 h-16 text-blue-400 mx-auto mb-10" />
            <h2 className="text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">¿Listo para el futuro?</h2>
            <p className="text-2xl text-blue-200 mb-16 max-w-3xl mx-auto leading-relaxed">
              Únete a El Proyecto IA y forma parte de una comunidad que está definiendo el futuro de la tecnología.
            </p>
            <button 
              onClick={() => setIsNewsletterOpen(true)}
              className="bg-gradient-to-r from-blue-400 to-indigo-400 px-16 py-8 rounded-full text-2xl font-semibold hover:from-blue-300 hover:to-indigo-300 transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(59,130,246,0.5)]"
            >
              Comienza tu viaje
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-900/50 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Brain className="w-10 h-10 text-blue-500" />
                <div className="absolute -inset-2 bg-blue-500/20 blur-xl rounded-full"></div>
              </div>
              <span className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">El Proyecto IA</span>
            </div>
            <div className="flex gap-10">
              <a href="https://www.youtube.com/@ElProyectoIA" target="_blank" rel="noopener noreferrer" className="group relative">
                <Youtube className="w-8 h-8 text-red-400 group-hover:text-red-300 cursor-pointer transition-colors" />
                <div className="absolute -inset-2 bg-red-500/20 opacity-0 group-hover:opacity-100 blur-xl rounded-full transition-opacity"></div>
              </a>
              <a href="https://www.instagram.com/elproyectoia/" target="_blank" rel="noopener noreferrer" className="group relative">
                <Instagram className="w-8 h-8 text-pink-400 group-hover:text-pink-300 cursor-pointer transition-colors" />
                <div className="absolute -inset-2 bg-pink-500/20 opacity-0 group-hover:opacity-100 blur-xl rounded-full transition-opacity"></div>
              </a>
              <a href="https://www.tiktok.com/@elproyectoia" target="_blank" rel="noopener noreferrer" className="group relative">
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-8 h-8 text-[#00F2EA] group-hover:text-[#00F2EA]/80 cursor-pointer transition-colors"
                  fill="currentColor"
                >
                  <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"/>
                </svg>
                <div className="absolute -inset-2 bg-[#00F2EA]/20 opacity-0 group-hover:opacity-100 blur-xl rounded-full transition-opacity"></div>
              </a>
            </div>
            <div className="text-blue-300 text-lg">
              © 2025 El Proyecto IA. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;