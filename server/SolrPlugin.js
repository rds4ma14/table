function SolrPlugin() {
  const SolrNode = require("solr-node");

  const client = new SolrNode({
    host: "127.0.0.1",
    port: "8983",
    core: "my-core",
    protocol: "http"
  });
  return client;
}

module.exports = {
  SolrPlugin
};
// export default SolrPlugin;
