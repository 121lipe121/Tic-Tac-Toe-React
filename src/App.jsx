import { useState } from "react";

import {
  playersName,
  defineWinner,
  deriveActivePlayer,
  deriveGameBoard,
} from "./componets/functions";

import Player from "./componets/player";
import GameBoard from "./componets/game-board";
import Log from "./componets/log";
import GameOver from "./componets/GameOver";

function App() {
  // #region Consts
  const [players, setPlayers] = useState(playersName);
  const [gameTurns, setGameTurns] = useState([]);

  const currentPlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = defineWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;
  // #endregion

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerName(symbol, newName) {
    setPlayers((prevPlayers) => {
      const updatedPlayers = { ...prevPlayers };
      updatedPlayers[symbol] = { ...updatedPlayers[symbol], name: newName };
      return updatedPlayers;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={playersName.X.name}
            symbol="X"
            isActive={currentPlayer === "X"}
            onChangeName={handlePlayerName}
            score={players.X.score}
          />
          <Player
            name={playersName.O.name}
            symbol="O"
            isActive={currentPlayer === "O"}
            onChangeName={handlePlayerName}
            score={players.O.score}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
