const API_DOMAIN = process.env.API_DOMAIN;
const API_PORT = process.env.API_PORT;

/**
 * The API call to backend to get the popular restaurant suggestions of based on the user's location
 * @param {Object} searchData is a cookie object stored in the local storage when use set their location.
 * @returns The JSON of with the 20 popular restaurants results from grubhub.
 */
const popularPicks = async (searchData) => {
  return await (
    await fetch(`http://${API_DOMAIN}:${API_PORT}/api/popularPicks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(searchData),
    })
  ).json();
};

export { popularPicks };
