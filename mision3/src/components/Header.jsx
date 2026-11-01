import { traduccionRoles } from '../utils/logic.js';

export function Header({
  textoBusqueda = '',
  setTextoBusqueda,
  rolSeleccionado = 'Todos',
  setRolSeleccionado
}) {
  const listaRoles = traduccionRoles ? Object.entries(traduccionRoles) : [];

  return (
    <header>
      <h1>Campeones de LoL</h1>
      
      <input
        type="text"
        id="buscador"
        placeholder="Busca un campeón..."
        value={textoBusqueda}
        onChange={(e) => setTextoBusqueda(e.target.value)}
      />
      
      <select 
        id="filtro-rol" 
        value={rolSeleccionado} 
        onChange={(e) => setRolSeleccionado(e.target.value)}
      >
        <option value="Todos">Todos los roles</option>
        {listaRoles.map(([claveIngles, nombreEspanol]) => (
          <option key={claveIngles} value={nombreEspanol}>
            {nombreEspanol} ({claveIngles})
          </option>
        ))}
      </select>
    </header>
  );
}