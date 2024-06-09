import React from 'react';
import Questions from './Question';
import {nanoid} from 'nanoid';
import {decode} from 'html-entities';
// import Confetti from 'react-confetti';
import './styles.css';

const OTDBAPI = 'https://opentdb.com/api.php?amount=5';

export default function App() {
  const [endQuiz, setEndQuiz] = React.useState(false);
  const [startQuiz, setStartQuiz] = React.useState(false);
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
    const signal = controller.signal;

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

    fetch(OTDBAPI, {signal: signal})
        .then((result) => result.json())
        .then((resJSON) => resJSON.results.map((object) =>
          generateNewQuestionObject(object)))
        .then((questionObjects) => setQuestionArray(questionObjects));
    return () => controller.abort();
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

  const restartGame = () => {
    setEndQuiz(false);
    setStartQuiz(false);
  };

  const questionsElement = questionArray.map((questionObject) =>
    <Questions
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
      {startQuiz && <div className='questions-container'>
        {questionsElement}
      </div>}
      {startQuiz && !endQuiz &&
      <button
        className='question-endgame-button'
        onClick={() => setEndQuiz(true)}>
        End game
      </button>}
      {startQuiz && endQuiz &&
      <div className='question-restart-container'>
        <h1 className='question-correct-answer'>
          {`You answered ${correctAnswer(questionArray)}/${questionArray.length}
          questions correctly!`}
        </h1>
        <button
          className='question-restart-button'
          onClick={restartGame}>
          Restart Game
        </button>
      </div>}
      {/* {startQuiz && endQuiz &&
      correctAnswer(questionArray) == questionArray.length && <Confetti />} */}
    </>
  );
}
