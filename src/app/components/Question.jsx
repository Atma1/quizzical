/* eslint-disable react/prop-types */
import React from 'react';
import {decode} from 'html-entities';

export default function Questions(props) {
  const QuestionRadio = (props) => {
    const selected = props.selectedAnswerIdx == props.idx;
    const isCorrect = props.content == props.correctAnswer;
    let color;
    let border;
    let opacity;

    if (selected && !props.endGame) {
      color = '#D6DBF5';
      border = 'none';
    } else if (props.endGame && isCorrect) {
      color = '#94D7A2';
      border = 'none';
    } else if (selected && props.endGame && !isCorrect) {
      color = '#F8BCBC';
      border = 'none';
    } else {
      'white';
    }

    if (props.endGame && !isCorrect) {
      opacity = '70%';
    }

    const styles = {
      background: color,
      border: border,
      opacity: opacity,
    };

    return (
      <>
        <div className="question-radio" style={styles}>
          <label style={styles} className='question-radio-label'>
            <input
              type='radio'
              value={decode(props.content)}
              checked={selected}
              onChange={() => props.handleClick(props.questionId, props.idx)}
              name={props.questionId}
              className='question-radio-button'
            />
            {decode(props.content)}
          </label>
        </div>
      </>);
  };

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
}
