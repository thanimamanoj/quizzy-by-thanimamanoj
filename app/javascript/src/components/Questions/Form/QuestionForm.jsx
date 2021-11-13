import React from "react";

import {
  Select,
  Label,
  Input,
  Button,
  Typography,
} from "@bigbinary/neetoui/v2";

const QuestionForm = ({
  type = "create",
  title,
  setTitle,
  correct_answer,
  setCorrect_answer,
  optList,
  handleAdd,
  handleInputChange,
  handleRemove,
  handleSubmit,
}) => {
  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
      {type === "update" ? (
        <Typography style="h4">Edit Question</Typography>
      ) : null}
      <div className="flex">
        <Label className="mt-8 mr-10 ml-0 text-gray-600">Question</Label>
        <Input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="mt-8 ml-5"
        />
      </div>
      {optList.map((x, i) => {
        return (
          <div key={i} className="flex">
            <Label className="mt-8 mr-10 ml-0 text-gray-600">{`Option ${
              i + 1
            }`}</Label>

            <Input
              name="option"
              value={x.option}
              onChange={e => handleInputChange(e, i)}
              className="mt-8 ml-5"
            />

            {optList.length !== 2 && i > 1 && (
              <Button
                label=""
                icon="ri-indeterminate-circle-line"
                onClick={() => handleRemove(i)}
                style="danger"
                className="mt-8 ml-5"
              />
            )}
          </div>
        );
      })}
      {optList.length < 4 ? (
        <div className="flex justify-center m-6">
          <Button
            label="+ Add option"
            className="underline "
            onClick={handleAdd}
            style="link"
          />
        </div>
      ) : null}
      <div className="flex mt-6">
        <Label className="mt-8 mr-10 ml-0 text-gray-600">Correct Answer</Label>
        <Select
          name="ValueList"
          isSearchable
          placeholder="Select an Option"
          options={optList.map(({ option }, index) => {
            return { label: `Option ${index + 1}`, value: option };
          })}
          value={correct_answer}
          onChange={e => {
            setCorrect_answer(e.value);
          }}
        />
      </div>
      <div className="ml-24 mt-6">
        <Button
          label="Submit"
          onClick={handleSubmit}
          style="primary"
          size="large"
        />
      </div>
    </form>
  );
};

export default QuestionForm;
