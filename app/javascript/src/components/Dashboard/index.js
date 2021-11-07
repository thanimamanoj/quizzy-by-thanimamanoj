import React from "react";

//import Button from "components/Button";
import Container from "components/Container";

import NavItem from "../NavBar/NavItem";

const Dashboard = () => {
  return (
    <Container>
      <div className="flex items-center justify-end gap-x-4">
        <NavItem
          name="Add new quiz"
          iconClass="ri-add-fill"
          path="/quizzes/create"
        />
      </div>
      <h1 className="my-5 text-xl leading-5 text-center">
        You have not created any quiz.
      </h1>
    </Container>
  );
};

export default Dashboard;
