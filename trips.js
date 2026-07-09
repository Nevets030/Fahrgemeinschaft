import { getStore } from "@netlify/blobs";

const STORE_NAME = "fahrgemeinschaft";
const KEY = "trips";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export default async (req) => {
  const store = getStore(STORE_NAME);

  if (req.method === "GET") {
    const data = (await store.get(KEY, { type: "json" })) || [];
    return json(data);
  }

  if (req.method === "POST") {
    let body;
    try {
      body = await req.json();
    } catch {
      return json({ error: "Ungültiges JSON" }, 400);
    }
    if (!body.driver || !body.date) {
      return json({ error: "driver und date sind erforderlich" }, 400);
    }
    const data = (await store.get(KEY, { type: "json" })) || [];
    data.push({
      id: Date.now().toString() + Math.random().toString(36).slice(2, 7),
      date: body.date,
      driver: body.driver,
      passengers: Array.isArray(body.passengers) ? body.passengers : [],
    });
    await store.set(KEY, JSON.stringify(data));
    return json(data);
  }

  if (req.method === "DELETE") {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    let data = (await store.get(KEY, { type: "json" })) || [];
    data = data.filter((t) => t.id !== id);
    await store.set(KEY, JSON.stringify(data));
    return json(data);
  }

  return json({ error: "Methode nicht erlaubt" }, 405);
};

export const config = {
  path: "/.netlify/functions/trips",
};
