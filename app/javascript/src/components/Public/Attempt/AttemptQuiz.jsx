import React, { useState } from "react";

//import { useParams } from "react-router";
import { Typography } from "@bigbinary/neetoui/v2";

import attemptsApi from "apis/attempts";

import AttemptQuizForm from "./AttemptQuizForm";

const AttemptQuiz = ({ attempt_id, quiz, question }) => {
  //const { slug } = useParams();
  const [answer, setAnswer] = useState([]);
  const [loading, setLoading] = useState(false);
  //const [showResult, setShowResult] = useState(false)
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
      response;
      //console.log("in permit params")
      //console.log(response.data.attempt_answer)
      setLoading(false);
      // setShowResult(true);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const handleAnswerChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...answer];
    //list[index] = {[name]: value};
    list[index] = [name, value];
    //console.log(index);
    setAnswer(list);
    //console.log(answer);
  };
  return (
    <div>
      {JSON.stringify(answer)}
      <Typography className="my-6 ml-4" style="h1">
        Quizzy
      </Typography>
      <hr />
      <Typography style="h2" className="my-6 ml-4 text-gray-600">
        {quiz?.name}
      </Typography>
      <AttemptQuizForm
        quiz={quiz}
        question={question}
        setAnswer={setAnswer}
        loading={loading}
        handleAnswerChange={handleAnswerChange}
        answer={answer}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AttemptQuiz;
