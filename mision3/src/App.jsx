import { useState } from 'react';
import { useFetchChampions } from './hooks/useFetchChampions.js';
import { useLocalStorage } from './hooks/seLocalStorage.js';
import { filtrarCampeones, calcularEstadisticas } from './utils/logic.js';
import { Header } from './components/Header.jsx';
import { Stats } from './components/Stats.jsx';
import { ChampionList } from './components/ChampionList.jsx';

export function App() {
  const { campeones, loading, error, reintentar } = useFetchChampions();
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [rolSeleccionado, setRolSeleccionado] = useLocalStorage('lol_filtro_rol', 'Todos');

  const campeonesFiltrados = filtrarCampeones(campeones, textoBusqueda, rolSeleccionado);
  const estadisticas = calcularEstadisticas(campeonesFiltrados);

  return (
    <div>
      <Header
        textoBusqueda={textoBusqueda}
        setTextoBusqueda={setTextoBusqueda}
        rolSeleccionado={rolSeleccionado}
        setRolSeleccionado={setRolSeleccionado}
      />

      <Stats estadisticas={estadisticas} />

      <main id="app">
        {loading && <p className="estado-cargando">Cargando campeones...</p>}

        {error && (
          <div className="estado-error">
            <p>{error}</p>
            <button className="btn-reintentar" onClick={reintentar}>
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && (
          <ChampionList campeones={campeonesFiltrados} />
        )}
      </main>
    </div>
  );
}

export default App;