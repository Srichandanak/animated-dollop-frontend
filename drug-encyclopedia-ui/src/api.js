export async function searchDrugs({ question, type }) {
  const endpoint =
    type === "homeopathic"
      ? "http://127.0.0.1:8000/ask/homeopathic"
      : "http://127.0.0.1:8000/ask/prescription";

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query: question })
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function clinicalQuery(question) {
  const response = await fetch(
    `http://localhost:8000/ask/prescription/clinical?q=${encodeURIComponent(question)}`
  );

  if (!response.ok) {
    throw new Error("Clinical query failed");
  }

  return response.json();
}