import React, { useState, useEffect } from "react";

import { Typography } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router";

import authApi from "apis/auth";
import quizzesApi from "apis/quizzes";
import SignupForm from "components/Public/Form/SignupForm";

import AttemptQuiz from "./Attempt/AttemptQuiz";

const Signup = () => {
  const { slug } = useParams();
  const [quiz, setQuiz] = useState([]);
  const [user, setUser] = useState({});
  const [question, setQuestion] = useState([]);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("welcome");
  const [passwordConfirmation, setPasswordConfirmation] = useState("welcome");
  const [loading, setLoading] = useState(false);
  const [startQuiz, setStartQuiz] = useState(false);

  const fetchQuizDetails = async () => {
    try {
      const response = await quizzesApi.showQuiz(slug);
      setQuiz(response.data.quiz);
      setQuestion(response.data.question);
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
      const response = await authApi.signup({
        user: {
          first_name,
          last_name,
          email,
          password,
          password_confirmation: passwordConfirmation,
          slug: slug,
        },
      });
      setUser(response.data.user);
      setLoading(false);
      setStartQuiz(true);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };
  if (quiz?.id && startQuiz === false) {
    return (
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

        {/* {JSON.stringify(quiz)}
          {JSON.stringify(question)} */}
      </div>
    );
  } else if (quiz.id && startQuiz === true) {
    return (
      <AttemptQuiz
        attempt_id={user.attempt_id}
        quiz_id={quiz.id}
        quiz={quiz}
        question={question}
      />
    );
  }

  return (
    <Typography className="flex justify-center mt-24" style="h1">
      Incorrect link for quiz
    </Typography>
  );
};

export default Signup;
