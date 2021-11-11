import React, { useState, useEffect } from "react";

import { Button, Typography, PageLoader } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router-dom";

import quizzesApi from "apis/quizzes";
import Container from "components/Container";
//import PageLoader from "components/PageLoader";

const ShowQuiz = () => {
  const { id } = useParams();
  const [quizDetails, setQuizDetails] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  // let history = useHistory();

  const fetchQuizDetails = async () => {
    try {
      const response = await quizzesApi.show(id);
      setQuizDetails(response.data.quiz);
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
    return <PageLoader />;
  }

  return (
    <Container>
      <div className="flex items-center justify-end gap-x-4">
        <Button
          label="Add questions"
          onClick={function noRefCheck() {}}
          style="primary"
          to={{
            pathname: "/questions/create",
            state: { quiz_name: quizDetails?.name, quiz_id: quizDetails?.id },
          }}
          icon="ri-add-box-fill"
          iconPosition="left"
          size="large"
        />
      </div>
      <Typography className="my-6" style="h1">
        {quizDetails?.name}
      </Typography>
      <Typography className="mt-40 text-center text-gray-600" style="h2">
        There are no questions in this quiz.
      </Typography>
    </Container>
  );
};

export default ShowQuiz;
