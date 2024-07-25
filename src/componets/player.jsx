import { useState } from "react";

export default function Player({ name, symbol, isActive, onChangeName, score }) {
  const [isEditing, setIsEditing] = useState(false);
  const [player, setPlayer] = useState(name);

  function handleEdit() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      console.log(onChangeName(symbol, player))
    }
  }

  function handleChange(event) {
    setPlayer(event.target.value);
  }

  let playerName = <span className="player-name">{player}</span>;
  if (isEditing) {
    playerName = (
      <input type="text" required value={player} onChange={handleChange} />
    );
  }

  return (
    <>
      <li className={isActive ? "active" : undefined}>
        <span className="player">
          {playerName}
          <span className="player-symbol">{symbol} </span>
          <span className="player-symbol">Score: {score} </span>
        </span>
        <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
      </li>
    </>
  );
}
