const IMG_BASE_URL = 'https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion';

export function ChampionCard({ champion, onSelect }) {
  return (
    <article className="champion-card" onClick={() => onSelect(champion.id)}>
      <img
        src={`${IMG_BASE_URL}/${champion.image.full}`}
        alt={champion.name}
        loading="lazy"
      />
      <div className="card-info">
        <h3>{champion.name}</h3>
        <p className="title">{champion.title}</p>
        <div className="tags">
          {champion.tags.map((tag) => (
            <span key={tag} className="tag-badge">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}