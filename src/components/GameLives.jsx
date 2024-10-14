import React from "react";
import { useGame } from "../context/gameContext";
import { MdStar } from "react-icons/md";

function GameLives() {
  const { lives, totalLives } = useGame();

  return (
    <div className="lives">
      {[...Array(totalLives)].map((e, i) => (
        <span
          className={`lives__item ${i + 1 > lives ? "" : "is-active"}`}
          key={i}
        >
          <MdStar />
        </span>
      ))}
    </div>
  );
}

export default GameLives;
