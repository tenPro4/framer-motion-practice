import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";

const NavButton = ({
  setOpen,
  openColor
}: {
  setOpen: Dispatch<SetStateAction<boolean>>,
  openColor:string
}) => {
  const topVariants = {
    closed: {
      rotate: 0,
    },
    opened: {
      rotate: 45,
      backgroundColor: openColor,
    },
  };
  const centerVariants = {
    closed: {
      opacity: 1,
    },
    opened: {
      opacity: 0,
    },
  };

  const bottomVariants = {
    closed: {
      rotate: 0,
    },
    opened: {
      rotate: -45,
      backgroundColor: openColor,
    },
  };

  return (
    <button
      className="w-10 h-8 flex flex-col justify-between z-50 relative"
      onClick={() => setOpen((prev) => !prev)}
    >
      <motion.div
        variants={topVariants}
        className="w-10 h-1 bg-black rounded origin-left"
      ></motion.div>
      <motion.div
        variants={centerVariants}
        className="w-10 h-1 bg-black rounded"
      ></motion.div>
      <motion.div
        variants={bottomVariants}
        className="w-10 h-1 bg-black rounded origin-left"
      ></motion.div>
    </button>
  );
};

export default NavButton;
