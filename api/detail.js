const detailLocation = async (address) => {
  const result = await fetch("http://localhost:8000/api/detail/location", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(address),
  }).then((res) => res.json());
  console.log(result);
  return result;
};

export { detailLocation };
