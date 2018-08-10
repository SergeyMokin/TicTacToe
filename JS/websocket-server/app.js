let http = require('http');
let WebSocketServer = require('websocket').server;
let WebSocketServerPort = process.env.PORT || 40510;

let clients = [];
let rooms = [];

let server = http.createServer(function (request, response) {
    response.send("Application start...");
});

server.listen(WebSocketServerPort, function () {
    console.log((new Date()) + " Server is listening on port "
        + WebSocketServerPort);
});

let ws = new WebSocketServer({
    httpServer: server
});

ws.on('request', (request) => {
    console.log((new Date()) + ' Connection from origin '
        + request.origin + '.');

    let connection = request.accept(null, request.origin);

    let index = clients.push({ key: request.key, connection: connection }) - 1;

    let indexOfClient = 0;

    for (let client of clients) {
        client.connection.send(JSON.stringify({
            type: "countOfPlayers", players: clients.map((c) => c.key), playerId: indexOfClient++
        }));
    }

    connection.on('message', (message) => {
        try {
            let mes = JSON.parse(message.utf8Data);

            if(mes.type === "messageAll")
            {
                for(let client of clients)
                {
                    client.connection.send(JSON.stringify(mes));
                }
                return;
            }

            if (mes.type === "answerToRequestToPlayGame") {
                mes.roomId = rooms.push({
                    playerOne: mes.fromId,
                    playerTwo: mes.toId,
                    numberOfProgress: 0
                }) - 1;

                clients[mes.toId].connection.send(JSON.stringify(mes))

                clients[mes.fromId].connection.send(JSON.stringify(mes))

                return;
            }

            if (mes.type === "playerProgress") {
                rooms[mes.roomId].numberOfProgress++;
            }

            if (mes.type === "endOfGame") {
                rooms.splice(mes.roomId, 1);
            }

            if (mes.toId >= 0) {
                clients[mes.toId].connection.send(JSON.stringify(mes));
            }
        }
        catch (ex) { 
            console.log(ex);
        }
    })

    connection.on('close', (connection) => {
        clients.splice(index, 1);

        let indexOfClient = 0;

        for (let client of clients) {
            client.connection.send(JSON.stringify({
                type: "countOfPlayers", players: clients.map((c) => c.key), playerId: indexOfClient++
            }));
        }
        console.log((new Date()) + " --- "
            + connection + " disconnected.");
    });
})