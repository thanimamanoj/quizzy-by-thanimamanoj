import React from "react";

import { Typography, Label, Input } from "@bigbinary/neetoui/v2";

import Button from "components/Button";

const QuizForm = ({
  type = "create",
  name,
  setName,
  loading,
  handleSubmit,
}) => {
  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
      {type === "create" ? (
        <Typography className="my-6" style="h1">
          Add new quiz
        </Typography>
      ) : (
        <Typography className="my-6" style="h1">
          Edit quiz
        </Typography>
      )}
      <div className="flex">
        <Label className="mt-8 mr-10 ml-0 text-gray-600">Quiz name</Label>
        <Input
          value={name}
          onChange={e => setName(e.target.value)}
          className="mt-5"
        />
      </div>
      <Button
        type="submit"
        buttonText={type === "create" ? "Submit" : "Update Quiz"}
        loading={loading}
      />
    </form>
  );
};

export default QuizForm;
