import React, { useState, useEffect } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Button, Typography } from "@bigbinary/neetoui/v2";
import { PageLoader } from "@bigbinary/neetoui/v2";
import { isNil, isEmpty, either } from "ramda";

import quizzesApi from "apis/quizzes";
import Container from "components/Container";
import BasicTable from "components/Quizzes/Table/BasicTable";

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
      <div className="py-10">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <div className="flex items-center justify-end gap-x-4">
        <Button
          label="Add new quiz"
          onClick={function noRefCheck() {}}
          style="primary"
          to="/quizzes/create"
          icon={Plus}
          iconPosition="left"
          size="large"
        />
      </div>
      {either(isNil, isEmpty)(quizzes) ? (
        // <h1 className="my-5 text-xl leading-5 text-center text-gray-600">
        //   You have not created any quiz.
        // </h1>
        <Typography className="mt-40 text-center text-gray-600" style="h1">
          You have not created any quiz.
        </Typography>
      ) : (
        <>
          <Typography className="mt-6" style="h1">
            List of quizzes
          </Typography>
          <BasicTable tdata={quizzes} destroyQuiz={destroyQuiz} />
        </>
      )}
    </Container>
  );
};

export default Dashboard;
