import React, { useState } from "react";

import { Typography } from "@bigbinary/neetoui/v2";
import { useLocation } from "react-router";

import questionsApi from "apis/questions";
import Container from "components/Container";
import QuestionForm from "components/Questions/Form/QuestionForm";

const CreateQuestion = ({ history }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [correct_answer, setCorrect_answer] = useState();
  const [optList, setOptList] = useState([{ option: "" }, { option: "" }]);
  const location = useLocation();
  const { quiz_name, quiz_id } = location.state;
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await questionsApi.create({
        question: {
          title: title,
          option_1: optList[0].option,
          option_2: optList[1].option,
          option_3: optList[2]?.option || null,
          option_4: optList[3]?.option || null,
          correct_answer: correct_answer,
          quiz_id: quiz_id,
        },
      });
      setLoading(false);
      history.push(`/quizzes/${quiz_id}/show`);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...optList];
    list[index][name] = value;
    setOptList(list);
  };

  const handleRemove = index => {
    const list = [...optList];
    list.splice(index, 1);
    setOptList(list);
  };

  const handleAdd = () => {
    setOptList([...optList, { option: "" }]);
  };

  return (
    <Container>
      <Typography className="my-6" style="h1">
        {quiz_name}
      </Typography>
      <QuestionForm
        title={title}
        setTitle={setTitle}
        optList={optList}
        setOptList={setOptList}
        correct_answer={correct_answer}
        setCorrect_answer={setCorrect_answer}
        loading={loading}
        handleInputChange={handleInputChange}
        handleAdd={handleAdd}
        handleRemove={handleRemove}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default CreateQuestion;
