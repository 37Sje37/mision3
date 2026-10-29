import { ChampionCard } from './ChampionCard';

export function ChampionList({ campeones }) {
  if (campeones.length === 0) {
    return <p className="estado-vacio">No se encontró ningún campeón.</p>;
  }

  return (
    <ul className="lista-campeones">
      {campeones.map((campeon) => (
        <ChampionCard key={campeon.id} campeon={campeon} />
      ))}
    </ul>
  );
}