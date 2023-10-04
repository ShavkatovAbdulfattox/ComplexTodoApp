import React, { useState } from "react";
import s from "./style.module.css";
import close from "../../assets/images/close.svg";
import board from "../../assets/images/board.svg";
import img from "../../assets/images/img.jpg";
import img2 from "../../assets/images/img2.jpg";
import img3 from "../../assets/images/img3.jpg";
import img4 from "../../assets/images/img4.jpg";

function CreateBoardModal({ width }) {
  const [value, setValue] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const handleClick = (e) => {
    const { target } = e;
    setSelectedImage(target.src); // Set the selected image src
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
      style={{ transform: `translateX(calc(${width}px + 20px))` }}
    >
      <div className={s.modal}>
        <header className={s.title}>
          <h2 title="Create board">Create board</h2>
          <button>
            <span aria-label="Close popover">
              <img src={close} alt="close" />
            </span>
          </button>
        </header>

        <div className={s.boardImg} style={modalBackgroundStyle}>
          <img src={board} alt="board-img" />
        </div>

        <div className={s.background_content}>
          <label htmlFor="background-picker">Background</label>
          <div className={s.background_images} onClick={handleClick}>
            <img src={img} alt="bg-images" />
            <img src={img2} alt="bg-images" />
            <img src={img3} alt="bg-images" />
            <img src={img4} alt="bg-images" />
          </div>
        </div>
        <form>
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
