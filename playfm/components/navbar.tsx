"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import NavButton from "./NavButton";

const links = [
  { url: "/", title: "test1" },
  { url: "/test2", title: "test2" },
  { url: "/test3", title: "test3" },
  { url: "/contact", title: "test4" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const listVariants = {
    closed: {
      x: "100vw",
    },
    opened: {
      x: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const listItemVariants = {
    closed: {
      x: -10,
      opacity: 0,
    },
    opened: {
      x: 0,
      opacity: 1,
    },
  };

  return (
    <div className="h-full flex justify-between">
         {links.map((link) => (
              <motion.div
                variants={listItemVariants}
                className="text-black"
                key={link.title}
              >
                <Link href={link.url}>{link.title}</Link>
              </motion.div>
            ))}
      <motion.div className="flex justify-end" animate={open ? "opened" : "closed"}>
        <NavButton setOpen={setOpen} openColor="rgb(255,255,255)"/>
      </motion.div>
      {open && (
          <motion.div
            variants={listVariants}
            initial="closed"
            animate="opened"
            className="absolute top-0 left-0 w-screen h-screen bg-black text-white flex flex-col items-center justify-center gap-8 text-4xl z-40"
          >
            {links.map((link) => (
              <motion.div
                variants={listItemVariants}
                className=""
                key={link.title}
              >
                <Link href={link.url}>{link.title}</Link>
              </motion.div>
            ))}
          </motion.div>
        )}
    </div>
  );
};

export default Navbar;
