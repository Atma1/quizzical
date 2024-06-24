'use client';
import Confetti from 'react-confetti';
import Intro from './components/Intro';

export default function Home() {
  return (
    <>
      <Confetti
        numberOfPieces={100}/>
      <Intro />
    </>
  );
}
