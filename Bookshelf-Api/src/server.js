const Hapi = require("@hapi/hapi");
const routes = require("./routes");

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  // require/import file routes.js
  server.route(routes);

  await server.start();
  console.log(`Server started In ${server.info.uri}`);
};

init();
