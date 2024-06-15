/* eslint-disable react/prop-types */
import React from 'react';
import QuestionRadio from './QuestionRadio';

export default function Questions(props) {
  const questionsRadio = [];
  for (let idx = 0; idx < props.questions.length; idx++) {
    questionsRadio.push(
        <QuestionRadio
          questionId={props.questionId}
          selectedAnswerIdx={props.selectedAnswerIdx}
          questions={props.questions}
          correctAnswer={props.correctAnswer}
          handleClick={props.handleClick}
          content={props.questions[idx]}
          endGame={props.endGame}
          idx={idx}
          key={`${props.questionId}${idx}`}
        />,
    );
  }

  return (
    <div className="question">
      <h1 className='question-title'>{props.questionTitle}</h1>
      <div className='question-radio-container'>
        {questionsRadio}
      </div>
    </div>
  );
};
