const fs = require("fs");

function formatingJson(data) {
  console.log(data);

  fs.writeFile("./src/resultado.json", JSON.stringify(data, null, 4), function(
    err
  ) {
    console.log("JSON escrito com sucesso!");
  });
  return data;
}
