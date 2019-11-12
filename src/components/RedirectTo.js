import React from 'react';
import { Redirect } from 'react-router-dom'

export default function RedirectTo(props) {
  
  const newUrl = '/' + props.to;

  return (
    <Redirect to={newUrl}/>
  )
}