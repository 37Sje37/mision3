import { useState, useEffect } from 'react';
import { fetchDatos } from '../utils/api.js';
import { transformarCampeones } from '../utils/logic.js';

export function useFetchChampions() {
  const [campeones, setCampeones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarDatos = async (signal) => {
    try {
      setLoading(true);
      setError(null);
      const { version, campeones: brutos } = await fetchDatos(signal);
      const transformados = transformarCampeones(brutos, version);
      setCampeones(transformados);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Error al cargar campeones');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    cargarDatos(controller.signal);

    return () => controller.abort();
  }, []);

  const reintentar = () => {
    const controller = new AbortController();
    cargarDatos(controller.signal);
  };

  return { campeones, loading, error, reintentar };
}