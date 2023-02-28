const API_DOMAIN = process.env.API_DOMAIN;
const API_PORT = process.env.API_PORT;

/**
 * The API call to backend to get the search results from all the services.
 * @param {string} searchInput is the search string on which the API will be called.
 * @param {Object} cookies is a cookie object stored in the local storage when use set their location.
 * @returns an Array of JSON containing search results from all three serviced i.e. Postmates, Grubhub, and DoorDash.
 */
const search = async (searchInput, cookies) => {
  return await (
    await fetch(`http://${API_DOMAIN}:${API_PORT}/api/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        query: searchInput,
        cookies: cookies.cookies,
      }),
    })
  ).json();
};

export { search };
