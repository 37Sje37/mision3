const BASE_URL = 'https://ddragon.leagueoflegends.com/cdn/14.1.1/data/es_ES';

export async function fetchChampions(signal) {
  const response = await fetch(`${BASE_URL}/champion.json`, { signal });
  if (!response.ok) throw new Error('Error al conectar con Data Dragon');
  const data = await response.json();
  return Object.values(data.data);
}

export async function fetchChampionDetail(championId, signal) {
  const response = await fetch(`${BASE_URL}/champion/${championId}.json`, { signal });
  if (!response.ok) throw new Error('Error al obtener el detalle del campeón');
  const data = await response.json();
  return data.data[championId];
}