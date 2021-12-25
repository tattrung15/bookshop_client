const { alias, configPaths } = require("react-app-rewire-alias");

module.exports = function override(config, env) {
  let configRes = alias(configPaths("./tsconfig.path.json"))(config);
  return configRes;
};
