import React from "react";

import { CheckCircle } from "@bigbinary/neeto-icons";
import { Typography, Label, Radio } from "@bigbinary/neetoui/v2";

const QuizResult = ({ quiz, question, answer, correct, incorrect }) => {
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
                checked={answer[index][1] === ques.option_1}
                name={ques.id}
                //disabled={true}
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
                checked={answer[index][1] === ques.option_2}
                name={ques.id}
                //disabled={true}
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
                  checked={answer[index][1] === ques.option_3}
                  name={ques.id}
                  //disabled={true}
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
                  checked={answer[index][1] === ques.option_4}
                  name={ques.id}
                  //disabled={true}
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

export default QuizResult;
