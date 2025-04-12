import React, { useState, useEffect } from 'react';
import { cursosService, Curso } from '../services/cursosService';
import { Bot, Cpu, Network, LineChart, Blocks, Radar, GraduationCap, Brain, Users, Lightbulb, Sparkles, CircuitBoard, ExternalLink } from 'lucide-react';

// Mapa de correspondencia entre nombres de iconos y componentes
const iconComponents: Record<string, React.ElementType> = {
  Bot,
  Cpu,
  Network,
  LineChart,
  Blocks,
  Radar,
  GraduationCap,
  Brain,
  Users,
  Lightbulb,
  Sparkles,
  CircuitBoard
};

const CursosGrid: React.FC = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar los cursos desde la API al montar el componente
  useEffect(() => {
    const fetchCursos = async () => {
      setIsLoading(true);
      try {
        const data = await cursosService.getCursos();
        setCursos(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching cursos:', error);
        setError('No se pudieron cargar los cursos. Por favor, intenta más tarde.');
      } finally {
        setIsLoading(false);
        setIsInitialLoad(false); // Ya no es la carga inicial
      }
    };

    fetchCursos();
  }, []);

  // Renderiza el icono basado en el nombre
  const renderIcon = (iconName: string) => {
    const IconComponent = iconComponents[iconName] || Bot;
    return <IconComponent className="w-12 h-12 text-blue-400 mb-6" />;
  };

  // Función para manejar la redirección a la URL del curso
  const handleCourseClick = (url: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Estado de carga inicial con esqueletos para mejorar UX
  if (isInitialLoad) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="relative bg-gradient-to-b from-slate-900 to-black border border-blue-900/30 rounded-3xl p-8 h-full animate-pulse">
            <div className="h-12 w-12 bg-blue-900/30 rounded-lg mb-6"></div>
            <div className="h-7 bg-blue-900/30 rounded-lg w-3/4 mb-4"></div>
            <div className="h-4 bg-blue-900/20 rounded w-full mb-2"></div>
            <div className="h-4 bg-blue-900/20 rounded w-5/6 mb-2"></div>
            <div className="h-4 bg-blue-900/20 rounded w-4/6 mb-6"></div>
            <div className="flex gap-2 mb-6">
              <div className="h-4 bg-blue-900/30 rounded w-20"></div>
              <div className="h-4 bg-blue-900/30 rounded w-20"></div>
            </div>
            <div className="h-10 bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-full mt-4"></div>
          </div>
        ))}
      </div>
    );
  }

  // Mostrar un mensaje de error si ocurre algún problema
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-6 max-w-md">
          <h3 className="text-xl font-semibold text-red-400 mb-2">Error</h3>
          <p className="text-white">{error}</p>
          <button 
            onClick={() => {
              setIsInitialLoad(true); // Volver a mostrar esqueletos
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

  // Si se completó la carga pero no hay cursos, mostrar mensaje (esto es diferente del estado de carga)
  if (!isLoading && cursos.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[300px] bg-blue-900/10 rounded-3xl border border-blue-900/30 backdrop-blur-sm">
        <div className="text-center p-8">
          <Bot className="w-16 h-16 text-blue-500 mx-auto mb-6 opacity-50" />
          <p className="text-xl text-blue-300 mb-2">No hay cursos disponibles</p>
          <p className="text-sm text-blue-400 max-w-md">
            En estos momentos no hay cursos publicados. ¡Vuelve pronto para ver nuestras novedades!
          </p>
        </div>
      </div>
    );
  }

  // Mostrar la grid de cursos cuando hay datos disponibles
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {cursos.map((curso) => (
        <div key={curso.id} className="group relative">
          <div className={`absolute inset-0.5 bg-gradient-to-r ${curso.color} rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-500`}></div>
          <div className="relative bg-gradient-to-b from-slate-900 to-black border border-blue-900/50 rounded-3xl p-8 h-full hover:border-blue-500/50 transition-all flex flex-col">
            <div className="absolute top-4 right-4 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-blue-500/30">
              {curso.proximamente ? 'Próximamente' : 'Disponible'}
            </div>
            {renderIcon(curso.icono)}
            <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${curso.color} bg-clip-text text-transparent`}>{curso.titulo}</h3>
            <p className="text-blue-100 mb-6">{curso.descripcion}</p>
            <div className="flex items-center gap-4 text-sm text-blue-300 mb-4">
              {curso.duracion && <span>{curso.duracion}</span>}
              {curso.duracion && curso.nivel && <span>•</span>}
              {curso.nivel && <span>{curso.nivel}</span>}
            </div>
            
            {/* Botón "Ir al curso" cuando hay URL, o espacio vacío cuando no hay */}
            <div className="mt-auto">
              {curso.url ? (
                <button 
                  onClick={() => handleCourseClick(curso.url)}
                  className={`group bg-gradient-to-r ${curso.color} relative px-6 py-3 rounded-full text-white font-semibold transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] overflow-hidden w-full flex items-center justify-center gap-2`}
                >
                  <span>Ir al curso</span>
                  <ExternalLink className="w-4 h-4" />
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </button>
              ) : curso.proximamente ? (
                <div className="text-center text-sm text-blue-400 font-medium">
                  Próximamente disponible
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CursosGrid; 