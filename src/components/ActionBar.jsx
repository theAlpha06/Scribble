import React from "react";
import './ActionBar.css';
import { FaPen, FaMouse, FaEraser } from "react-icons/fa";

const ActionBar = () => {
  return (
      <div className='action_bar'>
        <ul className='icons'>
          <li className='icon'><FaPen /></li>
          <li className='icon'><FaMouse /></li>
          <li className='icon'><FaEraser /></li>
        </ul>
      </div>
  )
}

export default ActionBar;