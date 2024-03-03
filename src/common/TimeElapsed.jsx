import React from 'react';
import TimeAgo from 'react-timeago';
import frenchStrings from 'react-timeago/lib/language-strings/es';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import { capitalizarPalabras } from './upperCaseWord';

const formatter = buildFormatter(frenchStrings);

export const TimeElapsed = ({ date }) => {
  // Verifica si la fecha es válida
  if (date === null || date === undefined) {
    return <p>Fecha no valida</p>;
  }

  
  return (
    <TimeAgo date={date} formatter={formatter}/>
  );
}
