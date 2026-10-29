# Buscador de Campeones LoL — Misión M3 «Reactor Core»

Aplicación reactiva desarrollada con **React 19** y **Vite** que consulta la API pública de Riot Games Data Dragon para explorar, buscar y filtrar la plantilla de campeones de League of Legends.

## Uso de IA
- **Qué se pidió:** Refactorizar una aplicación previa desarrollada en Vanilla JS imperativo (`render.js`, `main.js`, etc.) hacia una arquitectura basada en componentes modulares de React 19 y estado declarativo.
- **Cómo se verificó:** Se comprobó que el flujo de datos fuera unidireccional, se aseguró la limpieza de peticiones asíncronas mediante `AbortController`, y se verificó que el filtrado y cálculo de estadísticas se realizara como estado derivado sin mutaciones ni renders redundantes.
- **Qué se escribió a mano:** La estructura de estilos CSS, los identificadores de persistencia en localStorage y la organización modular de funciones en `/src/utils`.

## Autopsia
1. **Decisión 1: Eliminar la función debounce manual en favor de estado derivado directo.**
   - *Alternativa descartada:* Mantener un temporizador debounce con `useState` y `useEffect` sincronizados para la barra de búsqueda.
   - *Razón de descarte:* En React 19, el filtrado sobre memoria de ~160 objetos es instantáneo. Añadir debounce introducía estados desincronizados y complejidad innecesaria en la interfaz.

2. **Decisión 2: Derivar la lista filtrada y las estadísticas durante el render en lugar de guardarlas en estados independientes.**
   - *Alternativa descartada:* Crear dos variables de estado adicionales (`useState(filtrados)` y `useState(stats)`) actualizadas mediante `useEffect`.
   - *Razón de descarte:* Provocaba renders duplicados en cada pulsación de tecla y corría el riesgo de desincronizar los datos si cambiaba el estado base.