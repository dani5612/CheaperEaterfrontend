const addToDb = (stringData) => {
  const data = JSON.stringify({
    collection: "test",
    database: "cheapereater",
    dataSource: "cheapereater",
    document: {
      status: "open",
      text: stringData,
    },
  });

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
    }
  });

  xhr.open(
    "POST",
    "https://data.mongodb-api.com/app/data-mibmi/endpoint/data/v1/action/insertOne"
  );
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Access-Control-Request-Headers", "*");
  xhr.setRequestHeader(
    "api-key",
    "xGYW37wYJqTZdneu4wOlXFHyf02dmFWp820whaYKUnAn6EHKFUbDRJkALqbeNgSs"
  );

  xhr.send(data);
};

export { addToDb };
