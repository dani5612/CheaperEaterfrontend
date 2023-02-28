const API_DOMAIN = process.env.API_DOMAIN;
const API_PORT = process.env.API_PORT;

/**
 * The API call to backend to set the location cookies in the browser.
 * @param {Object} detailAddress is the address from the detail API endpoint to set.
 * @return {Obejct} a cookie object with the location data that will be stored in the local storage.
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
