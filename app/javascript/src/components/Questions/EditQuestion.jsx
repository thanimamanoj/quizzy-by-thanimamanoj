import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import { useLocation } from "react-router";
import { useParams } from "react-router-dom";

import questionsApi from "apis/questions";
import Container from "components/Container";

import QuestionForm from "./Form/QuestionForm";

const EditQuestion = ({ history }) => {
  const location = useLocation();
  const { quiz_id } = location.state;
  const [title, setTitle] = useState("");
  const [correct_answer, setCorrect_answer] = useState();
  const [optList, setOptList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const { id } = useParams();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await questionsApi.update({
        id,
        payload: {
          question: {
            title: title,
            option_1: optList[0].option,
            option_2: optList[1].option,
            option_3: optList[2]?.option || null,
            option_4: optList[3]?.option || null,
            correct_answer: correct_answer,
            quiz_id: quiz_id,
          },
        },
      });
      setLoading(false);
      history.push(`/quizzes/${quiz_id}/show`);
    } catch (error) {
      setLoading(false);
      logger.error(error);
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

  const fetchQuestionDetails = async () => {
    try {
      const response = await questionsApi.show(id);
      setTitle(response.data.question.title);
      setOptList(prev => [
        ...prev,
        { option: response.data.question.option_1 },
      ]);
      setOptList(prev => [
        ...prev,
        { option: response.data.question.option_2 },
      ]);
      setOptList(prev => [
        ...prev,
        { option: response.data.question.option_3 },
      ]);
      setOptList(prev => [
        ...prev,
        { option: response.data.question.option_4 },
      ]);
      setCorrect_answer(response.data.question.correct_answer);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestionDetails();
  }, []);

  if (pageLoading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <QuestionForm
        type="update"
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

export default EditQuestion;
