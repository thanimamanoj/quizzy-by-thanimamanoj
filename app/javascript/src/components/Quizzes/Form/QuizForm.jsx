import React from "react";

import Button from "components/Button";
import Input from "components/Input";

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
        <h1 className="mt-6 text-4xl">Add new quiz</h1>
      ) : (
        <h1 className="mt-6 text-4xl">Edit quiz</h1>
      )}
      <div className="flex">
        <label className="mt-8 mr-10 ml-0 text-gray-600">Quiz name</label>
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
