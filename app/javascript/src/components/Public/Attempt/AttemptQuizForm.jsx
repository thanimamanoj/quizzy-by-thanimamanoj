import React from "react";

import { Typography, Label, Radio, Button } from "@bigbinary/neetoui/v2";

const AttemptQuizForm = ({
  question,
  handleAnswerChange,

  handleSubmit,
}) => {
  return (
    <div>
      {/* {JSON.stringify(quiz)}
      {JSON.stringify(question)}
      {JSON.stringify(answer)} */}
      <form className="mt-8" onSubmit={handleSubmit}>
        {question?.map((ques, index) => (
          <div key={ques.id} className="px-4 py-3 my-2  ml-24 ">
            <div className="flex ">
              <Label>{`Question ${index + 1}`}</Label>
              <Typography className="ml-24" style="body1">
                {ques.title}
              </Typography>
            </div>
            <Radio className="ml-24 space-y-4" stacked>
              <Radio.Item
                className="ml-40"
                label={ques.option_1}
                value={ques.option_1}
                name={ques.id}
                onClick={e => handleAnswerChange(e, index)}
              />
              <Radio.Item
                className="ml-40"
                label={ques.option_2}
                value={ques.option_2}
                name={ques.id}
                onClick={e => handleAnswerChange(e, index)}
              />
              {ques.option_3 ? (
                <Radio.Item
                  className="ml-40"
                  label={ques.option_3}
                  value={ques.option_3}
                  name={ques.id}
                  onClick={e => handleAnswerChange(e, index)}
                />
              ) : null}
              {ques.option_4 ? (
                <Radio.Item
                  className="ml-40"
                  label={ques.option_4}
                  value={ques.option_4}
                  name={ques.id}
                  onClick={e => handleAnswerChange(e, index)}
                />
              ) : null}
            </Radio>
          </div>
        ))}
        <Button className="ml-40" label="Submit " type="submit" />
      </form>
    </div>
  );
};

export default AttemptQuizForm;
