import React from "react";
import classes from './ActionBar.module.css';
import { FaPen, FaMouse, FaEraser } from "react-icons/fa";
import { IoExit } from "react-icons/io5";

const ActionBar = () => {

  const handleExit = () => {
    const actionContainer = document.getElementById('scrible-root-container');
    actionContainer.remove();
  }
  return (
    <div className={classes.action_bar}>
      <ul className={classes.icons}>
        <li className={classes.icon}><FaPen /></li>
        <li className={classes.icon}><FaMouse /></li>
        <li className={classes.icon}><FaEraser /></li>
        <li onClick={handleExit} className={classes.icon}><IoExit /></li>
      </ul>
    </div>
  )
}

export default ActionBar;