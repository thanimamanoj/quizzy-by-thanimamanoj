import React, { useState, useEffect } from "react";

import { Download } from "@bigbinary/neeto-icons";
import { Typography, Button, PageLoader } from "@bigbinary/neetoui/v2";

import reportApi from "apis/report";

import BasicTable from "./BasicTable";

import attemptsApi from "../../apis/attempts";
import NavBar from "../NavBar";

const ShowReport = () => {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [show, setShow] = useState(false);
  const [jobId, setJobId] = useState("");

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

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const response = await reportApi.exports();
      const jobId = response.data.jid;
      const interval = setInterval(async () => {
        const jobStatus = await reportApi.exports_status(jobId);
        if (jobStatus.data.status === "complete") {
          setDownloading(false);
          setShow(true);
          setJobId(jobId);
          clearInterval(interval);
        }
      }, 800);
    } catch (error) {
      logger.error(error);
    }
  };

  const downloadReport = () => {
    window.location.href = `/export_download?id=${jobId}`;
  };
  return (
    <div>
      <NavBar />
      <div>
        <div className="flex justify-between">
          <Typography className="ml-4 my-4" style="h2">
            Reports
          </Typography>
          {!show && !downloading ? (
            <Button
              className="m-6 p-8"
              icon={Download}
              iconPosition="left"
              label="Download"
              onClick={handleDownload}
              style="secondary"
            />
          ) : null}
        </div>
        <div>
          {downloading ? (
            <div className="py-32">
              <PageLoader text="Your report is being prepared for download" />
            </div>
          ) : show ? (
            <div className=" flex flex-col items-center mt-32 space-y-4">
              <Typography style="h3">
                Report is now ready for download
              </Typography>
              <Button
                icon={Download}
                iconPosition="left"
                label="Download Report"
                onClick={downloadReport}
                size="large"
              />
            </div>
          ) : !loading ? (
            <BasicTable report={report} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ShowReport;
