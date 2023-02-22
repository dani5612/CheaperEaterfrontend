/**
 * The API call to backend to set the location cookies in the browser.
 */
const setLocation = async (detailAddress) => {
  await fetch("http://localhost:8000/api/set/location", {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(detailAddress),
  });
};

export { setLocation };
