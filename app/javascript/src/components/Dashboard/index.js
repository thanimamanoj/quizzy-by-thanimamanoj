import React from "react";

import Button from "components/Button";
import Container from "components/Container";

const Dashboard = () => {
  return (
    <Container>
      <div className="flex items-center justify-end gap-x-4">
        <Button
          className="inline-flex items-center px-1 pt-1 text-sm
              font-semibold leading-5 text-bb-gray-600 text-opacity-50
              transition duration-150 ease-in-out border-b-2
              border-transparent hover:text-bb-gray-600 focus:outline-none
              focus:text-bb-gray-700 cursor-pointer"
          type="submit"
          buttonText="+ Add new quiz"
          loading={false}
        />
      </div>
      <h1 className="my-5 text-xl leading-5 text-center">
        You have not created any quiz.
      </h1>
    </Container>
  );
};

export default Dashboard;
