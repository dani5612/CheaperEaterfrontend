const API_DOMAIN = process.env.API_DOMAIN;
const API_PORT = process.env.API_PORT;

/**
 * The API call to backend to set the location cookies in the browser.
 */
const setLocation = async (detailAddress) => {
  return await (
    await fetch(`http://${API_DOMAIN}:${API_PORT}/api/set/location`, {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(detailAddress),
    })
  ).json();
};

export { setLocation };
