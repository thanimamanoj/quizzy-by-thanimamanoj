import React, { useState } from "react";

import { Typography } from "@bigbinary/neetoui/v2";

import attemptsApi from "apis/attempts";

import AttemptQuizForm from "./AttemptQuizForm";

import ShowResult from "../ShowResult";

const AttemptQuiz = ({ attempt_id, quiz, question, user }) => {
  const [answer, setAnswer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      const answer_length = answer.filter(i => i != null).length;
      const response = await attemptsApi.create({
        attempt_answer: {
          answer: answer,
          attempt_id: attempt_id,
          unanswered: question.length - answer_length,
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
      <ShowResult
        correct={correct}
        incorrect={incorrect}
        quiz={quiz}
        question={question}
        user={user}
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
