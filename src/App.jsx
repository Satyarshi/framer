import React, { useRef } from "react";
import "./App.css";
import { useScroll, useTransform, motion } from "framer-motion";

const App = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Text and image animations
  const textScale = useTransform(scrollYProgress, [0, 1], [50, 1]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Chained y animation for the text after it has fully appeared
  const textY = useTransform(scrollYProgress, [0.5, 1], [0, -250]);

  // Box animations
  const boxOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
  const boxY = useTransform(scrollYProgress, [0.8, 1], [-750, 0]); // Adjust based on the container height and desired effect

  return (
    <>
      <div className="container" ref={containerRef}>
        <div className="fullImage">
          <motion.img
            src="/assets/img.svg"
            alt="background"
            style={{ scale: imageScale, opacity: imageOpacity }}
            transition={{ duration: 0.2 }} // Smooth transition for image
          />
        </div>
        <div className="sticky">
          <div className="el">
            <motion.div
              className="textContainer"
              style={{
                scale: textScale,
                opacity: textOpacity,
                y: textY, // Add vertical movement
              }}
              transition={{ duration: 0.2 }}
            >
              mydayone
            </motion.div>
          </div>
        </div>
      </div>
      <div className="box">
        <motion.div
          className="box1"
          style={{
            opacity: boxOpacity,
            y: boxY, // Animate vertical movement of the box
          }}
          transition={{ duration: 0.2 }}
        ></motion.div>
      </div>
    </>
  );
};

export default App;
