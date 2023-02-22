const API_DOMAIN = process.env.API_DOMAIN;
const API_PORT = process.env.API_PORT;

/**
 * The API call to backend to set the location cookies in the browser.
 * @param {Object} the address from the detail API endpoint to set.
 */
const setLocation = async (detailAddress) => {
  const res = await fetch(`http://${API_DOMAIN}:${API_PORT}/api/set/location`, {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(detailAddress),
  });

  console.log(res.headers.get("set-cookie"));
};

export { setLocation };
