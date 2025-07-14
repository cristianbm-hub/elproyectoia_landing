import React, { useState, useEffect, useCallback } from 'react';
import { Brain, Menu, X, MessageCircle } from 'lucide-react';

interface MinimalNavigationProps {
  onNewsletterOpen: () => void;
}

export const MinimalNavigation: React.FC<MinimalNavigationProps> = ({ onNewsletterOpen }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Actualizar la URL con el hash
      if (window.location.hash !== `#${id}`) {
        history.replaceState(null, '', `#${id}`);
      }
    }
    setIsMobileMenuOpen(false);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Limpiar el hash de la URL
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    setIsMobileMenuOpen(false);
  }, []);

  const handleWhatsAppJoin = () => {
    window.open('https://whatsapp.com/channel/0029VbAm1y9CsU9OC8QY9X0t', '_blank');
    setIsMobileMenuOpen(false);
  };

  const handleTelegramJoin = () => {
    window.open('https://t.me/+ETYWd_l_iIgzZDc0', '_blank');
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsVisible(scrolled);
      
      // Calcular progreso del scroll
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remover el #
      if (hash) {
        scrollToSection(hash);
      }
    };

    // Navegar a la sección si hay un hash en la URL al cargar
    const initialHash = window.location.hash.slice(1);
    if (initialHash) {
      // Pequeño delay para asegurar que el DOM está listo
      setTimeout(() => {
        scrollToSection(initialHash);
      }, 100);
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [scrollToSection]);

  return (
    <>
      {/* Navigation Bar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0 nav-blur-in' 
            : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
        aria-label="Navegación principal"
      >
        <div className="backdrop-blur-md bg-black/5 border-b border-white/5 nav-glow relative">
          {/* Indicador de progreso muy sutil */}
          <div 
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 transition-all duration-300 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <button
                onClick={scrollToTop}
                className="group flex items-center gap-2 transition-all duration-300 hover:scale-105"
                aria-label="Ir al inicio"
              >
                <div className="relative">
                  <Brain className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
                  <div className="absolute -inset-1 bg-blue-500/20 opacity-0 group-hover:opacity-100 blur-sm rounded-full transition-opacity duration-300" />
                </div>
                <span className="font-semibold text-sm bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  El Proyecto IA
                </span>
              </button>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-6">
                <button
                  onClick={() => scrollToSection('cursos')}
                  className="text-white/70 hover:text-white text-sm font-medium transition-all duration-300 hover:scale-105 relative group"
                  aria-label="Ver cursos"
                >
                  Cursos
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 group-hover:w-full transition-all duration-300" />
                </button>
                <button
                  onClick={() => scrollToSection('recursos')}
                  className="text-white/70 hover:text-white text-sm font-medium transition-all duration-300 hover:scale-105 relative group"
                  aria-label="Ver recursos"
                >
                  Recursos
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300" />
                </button>
                <button
                  onClick={handleWhatsAppJoin}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-600/80 to-green-700/80 backdrop-blur-sm px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:from-green-500/90 hover:to-green-600/90 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                  aria-label="Unirse al canal de WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </button>
                <button
                  onClick={handleTelegramJoin}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600/80 to-indigo-600/80 backdrop-blur-sm px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:from-blue-500/90 hover:to-indigo-500/90 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                  aria-label="Unirse al canal de Telegram"
                >
                  <MessageCircle className="w-4 h-4" />
                  Telegram
                </button>
                <button
                  onClick={onNewsletterOpen}
                  className="relative bg-gradient-to-r from-purple-600 to-pink-600 backdrop-blur-sm px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:from-purple-500 hover:to-pink-500 hover:shadow-[0_0_25px_rgba(147,51,234,0.6)] shadow-lg shadow-purple-500/25 border border-purple-400/20 overflow-hidden group"
                  aria-label="Unirse a la comunidad"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center gap-2">
                    ✨ Únete
                  </span>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg transition-all duration-300 hover:bg-white/10 relative group"
                aria-label="Abrir menú"
                aria-expanded={isMobileMenuOpen}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 blur-sm rounded-lg transition-opacity duration-300" />
                <div className="relative">
                  {isMobileMenuOpen ? (
                    <X className="w-5 h-5 text-white transition-transform duration-300 rotate-0" />
                  ) : (
                    <Menu className="w-5 h-5 text-white transition-transform duration-300 hover:scale-110" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 transition-all duration-500 md:hidden ${
          isMobileMenuOpen && isVisible
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <div className={`absolute top-16 left-4 right-4 bg-black/90 backdrop-blur-xl rounded-2xl border border-white/10 p-6 transition-all duration-500 ${
          isMobileMenuOpen && isVisible
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-4 opacity-0'
        }`}>
          <div className="space-y-4">
            <button
              onClick={() => scrollToSection('cursos')}
              className="block w-full text-left py-3 px-4 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              Cursos
            </button>
            <button
              onClick={() => scrollToSection('recursos')}
              className="block w-full text-left py-3 px-4 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              Recursos
            </button>
            <button
              onClick={handleWhatsAppJoin}
              className="flex items-center gap-2 w-full text-left py-3 px-4 rounded-xl bg-gradient-to-r from-green-600/20 to-green-700/20 text-green-300 hover:from-green-600/30 hover:to-green-700/30 transition-all duration-300 border border-green-500/20"
            >
              <MessageCircle className="w-4 h-4" />
              Canal de WhatsApp
            </button>
            <button
              onClick={handleTelegramJoin}
              className="flex items-center gap-2 w-full text-left py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-blue-300 hover:from-blue-600/30 hover:to-indigo-600/30 transition-all duration-300 border border-blue-500/20"
            >
              <MessageCircle className="w-4 h-4" />
              Canal de Telegram
            </button>
            <button
              onClick={() => {
                onNewsletterOpen();
                setIsMobileMenuOpen(false);
              }}
              className="relative flex items-center gap-2 w-full text-left py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-purple-200 hover:from-purple-600/40 hover:to-pink-600/40 transition-all duration-300 border border-purple-500/30 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center gap-2">
                ✨ Unirse a la comunidad
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}; 