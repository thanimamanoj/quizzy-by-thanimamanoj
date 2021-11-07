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
  type;
  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
      <Typography style="h1" className="mt-6">
        Add new quiz
      </Typography>
      <div className="flex">
        <Label className="mt-6 mr-10 ml-0">Quiz name</Label>
        <Input
          size="large"
          value={name}
          onChange={e => setName(e.target.value)}
          className="mt-5"
        />
      </div>
      <Button type="submit" buttonText="Submit" loading={loading} />
    </form>
  );
};

export default QuizForm;
