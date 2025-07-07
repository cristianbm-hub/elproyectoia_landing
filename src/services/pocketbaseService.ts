import PocketBase from 'pocketbase';
import { POCKETBASE_URL, COLLECTIONS, API_CONFIG } from './config';
import { getColorForId } from './colorService';

// Inicialización de PocketBase
const pb = new PocketBase(POCKETBASE_URL);

// Interfaz para la estructura de los recursos
export interface Resource {
  id: string;
  title: string;
  description: string;
  downloadUrl: string;
  color: string;
  proximamente: boolean;
  type?: string; // Tipo de recurso (template, guía, herramienta, etc.)
}

// Mantenemos la interfaz Workflow para compatibilidad hacia atrás
export interface Workflow extends Resource {}

export const resourceService = {
  // Obtener todos los recursos
  async getResources(): Promise<Resource[]> {
    try {
      const records = await pb.collection(COLLECTIONS.RECURSOS).getList(1, API_CONFIG.DEFAULT_PAGE_SIZE, {
        sort: 'id',
      });
      
      // Procesar los records para asignar colores basados en el ID
      const processedResources = records.items.map(item => {
        const hasDownloadUrl = item.downloadUrl && item.downloadUrl.trim() !== '';
        
        return {
          id: item.id,
          title: item.title,
          description: item.description,
          downloadUrl: item.downloadUrl || '',
          type: item.type || 'recurso',
          // Asignar color basado en el ID para consistencia, ignorando lo que viene de la API
          color: getColorForId(item.id),
          // El recurso está en modo "proximamente" únicamente si no tiene URL de descarga
          proximamente: !hasDownloadUrl,
        };
      });
      
      // Ordenar los recursos: primero los que tienen URL de descarga (disponibles)
      return processedResources.sort((a, b) => {
        // Si uno tiene URL de descarga y el otro no, el que tiene URL va primero
        if (a.proximamente !== b.proximamente) {
          return a.proximamente ? 1 : -1;
        }
        // Si ambos tienen o no tienen URL de descarga, mantener el orden original
        return 0;
      });
    } catch (error) {
      console.error('Error al obtener recursos:', error);
      return [];
    }
  }
};

// Mantenemos workflowService para compatibilidad hacia atrás
export const workflowService = {
  async getWorkflows(): Promise<Workflow[]> {
    return resourceService.getResources();
  }
}; 