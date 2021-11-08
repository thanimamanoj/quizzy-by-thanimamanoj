import axios from "axios";

const list = () => axios.get("/quizzes");
const create = payload => axios.post("/quizzes/", payload);
const show = id => axios.get(`/quizzes/${id}`);
const update = ({ id, payload }) => axios.put(`/quizzes/${id}`, payload);

const quizzesApi = {
  list,
  show,
  create,
  update,
};

export default quizzesApi;
