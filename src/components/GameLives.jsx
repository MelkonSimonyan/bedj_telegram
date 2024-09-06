import React from "react";
import { useGame } from "../context/gameContext";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";

function GameLives() {
  const { lives, totalLives } = useGame();

  return (
    <div className="lives">
      {[...Array(totalLives)].map((e, i) => (
        <span className="lives__item" key={i}>
          {totalLives - i > lives ? <IoHeartOutline /> : <IoHeartSharp />}
        </span>
      ))}
    </div>
  );
}

export default GameLives;
