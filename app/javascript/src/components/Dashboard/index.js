import React, { useState, useEffect } from "react";

import { isNil, isEmpty, either } from "ramda";

import quizzesApi from "apis/quizzes";
import Container from "components/Container";
import PageLoader from "components/PageLoader";
import BasicTable from "components/Quizzes/Table/BasicTable";

import NavItem from "../NavBar/NavItem";

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuizzes = async () => {
    try {
      const response = await quizzesApi.list();
      setQuizzes(response.data.quizzes);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const destroyQuiz = async id => {
    try {
      await quizzesApi.destroy(id);
      await fetchQuizzes();
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <div className="flex items-center justify-end gap-x-4">
        <NavItem
          name="Add new quiz"
          iconClass="ri-add-fill"
          path="/quizzes/create"
        />
      </div>
      {either(isNil, isEmpty)(quizzes) ? (
        <h1 className="my-5 text-xl leading-5 text-center text-gray-600">
          You have not created any quiz.
        </h1>
      ) : (
        <>
          <h1 className="mt-6 text-4xl">List of quizzes</h1>
          <BasicTable tdata={quizzes} destroyQuiz={destroyQuiz} />
        </>
      )}
    </Container>
  );
};

export default Dashboard;
