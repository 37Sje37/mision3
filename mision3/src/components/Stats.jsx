export function Stats({ estadisticas }) {
  if (estadisticas.total === 0) return null;

  const conteoRolesTxt = Object.entries(estadisticas.rolesTotales)
    .map(([rol, total]) => `${rol}: ${total}`)
    .join(' | ');

  return (
    <div id="stats">
      <div>
        Total mostrados: {estadisticas.total} | Dificultad media: {estadisticas.dificultadMedia}
      </div>
      <div className="stats-roles">
        {conteoRolesTxt}
      </div>
    </div>
  );
}