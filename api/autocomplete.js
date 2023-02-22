const API_DOMAIN = process.env.API_DOMAIN;
const API_PORT = process.env.API_PORT;

/**
 * The API call to backend to get the autocomplete suggestions of the location
 * @param {string} addressInput is the address quesry which user will input on the screen
 * @returns Array JSONs of top 5 location.
 */
const autocompleteLocation = async (addressInput) => {
  console.log("autocomplete");
  console.log(process.env.API_DOMAIN);
  return await (
    await fetch(`http://${API_DOMAIN}:${API_PORT}/api/autocomplete/location`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: addressInput }),
    })
  ).json();
};

/**
 * The API call to backend to get the autocomplete search results.
 * @param {string} itemInput input the string to give out the location suggestions
 * @returns an Array of JSON containing autocomplete search results.
 */
const autocompleteSearch = async (itemInput) => {
  return await (
    await fetch(`http://${API_DOMAIN}:${API_PORT}/api/autocomplete/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: itemInput }),
    })
  ).json();
};

export { autocompleteLocation, autocompleteSearch };
