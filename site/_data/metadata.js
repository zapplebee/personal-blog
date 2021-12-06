const config =
  process.env.NODE_ENV === "production"
    ? { FQDN: "zapplebee.github.io", protocol: "https://" }
    : { FQDN: "localhost:8080", protocol: "http://" };
module.exports = config;
