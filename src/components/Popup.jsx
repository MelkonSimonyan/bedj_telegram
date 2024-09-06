import React from "react";
import { motion } from "framer-motion";
import { BiMessageAltError } from "react-icons/bi";
import { fadeAnimation } from "../lib/constants";

function Popup({ type, children }) {
  return (
    <motion.div
      variants={fadeAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      className="popup"
    >
      <div className="popup__bg"></div>
      <div className="popup__window">
        {type == "error" && (
          <div className="popup__window-icon color-error">
            <BiMessageAltError />
          </div>
        )}
        {children}
      </div>
    </motion.div>
  );
}

export default Popup;
