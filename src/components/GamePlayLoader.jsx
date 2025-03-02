import React from "react";
import { motion } from "framer-motion";
import { fadeAnimation } from "../lib/constants";

function GamePlayLoader() {
  return (
    <motion.div
      variants={fadeAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      className="game__play-screen-loader"
    >
      <div className="game__play-screen-loader-circle">
        <img src="assets/images/loader-circle.svg" alt="" />
      </div>
      <div className="game__play-screen-loader-content">
        <div className="game__play-screen-loader-icon-0">
          <img src="assets/images/loader-icon-0.svg" alt="" />
        </div>
        <div className="game__play-screen-loader-title">
          Миксуй как
          <br /> топовый DJ
        </div>
        <div className="game__play-screen-loader-icon-1">
          <img src="assets/images/loader-icon-1.svg" alt="" />
          <img src="assets/images/loader-icon-1.svg" alt="" />
        </div>
        <div className="game__play-screen-loader-icon-2">
          <img src="assets/images/loader-icon-2.svg" alt="" />
        </div>
      </div>
    </motion.div>
  );
}

export default GamePlayLoader;
