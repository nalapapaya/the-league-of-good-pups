const teamURL = import.meta.env.VITE_AIRTABLE_TEAM_URL;
const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;

//fetch data from airtable(export function)
export const getTeam = async () => {
  const res = await fetch(teamURL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Airtable GET error ${error}`);
  }
  const data = await res.json();
  return data.records.map((record) => ({
    airtableId: record.id, //store id
    ...record.fields, //expand fields to kvp
  }));
};

//adding dog to team (export function)
export const addToTeam = async (breed) => {
  // console.log("Breed object:", breed);

  const res = await fetch(teamURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      fields: {
        breed_id: breed.id,
        name: breed.name,
        life_span: breed.life_span,
        image_url: breed.reference_image_id
          ? `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`
          : null,
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

//remove from team (export function)
export const removeFromTeam = async (airtableId) => {
  const res = await fetch(`${teamURL}/${airtableId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Airtable DEL error: ${error}`);
  }
  return await res.json();
};

//update dog stats (export function)
export const updateDogStats = async (airtableId, fieldsToUpdate) => {
  const res = await fetch(`${teamURL}/${airtableId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: fieldsToUpdate,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Airtable PATCH error: ${error}`);
  }

  return await res.json();
};
