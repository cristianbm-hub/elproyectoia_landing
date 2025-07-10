import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { resourceService, Resource } from '../services/pocketbaseService';
import { Download, FileText, Wrench, BookOpen, Cpu, Search, X, ChevronDown } from 'lucide-react';

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

// Tipos para ordenamiento y filtros
type SortOption = 'relevance' | 'name-asc' | 'name-desc' | 'type';
type FilterType = 'all' | 'template' | 'herramienta' | 'guia' | 'ia';

const ResourcesGrid: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Debouncing para la búsqueda
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Cargar los recursos desde la API al montar el componente
  useEffect(() => {
    const fetchResources = async () => {
      setIsLoading(true);
      try {
        const data = await resourceService.getResources();
        setResources(data);
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

  // Algoritmo de distancia de edición simplificado
  const getEditDistance = useCallback((a: string, b: string): number => {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }, []);

  // Función para calcular similitud entre strings (algoritmo simple)
  const getStringSimilarity = useCallback((a: string, b: string): number => {
    const longer = a.length > b.length ? a : b;
    const shorter = a.length > b.length ? b : a;
    const editDistance = getEditDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }, [getEditDistance]);

  // Función de búsqueda inteligente mejorada
  const getSearchScore = useCallback((resource: Resource, searchTerms: string[]) => {
    let score = 0;
    const title = resource.title.toLowerCase();
    const description = resource.description.toLowerCase();
    const type = (resource.type || '').toLowerCase();

    searchTerms.forEach(term => {
      // Búsqueda exacta en título (mayor peso)
      if (title.includes(term)) {
        score += title === term ? 100 : title.startsWith(term) ? 50 : 20;
      }
      
      // Búsqueda en descripción (peso medio)
      if (description.includes(term)) {
        score += description.startsWith(term) ? 15 : 10;
      }
      
      // Búsqueda en tipo (peso menor)
      if (type.includes(term)) {
        score += type === term ? 30 : 15;
      }

      // Búsqueda flexible (términos similares)
      const similarity = getStringSimilarity(term, title);
      if (similarity > 0.6) {
        score += similarity * 10;
      }
    });

    return score;
  }, [getStringSimilarity]);

  // Obtener tipos únicos de recursos para filtros
  const availableTypes = useMemo(() => {
    const types = [...new Set(resources.map(r => r.type?.toLowerCase()).filter(Boolean))];
    return types.map(type => ({
      value: type as FilterType,
      label: type === 'template' ? 'Plantillas' :
             type === 'herramienta' ? 'Herramientas' :
             type === 'guia' || type === 'guía' ? 'Guías' :
             type === 'ia' ? 'IA' : type ? (type.charAt(0).toUpperCase() + type.slice(1)) : 'Otros',
      count: resources.filter(r => r.type?.toLowerCase() === type).length
    }));
  }, [resources]);

  // Filtrar y ordenar recursos con la lógica mejorada
  const filteredAndSortedResources = useMemo(() => {
    let filtered = resources;

    // Filtrar por tipo
    if (selectedType !== 'all') {
      filtered = filtered.filter(resource => 
        resource.type?.toLowerCase() === selectedType
      );
    }

    // Aplicar búsqueda inteligente
    if (debouncedSearchTerm.trim()) {
      const searchTerms = debouncedSearchTerm.toLowerCase()
        .split(' ')
        .filter(term => term.length > 0);
      
      filtered = filtered
        .map(resource => ({
          resource,
          score: getSearchScore(resource, searchTerms)
        }))
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .map(({ resource }) => resource);
    }

    // Aplicar ordenamiento
    if (!debouncedSearchTerm.trim() || sortBy !== 'relevance') {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'name-asc':
            return a.title.localeCompare(b.title);
          case 'name-desc':
            return b.title.localeCompare(a.title);
          case 'type':
            return (a.type || '').localeCompare(b.type || '');
          case 'relevance':
          default:
            // Ya ordenado por relevancia si hay búsqueda
            return 0;
        }
      });
    }

    return filtered;
  }, [resources, debouncedSearchTerm, selectedType, sortBy, getSearchScore]);

  const clearSearch = () => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
    setSelectedType('all');
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
      {/* Barra de búsqueda y filtros mejorada */}
      {!isLoading && resources.length > 0 && (
        <div className="mb-8">
          {/* Barra de búsqueda principal */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar recursos por nombre, descripción o tipo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-slate-800/80 border border-blue-900/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 text-white transition-all backdrop-blur-sm text-lg"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Controles de filtros y ordenamiento */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">
            {/* Filtros por tipo */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-blue-300 text-sm font-medium mr-2">Filtrar por tipo:</span>
              <button
                onClick={() => setSelectedType('all')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedType === 'all'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-slate-800/50 text-blue-300 hover:bg-slate-700/50 border border-blue-900/30'
                }`}
              >
                Todos ({resources.length})
              </button>
              {availableTypes.map(({ value, label, count }) => (
                <button
                  key={value}
                  onClick={() => setSelectedType(value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedType === value
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-slate-800/50 text-blue-300 hover:bg-slate-700/50 border border-blue-900/30'
                  }`}
                >
                  {label} ({count})
                </button>
              ))}
            </div>

            {/* Controles de ordenamiento */}
            <div className="flex items-center gap-3">
              <span className="text-blue-300 text-sm font-medium">Ordenar por:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none bg-slate-800/80 border border-blue-900/50 rounded-lg px-4 py-2 pr-8 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  {debouncedSearchTerm && <option value="relevance">Relevancia</option>}
                  <option value="name-asc">Nombre (A-Z)</option>
                  <option value="name-desc">Nombre (Z-A)</option>
                  <option value="type">Tipo</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Información de resultados */}
          <div className="text-center mb-4">
            <p className="text-blue-300 text-sm">
                             {debouncedSearchTerm ? (
                 <>
                   Mostrando <span className="font-semibold text-blue-200">{filteredAndSortedResources.length}</span> resultados 
                   {debouncedSearchTerm && <> para "<span className="font-semibold text-blue-200">{debouncedSearchTerm}</span>"</>}
                   {selectedType !== 'all' && <> en <span className="font-semibold text-blue-200">{availableTypes.find(t => t.value === selectedType)?.label || selectedType}</span></>}
                 </>
               ) : (
                 <>
                   {selectedType === 'all' ? (
                     <>Mostrando todos los <span className="font-semibold text-blue-200">{filteredAndSortedResources.length}</span> recursos</>
                   ) : (
                     <>Mostrando <span className="font-semibold text-blue-200">{filteredAndSortedResources.length}</span> recursos de tipo <span className="font-semibold text-blue-200">{availableTypes.find(t => t.value === selectedType)?.label || selectedType}</span></>
                   )}
                 </>
               )}
            </p>
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
      ) : filteredAndSortedResources.length === 0 ? (
        <div className="flex justify-center items-center min-h-[300px] bg-blue-900/10 rounded-3xl border border-blue-900/30 backdrop-blur-sm">
          <div className="text-center p-8">
            <Search className="w-16 h-16 text-blue-500 mx-auto mb-6 opacity-50" />
            <p className="text-xl text-blue-300 mb-2">No se encontraron recursos</p>
            <p className="text-sm text-blue-400 max-w-md mb-4">
              {debouncedSearchTerm ? (
                <>No hay recursos que coincidan con "{debouncedSearchTerm}"{selectedType !== 'all' && ` en la categoría ${availableTypes.find(t => t.value === selectedType)?.label}`}.</>
              ) : (
                <>No hay recursos disponibles en la categoría seleccionada.</>
              )}
              <br />Intenta con otros términos de búsqueda o cambia los filtros.
            </p>
            <button
              onClick={clearSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedResources.map((resource) => (
            <div key={resource.id} 
                className="group relative">
              <div className={`absolute inset-0.5 bg-gradient-to-r ${resource.color} rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-500`}></div>
              <div className="relative bg-gradient-to-b from-slate-900 to-black rounded-3xl p-8 h-full border border-blue-900/50 hover:border-blue-500/20 transition-all hover:shadow-[0_0_50px_rgba(37,99,235,0.3)] backdrop-blur-sm">
                <div className="flex items-center mb-6">
                  <div className={`mr-4 bg-gradient-to-br ${resource.color} rounded-xl p-3 bg-opacity-20 backdrop-blur-sm flex items-center justify-center w-12 h-12`}>
                    {getResourceIcon(resource.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold bg-gradient-to-r ${resource.color} bg-clip-text text-transparent mb-1`}>
                      {resource.title}
                    </h3>
                    {resource.type && (
                      <span className="text-xs text-blue-400 bg-blue-900/30 px-2 py-1 rounded-full">
                        {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-blue-100 mb-8 text-sm leading-relaxed">{resource.description}</p>
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
                      <Download className="w-4 h-4 mr-2" />
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