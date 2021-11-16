import React, { useEffect, useState } from "react";

import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import AttemptQuiz from "components/AttemptQuiz";
import Login from "components/Authentication/Login";
import PrivateRoute from "components/Common/PrivateRoute";
import Dashboard from "components/Dashboard";
import PageLoader from "components/PageLoader";
import Signup from "components/Public/Signup";
import CreateQuestion from "components/Questions/CreateQuestion";
import EditQuestion from "components/Questions/EditQuestion";
import CreateQuiz from "components/Quizzes/CreateQuiz";
import EditQuiz from "components/Quizzes/EditQuiz";
import ShowQuiz from "components/Quizzes/ShowQuiz";
import { getFromLocalStorage } from "helpers/storage";

const App = () => {
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";

  useEffect(() => {
    registerIntercepts();
    initializeLogger();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer />
      <Switch>
        {/* <Route exact path="/" component={Dashboard} /> */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/quizzes/create" component={CreateQuiz} />
        <Route exact path="/quizzes/:id/show" component={ShowQuiz} />
        <Route exact path="/quizzes/:id/edit" component={EditQuiz} />
        <Route exact path="/questions/create" component={CreateQuestion} />
        <Route exact path="/questions/:id/edit" component={EditQuestion} />
        <Route exact path="/public/:slug" component={AttemptQuiz} />
        <Route exact path="/public/:slug/attempt/new" component={Signup} />
        <PrivateRoute
          path="/"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={Dashboard}
        />
      </Switch>
    </Router>
  );
};

export default App;
