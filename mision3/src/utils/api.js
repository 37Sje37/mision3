import { obtenerCache, guardarCache } from './cache.js';

const VERSIONS_URL = 'https://ddragon.leagueoflegends.com/api/versions.json';
const TIMEOUT_MS = 5000; 

async function fetchConTimeout(url, parentSignal) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), TIMEOUT_MS);
  
  // Escuchar cancelación del padre
  if (parentSignal) {
    parentSignal.addEventListener('abort', () => controller.abort());
  }

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      throw new Error('Tiempo de espera agotado. La conexión es muy lenta.');
    }
    throw error;
  }
}

export async function fetchDatos(signal) {
  const cache = obtenerCache();
  if (cache) return cache;

  let versionActual = '14.3.1';
  try {
    const resVersiones = await fetchConTimeout(VERSIONS_URL, signal);
    if (resVersiones.ok) {
      const versiones = await resVersiones.json();
      versionActual = versiones[0];
    }
  } catch {
    console.warn('Fallo al obtener la versión de Riot. Usando versión por defecto.');
  }

  const API_URL = `https://ddragon.leagueoflegends.com/cdn/${versionActual}/data/es_ES/champion.json`;
  const respuesta = await fetchConTimeout(API_URL, signal);

  if (!respuesta.ok) {
    throw new Error(`Error HTTP: El servidor respondió con estado ${respuesta.status}`);
  }

  const datos = await respuesta.json();
  if (!datos?.data || typeof datos.data !== 'object') {
    throw new Error('Error de estructura: La API no devolvió el formato esperado.');
  }

  const arrayCampeones = Object.values(datos.data);
  const resultado = { version: versionActual, campeones: arrayCampeones };
  guardarCache(resultado); 
  return resultado;
}