"use strict";
// import * as dotenv from 'dotenv'
// dotenv.config()
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = require("fastify");
const game_1 = require("./game/game");
const site_1 = require("./site/site");
const server = fastify_1.default({});
site_1.registerSiteHandlers(server);
game_1.registerGameHandler(server);
console.log(process.env.PORT);
server.listen(parseInt(process.env.PORT), (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
//# sourceMappingURL=main.js.map