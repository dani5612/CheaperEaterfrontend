const popularPicks = async () => {
  const results = fetch("http://localhost:8000/api/popularPicks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      query: "",
    }),
  }).then((res) => res.json());
  return results;
};

export { popularPicks };
