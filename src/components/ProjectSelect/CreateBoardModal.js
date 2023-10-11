import React, { useEffect, useRef, useState } from "react";
import s from "./style.module.css";
import closeIcon from "../../assets/images/close.svg";
import board from "../../assets/images/board.svg";
import img from "../../assets/images/img.jpeg";
import img2 from "../../assets/images/img2.jpeg";
import img3 from "../../assets/images/img3.jpeg";
import img4 from "../../assets/images/img4.jpeg";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

function CreateBoardModal({ width, close, create }) {
  const [value, setValue] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImgNum, setSelectedImgNum] = useState(0);
  const modalRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const board = {
      id: uuidv4(),
      name: value,
      img: selectedImage,
      renderImgNo: selectedImgNum,
      tasks: {
        "task-1": { id: "task-1", content: "water plants" },
        "task-2": { id: "task-2", content: "buy oat milk" },
        "task-3": { id: "task-3", content: "build a trello board" },
        "task-4": { id: "task-4", content: "have a beach day" },
        "task-5": { id: "task-5", content: "build tic tac toe" },
      },
      cards: {
        do: {
          id: "do",
          title: "Do",
          taskIds: ["task-1", "task-2"],
        },
        doing: {
          id: "doing",
          title: "Doing",
          taskIds: ["task-3"],
        },
        done: {
          id: "done",
          title: "Done",
          taskIds: ["task-3"],
        },
      },
      cardOrder: ["do", "doing", "done"],
    };

    // Create board
    create(board);
    //Close the board
    close(false);
  };

  const handleClick = (e) => {
    const { target } = e;
    const numberImg = target.dataset.num;
    // Check if the clicked element has the "img" class
    if (!target.tagName.toLowerCase() === "img") return;
    setSelectedImage(target.src); // Set the selected image src
    setSelectedImgNum(numberImg);
  };

  const modalBackgroundStyle = {
    backgroundImage: `url(${selectedImage})`, // Use the selected image src
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  return (
    <section
      className={s.wrapper}
      role="createProject-modal"
      style={{ transform: `translateX(${width + 15}px)` }}
    >
      <div className={s.modal} ref={modalRef}>
        <header className={s.title}>
          <h2 title="Create board">Create board</h2>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => close(false)}>
            <span aria-label="Close popover">
              <img src={closeIcon} alt="close" />
            </span>
          </motion.button>
        </header>

        <div className={s.boardImg} style={modalBackgroundStyle}>
          <img src={board} alt="board-img" />
        </div>

        <div className={s.background_content}>
          <label htmlFor="background-picker">Background</label>
          <div className={s.background_images} onClick={handleClick}>
            <img src={img} alt="bg-images" loading="lazy" data-num="0" />
            <img src={img2} alt="bg-images" loading="lazy" data-num="1" />
            <img src={img3} alt="bg-images" loading="lazy" data-num="2" />
            <img src={img4} alt="bg-images" loading="lazy" data-num="3" />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <label className={s.form_title}>
            <div>
              Board title<span className={s.star}>*</span>
            </div>
            <input
              style={{
                border: `${value.length <= 0 ? "2px solid #EF5C48" : "none"}`,
              }}
              type="text"
              required={true}
              autoComplete="off"
              spellCheck="false"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </label>
          <div className={s.form_text}>
            <span role="img" aria-label="wave">
              👋
            </span>
            <p>Board title is required</p>
          </div>
          <button className={s.create_btn} style={{}} disabled={!value}>
            Create
          </button>
        </form>
      </div>
    </section>
  );
}

export default CreateBoardModal;
