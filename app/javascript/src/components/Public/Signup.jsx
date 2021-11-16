import React, { useState, useEffect } from "react";

import { Typography } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router";

import authApi from "apis/auth";
import quizzesApi from "apis/quizzes";
import SignupForm from "components/Public/Form/SignupForm";

const Signup = ({ history }) => {
  const { slug } = useParams();
  const [quiz, setQuiz] = useState([]);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("welcome");
  const [passwordConfirmation, setPasswordConfirmation] = useState("welcome");
  const [loading, setLoading] = useState(false);

  const fetchQuizDetails = async () => {
    try {
      const response = await quizzesApi.showQuiz(slug);
      setQuiz(response.data.quiz);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await authApi.signup({
        user: {
          first_name,
          last_name,
          email,
          password,
          password_confirmation: passwordConfirmation,
          slug: slug,
        },
      });
      setLoading(false);
      history;

      //<>
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };
  return (
    <div>
      {quiz?.id ? (
        <div>
          <SignupForm
            setFirstName={setFirstName}
            setLastName={setLastName}
            setEmail={setEmail}
            setPassword={setPassword}
            setPasswordConfirmation={setPasswordConfirmation}
            loading={loading}
            handleSubmit={handleSubmit}
            name={quiz?.name}
          />

          {JSON.stringify(quiz)}
        </div>
      ) : (
        <Typography className="flex justify-center mt-24" style="h1">
          Incorrect link for quiz
        </Typography>
      )}
    </div>
  );
};

export default Signup;
