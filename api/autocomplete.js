const autocompleteSearch = async (itemInput) => {
  return await (
    await fetch("http://localhost:8000/api/autocomplete/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: itemInput }),
    })
  ).json();
};

export { autocompleteSearch };
