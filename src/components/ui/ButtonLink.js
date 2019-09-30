import React from 'react';
import {Button, makeStyles} from "@material-ui/core";

export default function ButtonLink({text, handleClick}) {
  return (
    <button style={{
      background: 'none',
      border: 'none',
      padding: 0,
      textDecoration: 'underline',
      cursor: 'pointer',
      textAlign: 'left'
    }} onClick={handleClick}>
      <h2>{text}</h2>
    </button>
  )
}