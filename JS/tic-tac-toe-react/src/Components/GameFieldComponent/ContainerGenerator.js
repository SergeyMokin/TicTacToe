import React from 'react';

export default function Generate() {
    return (
        <div className="main-field-container">
            <div className="players-container">
                {this.state.players.map((i, index) => <div key={index} style={{ "cursor": "pointer" }} onClick={() => this.sendRequestToPlayGame(index)}>{index === this.playerId ? `Your account (Player${index + 1})` : `Player${index + 1}`}</div>)}
            </div>
            <div className="chat-container" ref="chat-container-ref">
            </div>
            <div className="chat-input">
                <input type="text" value={this.state.message} onChange={this.handleMessageChanges.bind(this)} onKeyDown={this.keyPressEvent.bind(this)} />
                <button onClick={this.sendMessage.bind(this)}>send</button>
            </div>
            <span>{this.state.text}</span>
            <table className="table-main-container">
                <tbody>
                    <tr>
                        <td className="td-center-main-container">
                            <button className="button-def cell-main-container" onClick={() => this.choice("1x1", false)} ref="1x1">
                            </button>
                        </td>
                        <td className="td-center-main-container">
                            <button className="button-def cell-main-container" onClick={() => this.choice("1x2", false)} ref="1x2">
                            </button>
                        </td>
                        <td className="td-right-main-container">
                            <button className="button-def cell-main-container" onClick={() => this.choice("1x3", false)} ref="1x3">
                            </button>
                        </td>
                    </tr>

                    <tr>
                        <td className="td-center-main-container">
                            <button className="button-def cell-main-container" onClick={() => this.choice("2x1", false)} ref="2x1">
                            </button>
                        </td>
                        <td className="td-center-main-container">
                            <button className="button-def cell-main-container" onClick={() => this.choice("2x2", false)} ref="2x2">
                            </button>
                        </td>
                        <td className="td-right-main-container">
                            <button className="button-def cell-main-container" onClick={() => this.choice("2x3", false)} ref="2x3">
                            </button>
                        </td>
                    </tr>

                    <tr>
                        <td className="td-bottom-main-container">
                            <button className="button-def cell-main-container" onClick={() => this.choice("3x1", false)} ref="3x1">
                            </button>
                        </td>
                        <td className="td-bottom-main-container">
                            <button className="button-def cell-main-container" onClick={() => this.choice("3x2", false)} ref="3x2">
                            </button>
                        </td>
                        <td>
                            <button className="button-def cell-main-container" onClick={() => this.choice("3x3", false)} ref="3x3">
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button onClick={() => this.closeGame(false)}>Close game</button>
        </div>
    );
};