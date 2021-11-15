import React, { useState, useEffect } from "react";

import { CheckCircle } from "@bigbinary/neeto-icons";
import { Button, Typography, PageLoader } from "@bigbinary/neetoui/v2";
import { useParams, useHistory } from "react-router-dom";

import quizzesApi from "apis/quizzes";
import Container from "components/Container";
import Questions from "components/Questions";

import questionsApi from "../../apis/questions";

const ShowQuiz = () => {
  const { id } = useParams();
  const [quizDetails, setQuizDetails] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  //const [loading, setLoading] = useState(false);

  let history = useHistory();

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

  const destroyQuestion = async id => {
    try {
      await questionsApi.destroy(id);
      await fetchQuizDetails(); //find solution
    } catch (error) {
      logger.error(error);
    }
  };

  const handlePublish = async () => {
    try {
      await quizzesApi.update({ id, payload: { quiz: { publish: true } } });
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      logger.error(error);
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
        {quizDetails.questions.length > 0 && quizDetails.slug === null ? (
          <Button label="Publish" size="large" onClick={handlePublish}></Button>
        ) : null}
      </div>
      <Typography className="my-6" style="h1">
        {quizDetails?.name}
      </Typography>
      {quizDetails.slug != null ? (
        <div className="flex">
          <CheckCircle color="#1e1e20" size={20} />
          <Typography style="h4">{` Published, your public link is - `}</Typography>
          <Button
            label={` http://localhost:3000/public/${quizDetails?.slug}`}
            onClick={() => history.push(`/public/${quizDetails?.slug}`)}
            style="link"
          />
        </div>
      ) : null}
      <br />
      {quizDetails.questions.length === 0 ? (
        <Typography className="mt-40 text-center text-gray-600" style="h2">
          There are no questions in this quiz.
          {/* {JSON.stringify(quizDetails)} */}
        </Typography>
      ) : (
        <Questions
          questions={quizDetails?.questions}
          quiz_id={quizDetails?.id}
          destroyQuestion={destroyQuestion}
        />
      )}
    </Container>
  );
};

export default ShowQuiz;
