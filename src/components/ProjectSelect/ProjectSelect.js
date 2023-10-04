import React, { useEffect, useRef, useState } from "react";
import plus from "../../assets/images/plus.svg";
import s from "./style.module.css";
import { motion } from "framer-motion";
import CreateBoardModal from "./CreateBoardModal";

function ProjectSelect() {
  const [isVisible, setIsVisible] = useState(true);
  const [width, setWidth] = useState(null);
  const widthBox = useRef(null);

  useEffect(() => {
    let width = widthBox.current.getBoundingClientRect().width;
    setWidth(width);
    console.log(width);
  }, []);

  return (
    <div className="container">
      {isVisible && <CreateBoardModal width={width} />}

      <motion.button
        whileTap={{ scale: 0.9 }}
        className={s.button}
        ref={widthBox}
      >
        Create new board <img src={plus} alt="plus-icon" />
      </motion.button>
    </div>
  );
}

export default ProjectSelect;
