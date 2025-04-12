# El Proyecto IA - Landing Page

Landing page para El Proyecto IA con tarjetas de workflows de n8n y cursos integrados con PocketBase.

## Configuración de PocketBase

Esta aplicación utiliza PocketBase para cargar los datos de las tarjetas de workflows de n8n y los cursos.

### Colección: workflows_templates_n8n

La aplicación está configurada para usar la colección `workflows_templates_n8n` con los siguientes campos:

| Campo        | Tipo     | Descripción                                | Requerido |
|--------------|----------|--------------------------------------------|-----------|
| id           | ID       | Identificador único (generado automáticamente) | Sí |
| title        | Texto    | Título del workflow                        | Sí |
| description  | Texto    | Descripción del workflow                   | Sí |
| downloadUrl  | Texto    | URL para descargar el archivo del workflow | Sí |
| color        | Texto    | Clases CSS para el gradiente de color (ignorado, se asigna automáticamente) | No |
| proximamente | Booleano | Campo ignorado, determinado automáticamente por la presencia de URL | No |

**Notas:**
- El registro de descargas se realiza mediante un webhook de n8n y no se almacena en PocketBase.
- Los colores se asignan automáticamente basados en el ID del elemento para mantener consistencia visual.
- El estado "próximamente" se determina automáticamente: si hay URL de descarga, se mostrará un botón "Descargar"; si no hay URL, se mostrará "Próximamente".
- **IMPORTANTE**: La propiedad `proximamente` que viene de la API es ignorada, solo se considera la presencia/ausencia de URL de descarga.
- Los workflows se ordenan para mostrar primero los que tienen URL de descarga (disponibles), seguidos por los que no tienen URL (próximamente).

### Colección: cursos

La aplicación también usa la colección `cursos` con los siguientes campos:

| Campo        | Tipo     | Descripción                                | Requerido |
|--------------|----------|--------------------------------------------|-----------|
| id           | ID       | Identificador único (generado automáticamente) | Sí |
| titulo       | Texto    | Título del curso                           | Sí |
| descripcion  | Texto    | Descripción del curso                      | Sí |
| icono        | Texto    | Nombre del icono a utilizar (ej: "Bot", "Cpu") | No |
| color        | Texto    | Clases CSS para el gradiente de color (ignorado, se asigna automáticamente) | No |
| duracion     | Texto    | Duración del curso (ej: "8 semanas")       | No |
| nivel        | Texto    | Nivel o características del curso          | No |
| url          | Texto    | URL del curso (cuando está disponible)     | No |
| proximamente | Booleano | Campo ignorado, determinado automáticamente por la presencia de URL | No |

**Notas:**
- Si el campo `icono` no está definido o no se encuentra, se utilizará el icono "Bot" por defecto.
- Los colores se asignan automáticamente basados en el ID del elemento para mantener consistencia visual.
- El estado "próximamente" se determina automáticamente: si hay URL, se mostrará un botón "Ir al curso"; si no hay URL, se mostrará "Próximamente".
- **IMPORTANTE**: La propiedad `proximamente` que viene de la API es ignorada, solo se considera la presencia/ausencia de URL.
- Los cursos se ordenan para mostrar primero los que tienen URL (disponibles), seguidos por los que no tienen URL (próximamente).

### URLs de descarga

El campo `downloadUrl` puede contener:

1. **URLs absolutas**: Comienzan con `http://` o `https://`
   ```
   https://ejemplo.com/workflows/mi-workflow.json
   ```

2. **URLs relativas**: Comienzan con `/` o sin él
   ```
   /workflows/mi-workflow.json
   workflows/mi-workflow.json
   ```

La aplicación manejará ambos tipos correctamente. El nombre del archivo para la descarga se extrae de la URL. Si el nombre no se puede determinar, se utilizará el título del workflow convertido a un formato de archivo válido con extensión `.json`.

### Sistema de colores

La aplicación utiliza un sistema de asignación de colores basado en el ID de cada elemento, lo que garantiza:

1. **Consistencia visual**: El mismo elemento siempre tendrá el mismo color, incluso si se recarga la página.
2. **Distribución equilibrada**: Los colores se distribuyen de manera equilibrada entre todos los elementos.
3. **Paleta futurista y moderna**: Se utiliza una paleta de colores predefinida con gradientes futuristas que combina:
   - Tonos azules tecnológicos y cibernéticos
   - Púrpuras y violetas futuristas
   - Colores tecnológicos y digitales
   - Tonos modernos y vibrantes
   - Gradientes neo futuristas

Este sistema de colores está diseñado para complementar perfectamente el tema de inteligencia artificial y tecnología de la plataforma, creando una interfaz visualmente coherente, moderna y atractiva sin necesidad de asignar colores manualmente a cada elemento.

### Iconos disponibles

Para el campo `icono` en la colección de cursos, puedes utilizar cualquiera de los siguientes valores:

- `Bot` - Un robot
- `Cpu` - Un procesador
- `Network` - Una red
- `LineChart` - Un gráfico de líneas
- `Blocks` - Bloques
- `Radar` - Un radar
- `GraduationCap` - Un birrete de graduación
- `Brain` - Un cerebro
- `Users` - Usuarios
- `Lightbulb` - Una bombilla
- `Sparkles` - Destellos
- `CircuitBoard` - Una placa de circuito

Si no se especifica un icono o no se reconoce, se utilizará `Bot` por defecto.

### URL del servidor PocketBase

La aplicación está configurada para usar la siguiente URL de PocketBase:

```
https://pb.xrocket.app
```

Las URLs completas de la API para las colecciones son:

```
https://pb.xrocket.app/api/collections/workflows_templates_n8n/records
https://pb.xrocket.app/api/collections/cursos/records
```

## Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

## Producción

```bash
# Compilar para producción
npm run build

# Previsualizar la compilación
npm run preview
```