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
      const payload = {
        name,
        email,
        newsletter: true,
        form_type: 'newsletter_subscription',
        source: 'newsletter_popup'
      };
      console.log('Enviando datos al webhook:', payload);
      
      console.log('📤 Enviando request:', {
        url: 'https://n8n.xrocket.app/webhook/6e153396-b27c-4078-a569-7aef8a2d7bfb',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload, null, 2)
      });

      const response = await fetch('https://n8n.xrocket.app/webhook/6e153396-b27c-4078-a569-7aef8a2d7bfb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('📥 Response status:', response.status);
      console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        let errorMessage = `Error ${response.status}`;
        try {
          const errorData = await response.json();
          if (response.status === 404 && errorData.message?.includes('webhook')) {
            errorMessage = 'El formulario está en configuración. Por favor, intenta en unos minutos.';
          } else if (response.status === 500 && errorData.message?.includes('Workflow')) {
            errorMessage = 'Datos recibidos correctamente. Procesando tu solicitud...';
            // Para error 500 de workflow, asumimos éxito ya que los datos llegaron
            console.warn('Workflow error pero datos enviados:', errorData);
            return; // Salir sin lanzar error
          } else {
            errorMessage += `: ${errorData.message || 'Error al enviar los datos'}`;
          }
        } catch {
          errorMessage += ': Error de conexión con el servidor';
        }
        throw new Error(errorMessage);
      }

      // Solo intentar parsear JSON si la respuesta es exitosa
      let data;
      try {
        data = await response.json();
      } catch {
        // Si no hay JSON válido, asumimos éxito si el status es OK
        data = { success: true };
      }
      console.log('Respuesta del servidor:', data);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-[calc(100%-1rem)] sm:w-[calc(100%-4rem)] max-w-[95%] sm:max-w-md mx-auto my-4 bg-gradient-to-b from-slate-900 to-black border border-blue-500/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-[0_0_50px_rgba(59,130,246,0.3)]">
        {/* Botón de cerrar */}
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 text-blue-400 hover:text-blue-300 transition-colors z-20"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Contenido */}
        <div className="text-center">
          <div className="relative inline-block mb-3 sm:mb-4">
            <Mail className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500" />
            <div className="absolute -inset-2 sm:-inset-3 bg-blue-500/20 blur-2xl rounded-full"></div>
            <Sparkles className="absolute -right-1 -top-1 sm:-right-1.5 sm:-top-1.5 w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 animate-bounce" />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            ¡Únete a nuestra comunidad!
          </h2>

          <p className="text-sm sm:text-base text-blue-100 mb-4 sm:mb-6">
            Recibe las últimas novedades sobre IA, cursos gratuitos y oportunidades laborales en el sector.
          </p>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-3 py-2 sm:px-4 sm:py-3 rounded-lg flex items-center gap-2 text-sm sm:text-base">
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{error}</span>
                </div>
              )}
              
              <div className="relative">
                <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-blue-400">
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 bg-slate-900/50 border border-blue-500/30 rounded-full text-sm sm:text-base text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all relative z-10"
                  required
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 rounded-full blur-xl"></div>
              </div>

              <div className="relative">
                <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-blue-400">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu correo electrónico"
                  className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 bg-slate-900/50 border border-blue-500/30 rounded-full text-sm sm:text-base text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all relative z-10"
                  required
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 rounded-full blur-xl"></div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-base sm:text-lg font-semibold flex items-center justify-center gap-2 sm:gap-3 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="animate-spin">⚡</span>
                ) : (
                  <>
                    Suscribirse
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-4 sm:py-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-green-400 mb-1 sm:mb-2">¡Gracias por unirte!</h3>
              <p className="text-sm sm:text-base text-blue-100">Pronto recibirás nuestras novedades.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 