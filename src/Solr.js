// let consulta1 = client.query().q({ text: "test", title: "test" });
// let consulta2 = 'q=*%3A*&wt=json';

function execute(param1, param2, client) {
  // cat%3A*&rows=50&sort=price%desc&wt=json
  // fq=price%3A%5B4%20TO%2010%5D&q=.... price:[4 TO 10]
  const consulta = `q=${param1}%3A${param2}&rows=100&sort=data%20desc&wt=json`;
  console.log(consulta);
  return client
    .search(consulta)
    .then(function(result, resolve) {
      return result.response.docs;
    })
    .then(results => {
      // console.log(results);
      let data = results.map(function(result) {
        const id_legislacao = result.id_legislacao[0].split(".");
        const data = result.data[0].split("T");
        let data_br = data[0].split("-");
        data_br = `${data_br[2]}-${data_br[1]}-${data_br[0]}`;
        // console.log("oi", data_br[0]);

        if (!result.governo) {
          return {
            id_solr: result.id,
            governo: null,
            id_legislacao: null,
            data: null
            // highlight:
          };
        }

        return {
          id_solr: result.id,
          governo: result.governo[0],
          id_legislacao: id_legislacao[0],
          data: data_br,
          link: result.link[0]
        };
      });
      //data = { subvalues: data };
      // console.log(data);
      return data;
    })
    .catch(function(err) {
      console.error(err);
    });
}

module.exports = {
  execute
};

// .then(data => {
//     // ordening
//     // data.sort(function(a, b) {
//     //     // eslint-disable-next-line no-nested-ternary
//     //     return a.value > b.value ? -1 : a.value < b.value ? 1 : 0;
//     // });

//     const datan = { subvalues: data };

//     fs.writeFile(
//       "./src/resultado.json",
//       JSON.stringify(datan, null, 4),
//       function(err) {
//         console.log("JSON escrito com sucesso!");
//       }
//     );
//     return datan;
//   })
