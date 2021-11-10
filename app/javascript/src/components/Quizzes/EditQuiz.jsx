import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import quizzesApi from "apis/quizzes";
import Container from "components/Container";
import PageLoader from "components/PageLoader";

import QuizForm from "./Form/QuizForm";

const EditQuiz = ({ history }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { id } = useParams();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await quizzesApi.update({
        id,
        payload: { quiz: { name } },
      });
      setLoading(false);
      history.push("/");
    } catch (error) {
      setLoading(false);
      logger.error(error);
    }
  };

  const fetchQuizDetails = async () => {
    try {
      const response = await quizzesApi.show(id);
      setName(response.data.quiz.name);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  if (pageLoading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <QuizForm
        type="update"
        name={name}
        setName={setName}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default EditQuiz;
