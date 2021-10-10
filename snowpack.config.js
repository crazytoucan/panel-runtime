const proxy = require("http2-proxy");

function without(values, value) {
  const index = values.indexOf(value);
  const valuesCopy = [...values];
  if (index !== -1) {
    valuesCopy.splice(index, 1);
  }
  return valuesCopy;
}

module.exports = {
  alias: {
    "~": "./src",
  },
  devOptions: {
    openUrl: "/assets/sampleApp/index.html",
  },
  exclude: ["node_modules"],
  mount: {
    src: "/assets",
    raw: "/raw",
  },
  packageOptions: {
    external: [...without(require("module").builtinModules, "process")],
    source: "local",
  },
  plugins: ["@snowpack/plugin-react-refresh", "@snowpack/plugin-sass"],
  routes: [
    {
      src: "/api/.*",
      dest: (req, res) => {
        return proxy.web(req, res, {
          hostname: "localhost",
          port: 3000,
        });
      },
    },
  ],
};
