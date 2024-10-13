"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import hover3d from "@/utils/hover";

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

export default function Home() {
  const testRef = useRef<HTMLDivElement>(null);
  const isRefInView = useInView(testRef, { margin: "-100px" });

  const imageRef = useRef<HTMLImageElement>(null);
  const imageHover = hover3d(imageRef, {
    x: 20,
    y: -5,
    z: 11,
  });

  const horizonRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: translateX } = useScroll({
    target: horizonRef,
    offset: ["start end", "end start"],
  });
  const xTransform = useTransform(translateX, [0, 0.1, 1], [0, 0, -1400]);

  const scaleRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress:scaleProgress } = useScroll({
    target: scaleRef,
  });
  const scale = useTransform(
    scaleProgress,
    [0, 0.6, 0.8, 0.9],
    [1, 0.8, 0.6, 0.5]
  );

  return (
    <motion.div
      className="h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 4 }}
    >
      <div className="h-screen w-screen flex justify-center bg-red-600">
        <div className="flex items-center">
          <motion.div 
          initial={{opacity:0,rotateY:360}}
          animate={{opacity:1,rotateY:0}}
          transition={{duration:4,delay:4}}
          className="p-[1rem] rounded-lg border-solid border flex items-center"
          >
          <Image
            ref={imageRef}
            src="https://images.pexels.com/photos/18073372/pexels-photo-18073372/free-photo-of-young-man-sitting-in-a-car-on-a-night-street.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt="hero"
            className="rounded-lg h-[400px] w-[400px]"
            width={400}
            height={400}
            style={{
              transform: imageHover.transform,
            }}
          />
          </motion.div>

        </div>
      </div>
      <div className="h-full flex w-screen bg-lime-300" ref={horizonRef}>
        <div className="flex items-center overflow-hidden">
          <motion.div style={{ x: xTransform }} className="flex gap-4">
            {items.map((item) => (
              <div className="flex items-center justify-center" key={item.id}>
                <div className="relative w-80 h-56 gap-4">
                  <Image src={item.img} alt="" fill />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="flex" ref={testRef}>
        <motion.div
          initial={{ x: "-300px", opacity: 0 }}
          animate={isRefInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 2, ease: "easeIn", repeat: 0 }}
        >
          <div className="rounded p-2 bg-black text-white">smooth element</div>
        </motion.div>
      </div>

      <div className="h-full flex flex-col w-screen bg-amber-300">
        {[0, 1, 2, 3, 4, 5, 6].map((x) => (
          <TextWrapper>
             Lorem ipsum dolor, sit amet consectetur adipisicing
          </TextWrapper>
        ))}
      </div>

      <div className="h-screen flex w-screen bg-sky-500">
          <motion.div
            ref={scaleRef}
            style={{
              scale,
            }}
          >
          <Image
            src="https://images.pexels.com/photos/18073372/pexels-photo-18073372/free-photo-of-young-man-sitting-in-a-car-on-a-night-street.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt="hero"
            className="rounded-lg h-[400px] w-[400px]"
            width={400}
            height={400}
          />
          </motion.div>
      </div>
      <div className="h-screen flex w-screen bg-blue-700">...content</div>
      <div className="h-screen flex w-screen bg-blue-700">...content</div>
      <div className="h-screen flex w-screen bg-blue-700">...content</div>
    </motion.div>
  );
}

const TextWrapper = ({ children }: { children: React.ReactNode }) => {
  const text = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: text,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [1, 0.8, 0], [1, 1, 0]);
  const x = useTransform(scrollYProgress, [1, 0.4, 0], [0, 0, -1000]);

  return (
    <div ref={text}>
      <motion.h1 className="text-2xl space-y-8 font-extrabold" style={{ opacity, x }}>{children}</motion.h1>
    </div>
  );
};
