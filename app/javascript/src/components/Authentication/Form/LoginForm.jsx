import React from "react";

import Button from "components/Button";
import Input from "components/Input";

const LoginForm = ({ handleSubmit, setEmail, setPassword, loading }) => {
  return (
    <div
      className="flex items-center justify-center min-h-screen
      px-4 py-12 lg:px-8 bg-gray-50 sm:px-6"
    >
      <div className="w-full max-w-md">
        <h2
          className="mt-6 text-3xl font-extrabold leading-9
          text-center text-bb-gray-700"
        >
          Login
        </h2>
        <div className="text-center"></div>
        <form className="mt-8" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="sam@example.com"
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            placeholder="********"
            onChange={e => setPassword(e.target.value)}
          />
          <Button type="submit" buttonText="Submit" loading={loading} />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
