// Paleta de colores futurista y moderna para la aplicación
export const COLOR_PALETTE = [
  // Azules tecnológicos y cibernéticos
  'from-blue-600 to-indigo-700',
  'from-cyan-500 to-blue-700',
  'from-sky-400 to-indigo-800',
  'from-blue-400 to-violet-800',
  
  // Púrpuras y violetas futuristas
  'from-violet-600 to-purple-800',
  'from-purple-500 to-indigo-900',
  'from-fuchsia-500 to-purple-900',
  'from-indigo-500 to-fuchsia-800',
  
  // Tecnológicos y digitales
  'from-teal-400 to-blue-800',
  'from-emerald-400 to-cyan-800',
  'from-blue-500 to-emerald-700',
  
  // Modernos y vibrantes
  'from-pink-500 to-purple-900',
  'from-rose-500 to-indigo-800',
  
  // Neo futuristas
  'from-indigo-400 to-cyan-900',
  'from-violet-400 to-indigo-900',
  'from-blue-400 to-teal-800'
];

// Hash simple para generar un índice consistente basado en un string
export const stringToIndex = (str: string): number => {
  let hash = 0;
  if (str.length === 0) return hash;
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convertir a entero de 32 bits
  }
  
  // Asegurar que el hash sea positivo y esté dentro del rango del array
  return Math.abs(hash) % COLOR_PALETTE.length;
};

// Asignar un color consistente basado en un identificador
export const getColorForId = (id: string): string => {
  const index = stringToIndex(id);
  return COLOR_PALETTE[index];
};

// Asignar colores de forma secuencial a una lista de elementos
export const assignColorsToItems = <T extends { id: string }>(items: T[]): (T & { color: string })[] => {
  return items.map(item => ({
    ...item,
    color: getColorForId(item.id)
  }));
};

// Obtener un color aleatorio
export const getRandomColor = (): string => {
  const randomIndex = Math.floor(Math.random() * COLOR_PALETTE.length);
  return COLOR_PALETTE[randomIndex];
}; 