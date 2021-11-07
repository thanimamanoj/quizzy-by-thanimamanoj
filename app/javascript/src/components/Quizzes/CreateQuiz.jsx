import React, { useState } from "react";

import quizzesApi from "apis/quizzes";
import Container from "components/Container";

import QuizForm from "./Form/QuizForm";
//import usersApi from "apis/users";

const CreateQuiz = ({ history }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await quizzesApi.create({ quiz: { name } });
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <QuizForm
        name={name}
        setName={setName}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default CreateQuiz;
