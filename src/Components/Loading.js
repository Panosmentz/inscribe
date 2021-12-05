import * as React from "react";
import { motion } from "framer-motion";

function Loading() {
  return (
    <motion.svg
      width={50}
      height={50}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M5,50a45,45 0 1,0 90,0a45,45 0 1,0 -90,0"
        fill="transparent"
        stroke="black"
        strokeWidth={10}
        strokeLinecap="round"
        initial={{
          pathLength: 0,
        }}
        animate={{
          pathLength: 1,
        }}
        transition={{
          duration: 1,
          yoyo: Infinity,
        }}
      />
    </motion.svg>
  );
}

export default Loading;
