import React, { useEffect, useState } from "react";

import { CheckCircle } from "@bigbinary/neeto-icons";
import { Typography, Label, Radio } from "@bigbinary/neetoui/v2";

import attemptsApi from "apis/attempts";

const ShowResult = ({ correct, incorrect, quiz, question, user }) => {
  const [answer, setAnswer] = useState([]);

  const fetchAttemptDetails = async () => {
    try {
      const response = await attemptsApi.getAttempt(user.attempt_id);
      setAnswer(response.data.attempt.ans);
    } catch (error) {
      logger.error(error);
    }
  };
  useEffect(() => {
    fetchAttemptDetails();
  }, []);
  return (
    <div>
      <Typography className="my-6 ml-6" style="h1">
        Quizzy
      </Typography>
      <hr />
      <Typography style="h2" className="my-6 ml-6 text-gray-600">
        {quiz?.name}
      </Typography>
      <Typography style="body1" className="ml-6">
        {`Thank you for taking the quiz, here are your results. You have submitted
        ${correct} correct and ${incorrect} incorrect answers.`}
      </Typography>
      {question?.map((ques, index) => (
        <div key={ques.id} className="px-4 py-3 my-2  ml-24 ">
          <div className="flex ">
            <Label>{`Question ${index + 1}`}</Label>
            <Typography className="ml-24" style="body1">
              {ques.title}
            </Typography>
          </div>
          <Radio className="ml-24 space-y-4" stacked>
            <div className="flex my-2">
              <Radio.Item
                className="ml-40"
                label={ques.option_1}
                value={ques.option_1}
                checked={
                  answer
                    .filter(i => i.question_id === ques.id)
                    .filter(i => i.answer === ques.option_1).length > 0
                }
                name={ques.id}
              />
              {ques.option_1 === ques.correct_answer ? (
                <div className="flex">
                  <CheckCircle color="green" size={20} />
                  <label color="green">Correct answer</label>
                </div>
              ) : null}
            </div>
            <div className="flex my-2">
              <Radio.Item
                className="ml-40"
                label={ques.option_2}
                value={ques.option_2}
                checked={
                  answer
                    .filter(i => i.question_id === ques.id)
                    .filter(i => i.answer === ques.option_2).length > 0
                }
                name={ques.id}
              />
              {ques.option_2 === ques.correct_answer ? (
                <div className="flex">
                  <CheckCircle color="green" size={20} />
                  <label color="green">Correct answer</label>
                </div>
              ) : null}
            </div>
            {ques.option_3 ? (
              <div className="flex my-2">
                <Radio.Item
                  className="ml-40"
                  label={ques.option_3}
                  value={ques.option_3}
                  checked={
                    answer
                      .filter(i => i.question_id === ques.id)
                      .filter(i => i.answer === ques.option_3).length > 0
                  }
                  name={ques.id}
                />
                {ques.option_3 === ques.correct_answer ? (
                  <div className="flex">
                    <CheckCircle color="green" size={20} />
                    <label color="green">Correct answer</label>
                  </div>
                ) : null}
              </div>
            ) : null}
            {ques.option_4 ? (
              <div className="flex my-2">
                <Radio.Item
                  className="ml-40"
                  label={ques.option_4}
                  value={ques.option_4}
                  checked={
                    answer
                      .filter(i => i.question_id === ques.id)
                      .filter(i => i.answer === ques.option_4).length > 0
                  }
                  name={ques.id}
                />
                {ques.option_4 === ques.correct_answer ? (
                  <div className="flex">
                    <CheckCircle color="green" size={20} />
                    <label color="green">Correct answer</label>
                  </div>
                ) : null}
              </div>
            ) : null}
          </Radio>
        </div>
      ))}
    </div>
  );
};

export default ShowResult;
