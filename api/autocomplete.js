/**
 * The API call to backend to get the autocomplete search results.
 * @param {string} itemInput input the string to give out the location suggestions
 * @returns an Array of JSON containing autocomplete search results.
 */
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
