import PocketBase from 'pocketbase';
import { POCKETBASE_URL, COLLECTIONS, API_CONFIG } from './config';
import { getColorForId } from './colorService';

// Inicialización de PocketBase
const pb = new PocketBase(POCKETBASE_URL);

// Interfaz para la estructura de los cursos
export interface Curso {
  id: string;
  titulo: string;
  descripcion: string;
  icono: string;
  color: string;
  duracion: string;
  nivel: string;
  url: string;
  proximamente: boolean;
}

// Función para mapear nombre de icono a componente
const getIconName = (iconName: string): string => {
  // Si no hay icono, devolver uno por defecto
  if (!iconName) return 'Bot';
  
  // Limpiamos y normalizamos el nombre del icono
  const normalizedName = iconName.trim().toLowerCase();

  // Mapa de correspondencia entre nombres y componentes Lucide (debe coincidir con los importados en App.tsx)
  const iconMap: Record<string, string> = {
    'bot': 'Bot',
    'cpu': 'Cpu',
    'network': 'Network',
    'linechart': 'LineChart',
    'blocks': 'Blocks',
    'radar': 'Radar',
    'chart': 'LineChart',
    'brain': 'Brain',
    'users': 'Users',
    'lightbulb': 'Lightbulb',
    'graduationcap': 'GraduationCap',
    'user': 'Users',
    'sparkles': 'Sparkles',
    'circuitboard': 'CircuitBoard'
  };

  return iconMap[normalizedName] || 'Bot';
};

export const cursosService = {
  // Obtener todos los cursos
  async getCursos(): Promise<Curso[]> {
    try {
      const records = await pb.collection(COLLECTIONS.CURSOS).getList(1, API_CONFIG.DEFAULT_PAGE_SIZE, {
        sort: 'id',
      });
      
      // Procesar los records para asignar colores basados en el ID
      const processedCursos = records.items.map(item => {
        const hasUrl = item.url && item.url.trim() !== '';
        
        return {
          id: item.id,
          titulo: item.titulo,
          descripcion: item.descripcion,
          icono: getIconName(item.icono),
          // Asignar color basado en el ID para consistencia, ignorando lo que viene de la API
          color: getColorForId(item.id),
          duracion: item.duracion || '',
          nivel: item.nivel || '',
          url: item.url || '',
          // El curso está en modo "proximamente" únicamente si no tiene URL
          proximamente: !hasUrl,
        };
      });
      
      // Ordenar los cursos: primero los que no están marcados como "proximamente" (tienen URL)
      return processedCursos.sort((a, b) => {
        // Si uno tiene URL y el otro no, el que tiene URL va primero
        if (a.proximamente !== b.proximamente) {
          return a.proximamente ? 1 : -1;
        }
        // Si ambos tienen o no tienen URL, mantener el orden original
        return 0;
      });
    } catch (error) {
      console.error('Error al obtener cursos:', error);
      return [];
    }
  }
}; 