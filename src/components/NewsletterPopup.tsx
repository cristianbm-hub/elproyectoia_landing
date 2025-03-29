import React, { useState } from 'react';
import { X, Mail, Sparkles, ArrowRight, User, AlertCircle } from 'lucide-react';

interface NewsletterPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewsletterPopup({ isOpen, onClose }: NewsletterPopupProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      console.log('Enviando datos:', { name, email, newsletter: true });
      
      const response = await fetch('https://n8n.xrocket.app/webhook/ae7d3761-03a1-4fa0-a19c-57924dbb2669', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          newsletter: true
        }),
      });

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${data.message || 'Error al enviar los datos'}`);
      }

      setIsSuccess(true);
      setName('');
      setEmail('');
      
      // Cerrar el popup después de 2 segundos
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error detallado:', error);
      setError(error instanceof Error ? error.message : 'Hubo un error al enviar los datos. Por favor, intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-1 xs:p-2 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-[calc(100%-2rem)] xs:w-[calc(100%-3rem)] sm:w-[calc(100%-4rem)] max-w-[95%] xs:max-w-[90%] sm:max-w-md mx-auto my-4 bg-gradient-to-b from-slate-900 to-black border border-blue-500/30 rounded-xl xs:rounded-2xl sm:rounded-3xl p-2 xs:p-3 sm:p-6 shadow-[0_0_50px_rgba(59,130,246,0.3)]">
        {/* Botón de cerrar */}
        <button 
          onClick={onClose}
          className="absolute top-1 right-1 xs:top-2 xs:right-2 sm:top-3 sm:right-3 text-blue-400 hover:text-blue-300 transition-colors z-20"
        >
          <X className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Contenido */}
        <div className="text-center">
          <div className="relative inline-block mb-2 xs:mb-3 sm:mb-4">
            <Mail className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 text-blue-500" />
            <div className="absolute -inset-1.5 xs:-inset-2 sm:-inset-3 bg-blue-500/20 blur-2xl rounded-full"></div>
            <Sparkles className="absolute -right-0.5 -top-0.5 xs:-right-1 xs:-top-1 sm:-right-1.5 sm:-top-1.5 w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-yellow-400 animate-bounce" />
          </div>

          <h2 className="text-lg xs:text-xl sm:text-2xl font-bold mb-1 xs:mb-2 sm:mb-3 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            ¡Únete a nuestra comunidad!
          </h2>

          <p className="text-xs xs:text-sm sm:text-base text-blue-100 mb-3 xs:mb-4 sm:mb-6">
            Recibe las últimas novedades sobre IA, cursos gratuitos y oportunidades laborales en el sector.
          </p>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-2 xs:space-y-3 sm:space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-2 py-1.5 xs:px-3 xs:py-2 sm:px-4 sm:py-3 rounded-lg flex items-center gap-1.5 xs:gap-2 text-xs xs:text-sm sm:text-base">
                  <AlertCircle className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                  <span>{error}</span>
                </div>
              )}
              
              <div className="relative">
                <div className="absolute left-2.5 xs:left-3 sm:left-4 top-1/2 -translate-y-1/2 text-blue-400">
                  <User className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  className="w-full pl-7 xs:pl-8 sm:pl-10 pr-2.5 xs:pr-3 sm:pr-4 py-1.5 xs:py-2 sm:py-3 bg-slate-900/50 border border-blue-500/30 rounded-full text-xs xs:text-sm sm:text-base text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all relative z-10"
                  required
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 rounded-full blur-xl"></div>
              </div>

              <div className="relative">
                <div className="absolute left-2.5 xs:left-3 sm:left-4 top-1/2 -translate-y-1/2 text-blue-400">
                  <Mail className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu correo electrónico"
                  className="w-full pl-7 xs:pl-8 sm:pl-10 pr-2.5 xs:pr-3 sm:pr-4 py-1.5 xs:py-2 sm:py-3 bg-slate-900/50 border border-blue-500/30 rounded-full text-xs xs:text-sm sm:text-base text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all relative z-10"
                  required
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 rounded-full blur-xl"></div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full bg-gradient-to-r from-blue-600 to-indigo-600 px-3 xs:px-4 sm:px-6 py-1.5 xs:py-2 sm:py-3 rounded-full text-sm xs:text-base sm:text-lg font-semibold flex items-center justify-center gap-1.5 xs:gap-2 sm:gap-3 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="animate-spin">⚡</span>
                ) : (
                  <>
                    Suscribirse
                    <ArrowRight className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-3 xs:py-4 sm:py-6">
              <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2 xs:mb-3 sm:mb-4">
                <svg className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-base xs:text-lg sm:text-xl font-bold text-green-400 mb-0.5 xs:mb-1 sm:mb-2">¡Gracias por unirte!</h3>
              <p className="text-xs xs:text-sm sm:text-base text-blue-100">Pronto recibirás nuestras novedades.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 