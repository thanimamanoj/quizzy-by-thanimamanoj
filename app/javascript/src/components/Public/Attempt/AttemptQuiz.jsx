import React, { useState } from "react";

import { Typography } from "@bigbinary/neetoui/v2";

import attemptsApi from "apis/attempts";

import AttemptQuizForm from "./AttemptQuizForm";
import QuizResult from "./QuizResult";

const AttemptQuiz = ({ attempt_id, quiz, question }) => {
  const [answer, setAnswer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await attemptsApi.create({
        attempt_answer: {
          answer: answer,
          attempt_id: attempt_id,
        },
      });
      setCorrect(response.data.attempt_answer.correct_count);
      setIncorrect(response.data.attempt_answer.incorrect_count);
      setLoading(false);
      setShowResult(true);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const handleAnswerChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...answer];
    list[index] = [name, value];
    setAnswer(list);
  };
  if (showResult) {
    return (
      <QuizResult
        quiz={quiz}
        question={question}
        answer={answer}
        correct={correct}
        incorrect={incorrect}
      />
    );
  }

  return (
    <div>
      {/* {JSON.stringify(answer)} */}
      <Typography className="my-6 ml-4" style="h1">
        Quizzy
      </Typography>
      <hr />
      <Typography style="h2" className="my-6 ml-4 text-gray-600">
        {quiz?.name}
      </Typography>
      <AttemptQuizForm
        question={question}
        setAnswer={setAnswer}
        loading={loading}
        handleAnswerChange={handleAnswerChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AttemptQuiz;
