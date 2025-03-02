import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fadeAnimation } from "../lib/constants";

function GameHelpBg({ timerVisible }) {
  return (
    <div className="play-help-bg">
      <AnimatePresence>
        {!timerVisible.find((item) => item) && (
          <motion.div
            variants={fadeAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            className="play-help-bg__content"
          >
            <div className="play-help-bg__icon-1">
              <img src="assets/images/loader-icon-1.svg" alt="" />
            </div>
            <div className="play-help-bg__icon-2">
              <img src="assets/images/loader-icon-3.svg" alt="" />
            </div>
            <div className="play-help-bg__icon-3">
              <img src="assets/images/loader-icon-4.svg" alt="" />
            </div>
            <div className="play-help-bg__title">
              Следуй
              <br /> подсказкам
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default GameHelpBg;
