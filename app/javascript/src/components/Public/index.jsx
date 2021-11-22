import React, { useEffect, useState } from "react";

import { Typography } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router";

import quizzesApi from "apis/quizzes";

const Public = ({ history }) => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);

  const fetchQuizDetails = async () => {
    try {
      setLoading(true);
      const response = await quizzesApi.showQuiz(slug);
      if (response.data.quiz) {
        history.push(`/public/${slug}/attempt/new`);
      }
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  return (
    <div className="flex justify-center items-center ">
      {!loading ? <Typography style="h2">Incorrect link</Typography> : null}
    </div>
  );
};

export default Public;
