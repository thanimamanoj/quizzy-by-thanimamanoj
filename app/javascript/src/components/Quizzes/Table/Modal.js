import React from "react";

import { Button } from "@bigbinary/neetoui/v2";
import { useHistory } from "react-router-dom";

function Modal({ setOpen, id, destroyQuiz }) {
  let history = useHistory();
  const handleDelete = id => {
    destroyQuiz(id);
    setOpen(false);
    //window.location.reload(false)
    history.push("/");
  };
  return (
    <div className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800">
      <div className="bg-white rounded-lg w-1/2">
        <div className="flex flex-col items-start p-4">
          <div className="flex items-center flex justify-start w-full">
            <div className="text-gray-900 font-medium text-lg flex ">
              {" "}
              Delete Quiz
            </div>
          </div>
          <hr />
          <div className="flex justify-start">
            Are you sure you want to delete the quiz?
          </div>
          <hr />
          <div className="ml-auto">
            <Button
              label="Continue"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleDelete(id)}
            />
            <Button
              style="text"
              label="Cancel"
              className="bg-transparent hover:bg-gray-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={() => setOpen(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
