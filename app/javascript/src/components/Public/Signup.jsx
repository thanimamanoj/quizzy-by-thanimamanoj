import React, { useState, useEffect } from "react";

import { useParams } from "react-router";

import authApi from "apis/auth";
import quizzesApi from "apis/quizzes";
import SignupForm from "components/Public/Form/SignupForm";

import AttemptQuiz from "./Attempt/AttemptQuiz";
import ShowResult from "./ShowResult";

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
  const [open, setOpen] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);

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
      if (response.data.user.submit) {
        setOpen(true);

        setIncorrect(response.data.user.incorrect_answers_count);

        setCorrect(response.data.user.correct_answers_count);
      } else {
        setStartQuiz(true);
      }
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };
  if (quiz?.id && startQuiz === false && !open) {
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
      </div>
    );
  } else if (quiz.id && startQuiz === true && !open) {
    return (
      <AttemptQuiz
        attempt_id={user.attempt_id}
        quiz_id={quiz.id}
        quiz={quiz}
        question={question}
        user={user}
      />
    );
  }

  return (
    <div>
      {open ? (
        <ShowResult
          correct={correct}
          incorrect={incorrect}
          quiz={quiz}
          question={question}
          user={user}
        />
      ) : null}
    </div>
  );
};

export default Signup;
