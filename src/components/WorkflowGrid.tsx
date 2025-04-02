import React, { useState } from 'react';

interface Workflow {
  id: string;
  title: string;
  description: string;
  downloadUrl: string;
  color: string;
  proximamente: boolean;
}

const workflows: Workflow[] = [
  {
    id: '1',
    title: 'Template de Transcripción de Audio',
    description: 'Transcribe archivos de audio, resume con GPT-4 y almacena en Notion',
    downloadUrl: '/workflows/transcribe-audio-gpt-notion.json',
    color: 'from-blue-500 to-indigo-600',
    proximamente: false
  },
  {
    id: '2',
    title: 'Template de Email Marketing',
    description: 'Gestiona automáticamente tus campañas de email marketing y seguimiento.',
    downloadUrl: '/workflows/email-marketing.txt',
    color: 'from-purple-500 to-pink-600',
    proximamente: true
  },
  {
    id: '3',
    title: 'Template de Gestión de Tareas',
    description: 'Automatiza la creación y seguimiento de tareas en tu equipo.',
    downloadUrl: '/workflows/task-management.txt',
    color: 'from-emerald-500 to-cyan-600',
    proximamente: true
  }
];

const WorkflowGrid: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openDownloadModal = (workflow: Workflow) => {
    setSelectedWorkflow(workflow);
    setShowModal(true);
  };

  const handleDownload = async () => {
    if (!userName || !userEmail) {
      alert('Por favor, completa todos los campos');
      return;
    }

    // Simular carga
    setIsSubmitting(true);
    
    try {
      // Enviar datos al webhook
      const response = await fetch('https://n8n.xrocket.app/webhook/ae7d3761-03a1-4fa0-a19c-57924dbb2669', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          source: 'template_download',
          template: selectedWorkflow?.title
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar los datos');
      }
      
      // Iniciar la descarga del archivo
      if (selectedWorkflow) {
        // Crear un enlace y simular un clic para descargar el archivo
        const link = document.createElement('a');
        link.href = selectedWorkflow.downloadUrl;
        link.download = selectedWorkflow.title.replace(/\s+/g, '-').toLowerCase() + '.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      
      // Cerrar el modal
      setShowModal(false);
      setUserEmail('');
      setUserName('');
      setSelectedWorkflow(null);
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al procesar tu solicitud. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Grid de templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {workflows.map((workflow) => (
          <div key={workflow.id} 
               className="group relative">
            <div className={`absolute inset-0.5 bg-gradient-to-r ${workflow.color} rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-500`}></div>
            <div className="relative bg-gradient-to-b from-slate-900 to-black rounded-3xl p-8 h-full border border-blue-900/50 hover:border-blue-500/20 transition-all hover:shadow-[0_0_50px_rgba(37,99,235,0.3)] backdrop-blur-sm">
              <div className="flex items-center mb-6">
                <div className={`mr-4 bg-gradient-to-br ${workflow.color} rounded-xl p-3 bg-opacity-20 backdrop-blur-sm flex items-center justify-center w-12 h-12`}>
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4L8 8H3V16H8L12 20L16 16H21V8H16L12 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className={`text-2xl font-bold bg-gradient-to-r ${workflow.color} bg-clip-text text-transparent`}>
                  {workflow.title}
                </h3>
              </div>
              <p className="text-blue-100 mb-8">{workflow.description}</p>
              {workflow.proximamente ? (
                <button 
                  disabled
                  className="group bg-gradient-to-r from-gray-600 to-gray-700 relative px-6 py-3 rounded-full text-white font-semibold transition-all opacity-80 w-full cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Próximamente
                  </span>
                </button>
              ) : (
                <button 
                  onClick={() => openDownloadModal(workflow)}
                  className={`group bg-gradient-to-r ${workflow.color} relative px-6 py-3 rounded-full text-white font-semibold transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] overflow-hidden w-full`}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Descargar
                  </span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal de descarga */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50" onClick={() => !isSubmitting && setShowModal(false)}>
          <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"></div>
          <div 
            className="relative bg-gradient-to-b from-slate-900 to-black rounded-3xl border border-blue-500/30 overflow-hidden max-w-md w-full mx-4 shadow-[0_0_50px_rgba(37,99,235,0.4)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decoración del modal */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="p-8">
              <div className="flex items-center mb-6">
                {selectedWorkflow && (
                  <div className={`mr-4 bg-gradient-to-br ${selectedWorkflow.color} rounded-xl p-3 bg-opacity-20 backdrop-blur-sm flex items-center justify-center w-12 h-12`}>
                    <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4L8 8H3V16H8L12 20L16 16H21V8H16L12 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                )}
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                    Descargar Template
                  </h3>
                  <p className="text-blue-300 mt-1">{selectedWorkflow?.title}</p>
                </div>
              </div>
              
              <p className="text-blue-100 mb-6 bg-blue-900/20 p-4 rounded-xl border border-blue-900/50">
                Para descargar este template de n8n, por favor proporciona tu información de contacto:
              </p>
              
              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-blue-300 mb-1 ml-2">Nombre</label>
                  <input 
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    type="text" 
                    className="w-full px-4 py-3 bg-slate-800/80 border border-blue-900/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all"
                    placeholder="Tu nombre"
                  />
                </div>
                
                <div className="relative">
                  <label className="block text-sm font-medium text-blue-300 mb-1 ml-2">Email</label>
                  <input 
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    type="email" 
                    className="w-full px-4 py-3 bg-slate-800/80 border border-blue-900/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button 
                  onClick={() => !isSubmitting && setShowModal(false)}
                  className="px-6 py-3 text-blue-300 hover:text-white transition-colors disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleDownload}
                  disabled={isSubmitting}
                  className="group bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 rounded-full text-white font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] disabled:opacity-50 min-w-[140px]"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Procesando</span>
                    </>
                  ) : (
                    <span>Descargar</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowGrid; 