import axios from "axios";

const create = payload => axios.post(`/public/attempt_answers/`, payload);
const getAttempt = id => axios.get(`/public/attempts/${id}`);

const attemptsApi = {
  create,
  getAttempt,
};

export default attemptsApi;
