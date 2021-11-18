import React from "react";

import { Button, Label, Input, Typography } from "@bigbinary/neetoui/v2";

const SignupForm = ({
  handleSubmit,
  setFirstName,
  setLastName,
  setEmail,
  name,
}) => {
  return (
    <>
      <Typography className="my-6 ml-4" style="h1">
        Quizzy
      </Typography>
      <hr />
      <div
        className="flex  justify-center min-h-screen px-4
    py-12 sm:px-6 lg:px-8 bg-gray-50 "
      >
        <div className="w-full max-w-md">
          <Typography
            style="h2"
            className="mt-6 text-3xl font-extrabold leading-9
        text-center text-gray-500"
          >
            {`Welcome to ${name}`}
          </Typography>
          <form className="mt-8" onSubmit={handleSubmit}>
            <div className="my-5 flex">
              <Label className="mr-16">First Name</Label>
              <Input onChange={e => setFirstName(e.target.value)} />
            </div>
            <div className="my-5 flex">
              <Label className="mr-16">Last Name</Label>
              <Input onChange={e => setLastName(e.target.value)} />
            </div>
            <div className="my-5 flex">
              <Label className="mr-24">Email</Label>
              <Input
                className="ml-9"
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <Button className="ml-32" label="Next " type="submit" />
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
