/**
 * The API call to backend to get the autocomplete suggestions of the location
 * @param {string} addressInput is the address quesry which user will input on the screen
 * @returns Array JSONs of top 5 location.
 */
const autocompleteLocation = async (addressInput) => {
  return await (
    await fetch("http://localhost:8000/api/autocomplete/location", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: addressInput }),
    })
  ).json();
};

export { autocompleteLocation };
