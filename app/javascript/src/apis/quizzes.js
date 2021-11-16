import axios from "axios";

const list = () => axios.get("/quizzes");
const create = payload => axios.post("/quizzes/", payload);
const show = id => axios.get(`/quizzes/${id}`);
const update = ({ id, payload }) => axios.put(`/quizzes/${id}`, payload);
const destroy = id => axios.delete(`/quizzes/${id}`);
const showQuiz = slug => axios.get(`/public/quizzes/${slug}`);

const quizzesApi = {
  list,
  show,
  create,
  update,
  destroy,
  showQuiz,
};

export default quizzesApi;
