/* eslint-disable react/prop-types */
import Link from 'next/link';
import React from 'react';

export default function Intro() {
  return (
    <div id='root'>
      <div className='intro-container'>
        <h1 className='intro-title'>Quizzical</h1>
        <h2 className='intro-desc'>A trivia website using OpenTrivia API</h2>
        <Link className='intro-button' href={'/quiz'}>
          Start Quiz
        </Link>
      </div>
    </div>
  );
}
