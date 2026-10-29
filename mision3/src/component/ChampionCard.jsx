export function ChampionCard({ campeon }) {
  return (
    <li>
      {campeon.imagen && (
        <img 
          src={campeon.imagen} 
          alt={campeon.nombre} 
          className="img-campeon"
          loading="lazy" 
        />
      )}
      <div className="info-campeon">
        <h3>{campeon.nombre}</h3>
        <p>{campeon.titulo} (Dif: {campeon.dificultad})</p>
        <small>Roles: {campeon.roles.join(', ')}</small>
      </div>
    </li>
  );
}