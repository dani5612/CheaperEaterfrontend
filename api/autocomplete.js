const autocomplete = async (addressInput) => {
  const result = await fetch(
    "http://localhost:8000/api/autocomplete/location",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: addressInput }),
    }
  ).then((res) => res.json());
  return result;
};

export { autocomplete };
