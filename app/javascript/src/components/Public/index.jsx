import React, { useEffect, useState } from "react";

import { Typography } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router";

import quizzesApi from "apis/quizzes";

const Public = ({ history }) => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);
  const [verify, setVerify] = useState(false);
  const verifyDetails = async () => {
    try {
      setLoading(true);
      const response = await quizzesApi.verifySlug(slug);
      if (response.data.quiz.name) {
        setVerify(true);
        history.push(`/public/${slug}/attempt/new`);
      }
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyDetails();
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center ">
        {!loading && !verify ? (
          <Typography style="h2">Incorrect link</Typography>
        ) : null}
      </div>
    </div>
  );
};

export default Public;
