import PocketBase from 'pocketbase';
import { POCKETBASE_URL, COLLECTIONS, API_CONFIG } from './config';
import { getColorForId } from './colorService';

// Inicialización de PocketBase
const pb = new PocketBase(POCKETBASE_URL);

// Interfaz para la estructura de los workflows
export interface Workflow {
  id: string;
  title: string;
  description: string;
  downloadUrl: string;
  color: string;
  proximamente: boolean;
}

export const workflowService = {
  // Obtener todos los workflows
  async getWorkflows(): Promise<Workflow[]> {
    try {
      const records = await pb.collection(COLLECTIONS.WORKFLOWS).getList(1, API_CONFIG.DEFAULT_PAGE_SIZE, {
        sort: 'id',
      });
      
      // Procesar los records para asignar colores basados en el ID
      const processedWorkflows = records.items.map(item => {
        const hasDownloadUrl = item.downloadUrl && item.downloadUrl.trim() !== '';
        
        return {
          id: item.id,
          title: item.title,
          description: item.description,
          downloadUrl: item.downloadUrl || '',
          // Asignar color basado en el ID para consistencia, ignorando lo que viene de la API
          color: getColorForId(item.id),
          // El workflow está en modo "proximamente" únicamente si no tiene URL de descarga
          proximamente: !hasDownloadUrl,
        };
      });
      
      // Ordenar los workflows: primero los que tienen URL de descarga (disponibles)
      return processedWorkflows.sort((a, b) => {
        // Si uno tiene URL de descarga y el otro no, el que tiene URL va primero
        if (a.proximamente !== b.proximamente) {
          return a.proximamente ? 1 : -1;
        }
        // Si ambos tienen o no tienen URL de descarga, mantener el orden original
        return 0;
      });
    } catch (error) {
      console.error('Error al obtener workflows:', error);
      return [];
    }
  }
}; 