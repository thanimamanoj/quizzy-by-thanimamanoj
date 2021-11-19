import React, { useState, useEffect } from "react";

import { Download } from "@bigbinary/neeto-icons";
import { Typography, Button } from "@bigbinary/neetoui/v2";

import Table from "./Table";

import attemptsApi from "../../apis/attempts";
import NavBar from "../NavBar";

const ShowReport = () => {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const response = await attemptsApi.attemptList();

      setReport(response.data.attempt.reports);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <div>
      <NavBar />

      {!loading ? (
        <div>
          <div className="flex justify-between">
            <Typography className="ml-4 my-4" style="h2">
              Reports
            </Typography>
            <Button
              className="m-6 p-8"
              icon={Download}
              iconPosition="left"
              label="Download"
              onClick={function noRefCheck() {}}
              style="secondary"
            />
          </div>
          <Table report={report} />
        </div>
      ) : null}
    </div>
  );
};

export default ShowReport;
