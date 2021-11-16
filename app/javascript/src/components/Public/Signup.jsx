import React, { useState } from "react";

import { useParams } from "react-router";

import authApi from "apis/auth";
//import quizzesApi from "apis/quizzes";
import SignupForm from "components/Public/Form/SignupForm";

const Signup = ({ history }) => {
  const { slug } = useParams();
  //const [quiz, setQuiz] = useState([]);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("welcome");
  const [passwordConfirmation, setPasswordConfirmation] = useState("welcome");
  const [loading, setLoading] = useState(false);
  history;
  // const fetchQuizDetails = async () => {
  //   try {
  //     const response = await quizzesApi.show(slug);
  //     setQuiz(response.data.quiz);
  //   } catch (error) {
  //     logger.error(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchQuizDetails();
  // }, []);

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
        },
      });
      setLoading(false);
      //history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };
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
        slug={slug}
        //name={quiz?.name}
      />
      {/* {JSON.stringify(quiz)} */}
    </div>
  );
};

export default Signup;
