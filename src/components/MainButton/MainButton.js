import React from "react";
import classes from "./MainButton.module.scss";

const MainButton = ({ text }) => {
  return (
    <div className={classes.MainButton}>
      <button data-content={text}>{text}</button>
    </div>
  );
};

export default MainButton;
