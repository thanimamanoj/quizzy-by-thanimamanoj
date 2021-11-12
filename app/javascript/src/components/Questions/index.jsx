import React from "react";

import { CheckCircle } from "@bigbinary/neeto-icons";
import { Button, Label, Typography } from "@bigbinary/neetoui/v2";

const Questions = ({
  questions,
  //loading,
}) => {
  return (
    <>
      {questions?.map((question, index) => (
        <div key={question.id} className="px-4 py-3 my-2 ">
          <div className="flex">
            <Label>{`Question ${index + 1}`}</Label>
            <Typography className="ml-6" style="body1">
              {question.title}
            </Typography>
            <div className="ml-8">
              <Button
                label="Edit"
                style="secondary"
                icon={"ri-pencil-fill"}
                iconPosition="left"
              />
            </div>
            <div className="ml-4">
              <Button
                label="Delete"
                style="danger"
                icon="ri-delete-bin-line"
                iconPosition="left"
              />
            </div>
          </div>

          {question.option_1 ? (
            <div className="flex">
              <Label className="mr-6">{`Option 1`}</Label>
              <Typography className="mx-4" style="body1">
                {question.option_1}
              </Typography>
              {question.correct_answer === question.option_1 ? (
                <CheckCircle color="green" size={20} />
              ) : null}
            </div>
          ) : null}
          {question.option_2 ? (
            <div className="flex">
              <Label className="mr-6">{`Option 2`}</Label>
              <Typography className="mx-4" style="body1">
                {question.option_2}
              </Typography>
              {question.correct_answer === question.option_2 ? (
                <CheckCircle color="green" size={20} />
              ) : null}
            </div>
          ) : null}
          {question.option_3 ? (
            <div className="flex">
              <Label className="mr-6">{`Option 3`}</Label>
              <Typography className="mx-4" style="body1">
                {question.option_3}
              </Typography>
              {question.correct_answer === question.option_3 ? (
                <CheckCircle color="green" size={20} />
              ) : null}
            </div>
          ) : null}
          {question.option_4 ? (
            <div className="flex">
              <Label className="mr-6">{`Option 4`}</Label>
              <Typography className="mx-4" style="body1">
                {question.option_4}
              </Typography>
              {question.correct_answer === question.option_4 ? (
                <CheckCircle color="green" size={20} />
              ) : null}
            </div>
          ) : null}
        </div>
      ))}
    </>
  );
};

export default Questions;
