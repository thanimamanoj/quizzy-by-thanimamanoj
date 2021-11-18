import React, { useEffect } from "react";

import { Typography } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router";

//import authApi from "apis/auth";
import quizzesApi from "apis/quizzes";

const Public = ({ history }) => {
  const { slug } = useParams();
  //const [quiz, setQuiz] = useState([]);
  //const [question, setQuestion] = useState([]);
  //const [loading, setLoading] = useState(false);

  const fetchQuizDetails = async () => {
    try {
      const response = await quizzesApi.showQuiz(slug);
      if (response.data.quiz) {
        history.push(`/public/${slug}/attempt/new`);
      }
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  return (
    <div>
      <Typography className="flex justify-center mt-24" style="h1">
        Incorrect link for quiz
      </Typography>
    </div>
  );
};

export default Public;
