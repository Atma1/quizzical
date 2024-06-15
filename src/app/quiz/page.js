'use client';

import React from 'react';
import Question from '../components/Question';
import {nanoid} from 'nanoid';
import {decode} from 'html-entities';
import Link from 'next/link';

const OTDBAPI = 'https://opentdb.com/api.php?amount=5';

export default function Quiz() {
  const [endQuiz, setEndQuiz] = React.useState(false);
  const [questionArray, setQuestionArray] = React.useState([]);

  const shuffleArray = (array) => (
    array.sort(() => Math.random() - 0.5)
  );


  const correctAnswer = (questionArray) => {
    let correct = 0;
    questionArray.forEach((questionObject) => {
      if (questionObject.selectedAnswer == questionObject.correctAnswer) {
        correct += 1;
      }
    });
    return correct;
  };

  React.useEffect(() => {
    const controller = new AbortController();

    const generateNewQuestionObject = (object) => {
      const questionOptions = [object.correct_answer, ...object.incorrect_answers];
      const shuffledQuestionsOption = shuffleArray(questionOptions);
      return {
        questionTitle: decode(object.question),
        correctAnswer: object.correct_answer,
        questionId: nanoid(),
        questions: shuffledQuestionsOption,
        selectedAnswerIdx: undefined,
        selectedAnswer: undefined,
      };
    };
    fetch(OTDBAPI, {signal: controller.signal})
        .then((result) => {
          if (!controller.signal.aborted) {
            return result.json();
          }
        })
        .then((resJSON) => {
          if (resJSON) {
            return resJSON.results.map((object) => generateNewQuestionObject(object));
          }
        })
        .then((questionObjects) => {
          if (questionObjects) {
            setQuestionArray(questionObjects);
          }
        })
        .catch((error) => {
          if (error.name === 'AbortError') {
            console.log('Fetch aborted');
          } else {
            console.error('Fetch error: ', error);
          }
        });
    return () => {
      controller.abort();
    };
  }, []);

  const handleClick = (clickedQuestionId, selectedQuestionIdx) => {
    const updatedQuestionArray = questionArray.map((questionObject) => ({
      ...questionObject,
      'selectedAnswerIdx': questionObject.questionId == clickedQuestionId ?
        selectedQuestionIdx : questionObject.selectedAnswerIdx,
      'selectedAnswer': questionObject.questionId == clickedQuestionId ?
      questionObject.questions[selectedQuestionIdx] :
      questionObject.selectedAnswer,
    }));
    setQuestionArray(updatedQuestionArray);
  };

  const questionsElement = questionArray.map((questionObject) =>
    <Question
      key={questionObject.questionId}
      handleClick={handleClick}
      questionTitle={questionObject.questionTitle}
      questions={questionObject.questions}
      selectedAnswerIdx={questionObject.selectedAnswerIdx}
      questionId={questionObject.questionId}
      correctAnswer={questionObject.correctAnswer}
      endGame={endQuiz}
    />);

  return (
    <>
      <div className='questions-container'>
        {questionsElement}
      </div>
      {!endQuiz &&
      <button
        className='question-endgame-button'
        onClick={() => setEndQuiz(true)}>
        End game
      </button>}
      {endQuiz &&
      <div className='question-restart-container'>
        <h1 className='question-correct-answer'>
          {`You answered ${correctAnswer(questionArray)}/${questionArray.length}
          questions correctly!`}
        </h1>
        <Link href={'/'} className='question-restart-button'>
          Restart Game
        </Link>
      </div>}
    </>
  );
}
