import React, { useState, useEffect } from 'react';
import { resourceService, Resource } from '../services/pocketbaseService';
import { Download, FileText, Wrench, BookOpen, Cpu, Search, X } from 'lucide-react';

// Función para obtener el icono apropiado según el tipo de recurso
const getResourceIcon = (type?: string) => {
  switch (type?.toLowerCase()) {
    case 'template':
    case 'plantilla':
      return <FileText className="w-8 h-8 text-white" />;
    case 'herramienta':
    case 'tool':
      return <Wrench className="w-8 h-8 text-white" />;
    case 'guia':
    case 'guía':
    case 'guide':
      return <BookOpen className="w-8 h-8 text-white" />;
    case 'ia':
    case 'ai':
      return <Cpu className="w-8 h-8 text-white" />;
    default:
      return <Download className="w-8 h-8 text-white" />;
  }
};

const ResourcesGrid: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar los recursos desde la API al montar el componente
  useEffect(() => {
    const fetchResources = async () => {
      setIsLoading(true);
      try {
        const data = await resourceService.getResources();
        setResources(data);
        setFilteredResources(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching resources:', error);
        setError('No se pudieron cargar los recursos. Por favor, intenta más tarde.');
      } finally {
        setIsLoading(false);
        setIsInitialLoad(false);
      }
    };

    fetchResources();
  }, []);

  // Filtrar recursos basado en el término de búsqueda
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredResources(resources);
    } else {
      const filtered = resources.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (resource.type && resource.type.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredResources(filtered);
    }
  }, [searchTerm, resources]);

  const clearSearch = () => {
    setSearchTerm('');
  };

  const openDownloadModal = (resource: Resource) => {
    setSelectedResource(resource);
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
      // Enviar datos al webhook de n8n
      const payload = {
        name: userName,
        email: userEmail,
        resource: selectedResource?.title,
        resource_type: selectedResource?.type || 'recurso',
        form_type: 'resource_download',
        source: 'resources_section'
      };

      console.log('📤 Enviando request al webhook:', {
        url: 'https://n8n.xrocket.app/webhook/6e153396-b27c-4078-a569-7aef8a2d7bfb',
        method: 'POST',
        payload: JSON.stringify(payload, null, 2)
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
            console.warn('Workflow error pero datos enviados:', errorData);
            // Los datos llegaron al webhook, continuar con la descarga
            return; // No lanzar error
          } else {
            errorMessage += `: ${errorData.message || 'Error al enviar los datos'}`;
          }
        } catch {
          errorMessage += ': Error de conexión con el servidor';
        }
        throw new Error(errorMessage);
      }
      
      // Iniciar la descarga del archivo
      if (selectedResource) {
        console.log('🔽 Iniciando descarga del recurso:', {
          title: selectedResource.title,
          downloadUrl: selectedResource.downloadUrl,
          type: selectedResource.type
        });

        if (!selectedResource.downloadUrl || selectedResource.downloadUrl.trim() === '') {
          console.error('❌ No hay URL de descarga disponible para este recurso');
          alert('Este recurso no tiene un archivo disponible para descargar.');
          return;
        }

        // Crear un enlace y simular un clic para descargar el archivo
        const link = document.createElement('a');
        
        // La URL ya viene procesada desde el servicio
        const downloadUrl = selectedResource.downloadUrl;
        link.href = downloadUrl;
        
        // Extraer el nombre del archivo de la URL
        const urlParts = downloadUrl.split('/');
        let fileName = urlParts[urlParts.length - 1];
        
        // Si fileName está vacío o no tiene extensión, usar el título del recurso formateado
        if (!fileName || !fileName.includes('.')) {
          // Intentar determinar la extensión basándose en el tipo de recurso
          let extension = '.zip'; // Por defecto
          if (selectedResource.type) {
            switch (selectedResource.type.toLowerCase()) {
              case 'template':
              case 'plantilla':
                extension = '.json';
                break;
              case 'guia':
              case 'guía':
                extension = '.pdf';
                break;
              case 'herramienta':
                extension = '.zip';
                break;
              default:
                extension = '.zip';
            }
          }
          fileName = selectedResource.title.replace(/\s+/g, '-').toLowerCase() + extension;
        }
        
        link.download = fileName;
        link.target = '_blank'; // Abrir en nueva pestaña como fallback
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('✅ Descarga iniciada:', {
          url: link.href,
          fileName: fileName,
          target: link.target
        });
      }
      
      // Cerrar el modal
      setShowModal(false);
      setUserEmail('');
      setUserName('');
      setSelectedResource(null);
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al procesar tu solicitud. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mostrar un estado de carga con esqueletos para mejorar UX durante la carga inicial
  if (isInitialLoad) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="relative bg-gradient-to-b from-slate-900 to-black rounded-3xl p-8 h-full border border-blue-900/30 animate-pulse">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-900/40 rounded-xl mr-4"></div>
                <div className="h-6 bg-blue-900/30 rounded-lg w-2/3"></div>
              </div>
              <div className="h-4 bg-blue-900/20 rounded w-full mb-2"></div>
              <div className="h-4 bg-blue-900/20 rounded w-5/6 mb-2"></div>
              <div className="h-4 bg-blue-900/20 rounded w-4/6 mb-8"></div>
              <div className="h-10 bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Mostrar un mensaje de error si ocurre algún problema
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[300px]">
        <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-6 max-w-md">
          <h3 className="text-xl font-semibold text-red-400 mb-2">Error</h3>
          <p className="text-white">{error}</p>
          <button 
            onClick={() => {
              setIsInitialLoad(true);
              window.location.reload();
            }}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Barra de búsqueda */}
      {!isLoading && resources.length > 0 && (
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar recursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-slate-800/80 border border-blue-900/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all backdrop-blur-sm"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Grid de recursos */}
      {!isLoading && resources.length === 0 ? (
        <div className="flex justify-center items-center min-h-[300px] bg-blue-900/10 rounded-3xl border border-blue-900/30 backdrop-blur-sm">
          <div className="text-center p-8">
            <Download className="w-16 h-16 text-blue-500 mx-auto mb-6 opacity-50" />
            <p className="text-xl text-blue-300 mb-2">No hay recursos disponibles</p>
            <p className="text-sm text-blue-400 max-w-md">
              En estos momentos no hay recursos publicados. ¡Vuelve pronto para ver nuestras novedades!
            </p>
          </div>
        </div>
      ) : filteredResources.length === 0 && searchTerm ? (
        <div className="flex justify-center items-center min-h-[300px] bg-blue-900/10 rounded-3xl border border-blue-900/30 backdrop-blur-sm">
          <div className="text-center p-8">
            <Search className="w-16 h-16 text-blue-500 mx-auto mb-6 opacity-50" />
            <p className="text-xl text-blue-300 mb-2">No se encontraron recursos</p>
            <p className="text-sm text-blue-400 max-w-md mb-4">
              No hay recursos que coincidan con "{searchTerm}". Intenta con otros términos de búsqueda.
            </p>
            <button
              onClick={clearSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Limpiar búsqueda
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((resource) => (
            <div key={resource.id} 
                className="group relative">
              <div className={`absolute inset-0.5 bg-gradient-to-r ${resource.color} rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-500`}></div>
              <div className="relative bg-gradient-to-b from-slate-900 to-black rounded-3xl p-8 h-full border border-blue-900/50 hover:border-blue-500/20 transition-all hover:shadow-[0_0_50px_rgba(37,99,235,0.3)] backdrop-blur-sm">
                <div className="flex items-center mb-6">
                  <div className={`mr-4 bg-gradient-to-br ${resource.color} rounded-xl p-3 bg-opacity-20 backdrop-blur-sm flex items-center justify-center w-12 h-12`}>
                    {getResourceIcon(resource.type)}
                  </div>
                  <h3 className={`text-2xl font-bold bg-gradient-to-r ${resource.color} bg-clip-text text-transparent`}>
                    {resource.title}
                  </h3>
                </div>
                <p className="text-blue-100 mb-8">{resource.description}</p>
                {resource.proximamente ? (
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
                    onClick={() => openDownloadModal(resource)}
                    className={`group bg-gradient-to-r ${resource.color} relative px-6 py-3 rounded-full text-white font-semibold transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] overflow-hidden w-full`}
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
      )}

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
                {selectedResource && (
                  <div className={`mr-4 bg-gradient-to-br ${selectedResource.color} rounded-xl p-3 bg-opacity-20 backdrop-blur-sm flex items-center justify-center w-12 h-12`}>
                    {getResourceIcon(selectedResource.type)}
                  </div>
                )}
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                    Descargar Recurso
                  </h3>
                  <p className="text-blue-300 mt-1">{selectedResource?.title}</p>
                </div>
              </div>
              
              <p className="text-blue-100 mb-6 bg-blue-900/20 p-4 rounded-xl border border-blue-900/50">
                Para descargar este recurso, por favor proporciona tu información de contacto:
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

export default ResourcesGrid; 