const axios = require("axios");

function execute(name, search, rowStart, rows) {
  let consulta = `http://localhost:8983/solr/my-core/select?hl.fl=${name}&hl=on&q=${name}%3A${search}&rows=${rows}&wt=json`;
  console.log(consulta);

  return axios({
    url: consulta,
    method: "get",
    proxy: {
      port: 8983
    }
  })
    .then(results => {
      return results.data;
    })
    .then(results => {
      let test = Object.values(results.highlighting);
      console.log("oi", results.response.docs.length);

      let data = results.response.docs.map((result, index) => {
        // console.log("sextou", test[index].texto);

        const id_legislacao = result.id_legislacao[0].split(".");
        const data = result.data[0].split("T");
        let data_br = data[0].split("-");
        data_br = `${data_br[2]}-${data_br[1]}-${data_br[0]}`;

        let high;
        if (test[index].texto) {
          high = test[index].texto[0].replace(/<em>/g, "");
          high = high.replace(/<\/em>/g, "");
          high = "..." + high + "...";
          // console.log("hehe", high);
          console.log("oi", index, typeof test[index]);
        }

        if (!result.governo) {
          return {
            id_solr: result.id,
            governo: null,
            id_legislacao: null,
            data: null,
            highlight: null
          };
        }
        return {
          id_solr: result.id,
          governo: result.governo[0],
          id_legislacao: id_legislacao[0],
          data: data_br,
          link: result.link[0],
          highlight: high
        };
      });
      // console.log("entao acao penal", data);
      return data;
    })
    .catch(error => {
      console.error(error);
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

// cat%3A*&rows=50&sort=price%desc&wt=json
// fq=price%3A%5B4%20TO%2010%5D&q=.... price:[4 TO 10]
// old
// `q=${param1}%3A${param2}&rows=100&sort=data%20desc&wt=json`;
// sem facet   /select?hl.fl=texto&hl=on&q=texto%3A*&rows=1&start=12000
// const consulta = `select?hl.fl=${param1}&hl=on&q=${param1}%3A${param2}&rows=${rows}&start=${rowStart}`;
// //* const consulta = "select?hl.fl=texto&hl=on&q=texto%3Aarmas&rows=2&wt=json";
// //* console.log(consulta);
// const consulta = `select?facet.field=governo&facet=on&q=${param1}%3A${param2}&rows=${rows}&start=${page}&sort=data%20desc&wt=json`;
// `select?facet.query=governo&facet=on&q=texto%3A*            &rows=10&sort=data desc&start=12000&wt=json`
// return client
//   .search(consulta)
//   .then(function(result, resolve) {
//     // console.log("vcehlindu", result);
//     return result;
//   })
//   .then(result => {
//     // let teste = "096f84ba-c6ce-4e13-a86c-5b1ae428c903";
//     // let arrayHighligthing = Object.values(result.highlighting);
//     console.log("result", result);
//     // console.log(
//     //   "sera",
//     //   results.response.docs[0].id,
//     //   typeof results.response.docs[0].id
//     // );
//     // // let teste = results.response.docs[0].id;
//     // console.log(
//     //   "incrível",
//     //   results.highlighting,
//     //   typeof results.highlighting
//     // );
//     // var resultt = Object.keys(results.highlighting).map(function(key) {
//     //   console.log("haa", key, results.highlighting);
//     //   return [Number(key), results.highlighting[key]];
//     // });
//     let data = result.response.docs.map(result => {
//       // console.log("sextou", result);
//       const id_legislacao = result.id_legislacao[0].split(".");
//       const data = result.data[0].split("T");
//       let data_br = data[0].split("-");
//       data_br = `${data_br[2]}-${data_br[1]}-${data_br[0]}`;
//       // console.log("oi", data_br[0]);
//       if (!result.governo) {
//         return {
//           id_solr: result.id,
//           governo: null,
//           id_legislacao: null,
//           data: null
//           // highlight:
//         };
//       }
//       return {
//         id_solr: result.id,
//         governo: result.governo[0],
//         id_legislacao: id_legislacao[0],
//         data: data_br,
//         link: result.link[0]
//       };
//     });
//     //data = { subvalues: data };
//     // console.log(data);
//     return result["highlighting"];
//   })
//   .catch(function(err) {
//     console.error(err);
//   });
// let resultXX =

// return JSON.parse(resultXX);
