import React, { Component } from 'react';
import Winners from './Winners';
import Generate from './ContainerGenerator';
import './ContainerGenerator';
import './index.css';

export default class GameField extends Component {

    constructor() {
        super();

        this.choices = ["x", "o"]
        this.win = false;
        this.countOfDisabled = 0;

        this.state = { text: "Выберите противника...", players: [], message: "" };

        this.roomId = -1;
        this.playerId = -1;
        this.enemyPleyerId = -1;

        let self = this;
        this.ws = new WebSocket('ws://localhost:40510');

        this.ws.onopen = function () {
            console.log("Connection started...");
        }

        this.ws.onmessage = function (ev) {
            self.parseMessage(ev);
        }
    }

    keyPressEvent(event) {
        if (event.keyCode == 13) {
            this.sendMessage();
        }
    }

    handleMessageChanges(event) {
        this.setState({
            message: event.target.value
        });
    }

    sendMessage() {
        let mes = this.state.message;
        this.ws.send(JSON.stringify({
            fromId: this.playerId,
            type: "messageAll",
            text: mes
        }));
        this.setState({
            message: ""
        });
    }

    disableButtons() {
        for (let i in this.refs) {
            this.refs[i].disabled = true;
            if (!this.win) {
                this.setState({
                    text: "Ходит противник..."
                });
            }
        }
    }

    enableButtons() {
        for (let i in this.refs) {
            if (!this.refs[i].textContent) {
                this.refs[i].disabled = false;
            }
            this.setState({
                text: "Ваш ход..."
            });
        }
    }

    endGame() {
        if (this.win || this.countOfDisabled === 9) {
            for (let i in this.refs) {
                this.refs[i].disabled = true;
            }

            if (!this.win) {
                this.setState({
                    text: "Игра окончена..."
                });
            }
            return;
        }
    }

    closeGame(fromAnotherPlayer) {
        for (let i in this.refs) {
            this.refs[i].textContent = "";
            this.refs[i].disabled = true;
        }
        if (!fromAnotherPlayer) {
            this.ws.send(JSON.stringify({
                fromId: this.playerId,
                toId: this.enemyPleyerId,
                type: "closeGame",
                roomId: this.roomId
            }));
            this.setState({
                text: "Выберите противника..."
            });
        }
        else {
            this.setState({
                text: "Противник покинул игру. Выберите противника..."
            });
        }

        this.counter = 1;
        this.win = false;
        this.countOfDisabled = 0;
    }

    refreshField() {
        for (let i in this.refs) {
            this.refs[i].textContent = "";
            this.refs[i].disabled = false;
        }

        this.counter = 1;
        this.win = false;
        this.countOfDisabled = 0;
    }

    choice(ref, fromAnother) {
        this.countOfDisabled++;

        this.counter = this.counter === 1 ? 0 : 1;

        this.refs[ref].textContent = this.choices[this.counter];

        this.refs[ref].disabled = true;

        this.checkWinner();

        this.setState({
            text: this.win
                ? (this.counter === 0 ? "Победил X!" : "Победил O!")
                : ""
        });

        if (!fromAnother) {
            this.disableButtons();
            if (!this.win) {
                this.ws.send(JSON.stringify({
                    fromId: this.playerId,
                    toId: this.enemyPleyerId,
                    type: "playerProgress",
                    text: ref,
                    roomId: this.roomId
                }));
            }
            else {
                this.ws.send(JSON.stringify({
                    fromId: this.playerId,
                    toId: this.enemyPleyerId,
                    type: "endOfGame",
                    text: ref,
                    roomId: this.roomId
                }));
            }
        }
        else {
            if (!this.win) {
                this.enableButtons();
            }
        }

        this.endGame();
    };

    checkWinner() {
        let winners = new Winners(this);

        for (let i of winners.winCombinations) {
            if (i()) {
                this.win = true;
                break;
            }
        }
    };

    parseMessage(ev) {
        let mes = JSON.parse(ev.data);

        if (mes.type === "messageAll") {
            this.refs["chat-container-ref"].innerHTML += `<p>Player${mes.fromId + 1}: ${mes.text}</p>`;
            this.refs["chat-container-ref"].scrollTo(0, this.refs["chat-container-ref"].scrollHeight);
            return;
        }

        if (mes.type === "countOfPlayers") {
            this.setState({
                players: mes.players
            });
            this.playerId = mes.playerId;
            this.closeGame(false);
        }

        if (mes.type === "requestToPlayGame") {
            if (window.confirm("Хотите начать игру?")) {
                this.ws.send(JSON.stringify({
                    fromId: this.playerId,
                    toId: mes.fromId,
                    type: "answerToRequestToPlayGame",
                    text: "ok"
                }));
                this.counter = 0;
                this.refreshField();
            }
        }

        if (mes.type === "answerToRequestToPlayGame") {
            this.refreshField();
            this.counter = 1;
            this.roomId = mes.roomId;
            this.enemyPleyerId = this.playerId === mes.fromId ? mes.toId : mes.fromId;
            if (mes.fromId === this.playerId) {
                this.disableButtons();
            }
            else {
                this.enableButtons();
            }
        }

        if (mes.type === "playerProgress"
            || mes.type === "endOfGame") {
            this.choice(mes.text, true);
        }

        if (mes.type === "closeGame") {
            this.closeGame(true);
        }
    };

    sendRequestToPlayGame(id) {
        if(id == this.playerId)
        {
            return;
        }
        if (window.confirm("Хотите начать игру?")) {
            this.ws.send(JSON.stringify({
                fromId: this.playerId,
                toId: id,
                type: "requestToPlayGame",
                text: "ok"
            }));
        }
    }

    render() {
        return Generate.call(this);
    };
}