const API_DOMAIN = process.env.API_DOMAIN;
const API_PORT = process.env.API_PORT;

/**
 * The API call to backend to get the popular restaurant suggestions of based on the user's location
 * @returns The JSON of with the 20 popular restaurants results from grubhub.
 */
const popularPicks = async () => {
  return await (
    await fetch(`http://${API_DOMAIN}:${API_PORT}/api/popularPicks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        query: "",
      }),
    })
  ).json();
};

export { popularPicks };
