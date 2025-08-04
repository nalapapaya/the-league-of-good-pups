//adding dog to team (export function)
export const addToTeam = async (breed) => {
  const res = await fetch(teamURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      fields: {
        id: breed.id,
        name: breed.name,
        life_span: breed.life_span,
        image_url: breed.image_url,
        weight: breed.weight.metric,
        height: breed.height.metric,
        temperament: breed.temperament,
        origin: breed.origin,
        bred_for: breed.bred_for,
        breed_group: breed.breed_group,
      },
    }),
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Airtable error: ${error}`);
  }
  return await res.json(); //await airtable
};
