// let consulta1 = client.query().q({ text: "test", title: "test" });
// let consulta2 = 'q=*%3A*&wt=json';
const axios = require('axios');

function execute(column, columnValue) {
  // cat%3A*&rows=50&sort=price%desc&wt=json
  // fq=price%3A%5B4%20TO%2010%5D&q=.... price:[4 TO 10]
  const consulta = `http://localhost:8983/solr/my-core/select?hl.fl=${column}&hl=on&q=${column}%3A${columnValue}&rows=10&start=5&wt=json`;

  return (
    axios
      .get(consulta)
      // .then((results) => results.response.docs)
      .then((results) => {
        // const { highlighting } = results.data;
        const highlighting = Object.values(results.data.highlighting);
        // console.log(highlighting);

        // console.log(results);
        const data = results.data.response.docs.map((result, index) => {
          let high = highlighting[index].texto[0];
          high = high.replace(/<em>/g, '');
          high = high.replace(/<\/em>/g, '');
          // console.log(high);
          // console.log('oi', high);
          const idLegislacao = result.id_legislacao[0].split('.');
          const data = result.data[0].split('T');
          let dataBr = data[0].split('-');
          dataBr = `${dataBr[2]}-${dataBr[1]}-${dataBr[0]}`;
          // console.log("oi", data_br[0]);

          if (!result.governo) {
            return {
              id_solr: result.id,
              governo: null,
              id_legislacao: null,
              data: null,
              highlight: high,
            };
          }
          return {
            id_solr: result.id,
            governo: result.governo[0],
            id_legislacao: idLegislacao[0],
            data: dataBr,
            link: result.link[0],
            highlight: high,
          };
        });
        // data = { subvalues: data };
        // console.log('oii', data);
        return data;
      })
      .catch((err) => {
        console.error(err);
      })
  );
}

module.exports = {
  execute,
};

// const consulta = `q=${param1}%3A${param2}&rows=100&sort=data%20desc&wt=json`;
//   console.log(consulta);
//   return client
//     .search(consulta)
//     .then((result, resolve) => result.response.docs)
//     .then((results) => {
//       // console.log(results);
//       const data = results.map((result) => {
//         const idLegislacao = result.id_legislacao[0].split('.');
//         const data = result.data[0].split('T');
//         let dataBr = data[0].split('-');
//         dataBr = `${dataBr[2]}-${dataBr[1]}-${dataBr[0]}`;
//         // console.log("oi", data_br[0]);

//         if (!result.governo) {
//           return {
//             id_solr: result.id,
//             governo: null,
//             id_legislacao: null,
//             data: null,
//             // highlight:
//           };
//         }

//         return {
//           id_solr: result.id,
//           governo: result.governo[0],
//           id_legislacao: idLegislacao[0],
//           data: dataBr,
//           link: result.link[0],
//         };
//       });
//       // data = { subvalues: data };
//       // console.log(data);
//       return data;
//     })
//     .catch((err) => {
//       console.error(err);
//     });
