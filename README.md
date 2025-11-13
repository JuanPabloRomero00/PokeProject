# PokeProject

¡Bienvenido a **PokeProject**! Esta es una aplicación frontend desarrollada en React que consume la API de Pokémon para mostrar información detallada sobre tus Pokémon favoritos. Ideal para fans de Pokémon que quieran explorar datos de manera interactiva.

## Características

- **Exploración de Pokémon**: Lista y busca Pokémon por nombre o ID.
- **Detalles Completos**: Información detallada incluyendo estadísticas, tipos, habilidades y evoluciones.
- **Interfaz Amigable**: Diseño moderno y responsivo con React.
- **Rápido y Ligero**: Construido con Vite para un desarrollo y build optimizados.
- **API Integrada**: Consume datos en tiempo real de la [PokéAPI](https://pokeapi.co/).

## Tecnologías Utilizadas

- **React**: Biblioteca para construir interfaces de usuario.
- **Vite**: Herramienta de build rápida para desarrollo moderno.
- **JavaScript (ES6+)**: Lenguaje de programación principal.
- **CSS**: Estilos personalizados para la UI.
- **PokéAPI**: API externa para datos de Pokémon.

## Instalación

Sigue estos pasos para configurar el proyecto en tu máquina local:

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/JuanPabloRomero00/PokeProject.git
   cd PokeProject
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Ejecuta el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

4. Abre tu navegador en `http://localhost:5173` para ver la aplicación.

## Estructura del Proyecto

```
PokeProject/
├── public/
│   └── img/          # Imágenes estáticas
├── src/
│   ├── assets/       # Recursos adicionales
│   ├── Components/   # Componentes reutilizables (ej. PokeTarjeta.jsx)
│   ├── Views/        # Vistas principales (ej. Index.jsx, Detalle.jsx)
│   ├── App.jsx       # Componente principal de la app
│   ├── main.jsx      # Punto de entrada
│   └── index.css     # Estilos globales
├── package.json      # Dependencias y scripts
├── vite.config.js    # Configuración de Vite
└── README.md         # Este archivo
```

## Uso

- Navega por la lista de Pokémon en la página principal.
- Haz clic en un Pokémon para ver detalles completos.
- Busca Pokémon específicos usando la barra de búsqueda (si implementada).

## Contribución

¡Las contribuciones son bienvenidas! Si quieres mejorar PokeProject:

1. Haz un fork del proyecto.
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`).
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`).
4. Push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

Por favor, sigue las mejores prácticas de código limpio y agrega tests si es posible.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
