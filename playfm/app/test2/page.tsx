"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import "../../components/sidebar.scss";
import NavButton from "@/components/NavButton";

export default function Test2() {
  const items = [
    {
      id: 1,
      title: "React Commerce",
      img: "https://images.pexels.com/photos/18073372/pexels-photo-18073372/free-photo-of-young-man-sitting-in-a-car-on-a-night-street.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 2,
      title: "Next.js Medium Blog",
      img: "https://images.pexels.com/photos/18023772/pexels-photo-18023772/free-photo-of-close-up-of-a-person-holding-a-wristwatch.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 3,
      title: "Vanilla Book App",
      img: "https://images.pexels.com/photos/6894528/pexels-photo-6894528.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 4,
      title: "Spotify Music App",
      img: "https://images.pexels.com/photos/18540208/pexels-photo-18540208/free-photo-of-wood-landscape-water-hill.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  const [open, setOpen] = useState(false);

  const variants = {
    opened: {
      clipPath: "circle(1200px at 50px 50px)",
      transition: {
        type: "spring",
        stiffness: 20,
        staggerChildren: 0.1,
      },
    },
    closed: {
      clipPath: "circle(40px at 50px 50px)",
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    opened: {
      y: 0,
      opacity: 1,
    },
    closed: {
      y: 50,
      opacity: 0,
    },
  };

  const progressRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: progressScroll } = useScroll({
    target: progressRef,
    offset: ["end end", "start start"],
  });

  const scaleX = useSpring(progressScroll, {
    stiffness: 100,
    damping: 30,
  });

  const textContainer = {
    hidden: {
      opacity: 0,
    },
    show: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: i * 0.1 },
    }),
  };

  const textVariant2 = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'tween',
        ease: 'easeIn',
      },
    },
  };

  return (
    <motion.div
      className="h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 4 }}
    >
      <motion.div className="sidebar" animate={open ? "opened" : "closed"}>
        <motion.div className="bg" variants={variants}>
          <motion.div className="links">
            <motion.a
              href={`#`}
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Link
            </motion.a>
            <motion.a
              href={`#`}
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Link
            </motion.a>
            <motion.a
              href={`#`}
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Link
            </motion.a>
            <motion.a
              href={`#`}
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Link
            </motion.a>
          </motion.div>
        </motion.div>
        <NavButton setOpen={setOpen} openColor="#000000" />
      </motion.div>
      <div className="h-[600vh] relative" ref={ref}>
        <div className="w-screen h-[calc(100vh-6rem)] flex items-center justify-center text-8xl text-center">
          Slide Display
        </div>
        <div className="sticky top-0 flex h-screen gap-4 items-center overflow-hidden">
          <motion.div style={{ x }} className="flex">
            <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-purple-300 to-red-300" />
            {items.map((item) => (
              <div
                className={`h-screen w-screen flex items-center justify-center`}
                key={item.id}
              >
                <div className="flex flex-col gap-8 text-white">
                  <h1 className="text-xl font-bold md:text-4xl lg:text-6xl xl:text-8xl">
                    {item.title}
                  </h1>
                  <div className="relative w-80 h-56 md:w-96 md:h-64 lg:w-[500px] lg:h-[350px] xl:w-[600px] xl:h-[420px]">
                    <Image src={item.img} alt="" fill />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="h-96 w-screen flex bg-amber-500">
        <motion.h1
          className="cursor-pointer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 3 }}
          whileHover={{ scale: 1.1, color: "red", x: 10, y: 30 }}
          whileTap={{ scale: 0.85, color: "blue" }}
        >
          test 3 while events
        </motion.h1>
      </div>
      <div className="relative" ref={progressRef}>
        <div className="sticky top-0 left-0 pt-12 text-center text-orange-500 text-3xl">
          <h1>Features</h1>
          <motion.div
            style={{ scaleX }}
            className="h-[10px] bg-white"
          ></motion.div>
        </div>
        <div className="h-96 w-screen flex bg-red-500">
          <motion.p
            variants={textContainer}
            initial="hidden"
            whileInView="show"
            className={`font-normal text-[14px] text-secondary-white`}
          >
            {Array.from("content typing here...").map((letter, index) => (
              <motion.span variants={textVariant2} key={index}>
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.p>
        </div>
        <div className="h-96 w-screen flex bg-gray-400">...content</div>
        <div className="h-96 w-screen flex bg-lime-300">...content</div>
      </div>
      <div className="h-96 w-screen flex bg-sky-500">...content</div>
      <div className="h-96 w-screen flex bg-sky-500">...content</div>
      <div className="h-96 w-screen flex bg-sky-500">...content</div>
      <div className="h-96 w-screen flex bg-sky-500">...content</div>
    </motion.div>
  );
}
