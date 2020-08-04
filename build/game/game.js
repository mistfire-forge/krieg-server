"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerGameHandler = void 0;
const fastifyWebSocket = require("fastify-websocket");
exports.registerGameHandler = (fastify) => {
    fastify.register(fastifyWebSocket);
    fastify.get('/game', { websocket: true }, (connection, req) => {
        const socket = connection.socket;
        socket.on('message', message => {
            console.log(message);
            socket.send('Hi from server!');
        });
        socket.on('close', () => {
            console.log('Connection Closed');
        });
        socket.on('end', () => {
            console.log('Connection ended');
        });
        socket.on('error', () => {
            console.log('Error');
        });
    });
};
//# sourceMappingURL=game.js.map