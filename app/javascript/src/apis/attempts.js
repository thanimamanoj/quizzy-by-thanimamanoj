import axios from "axios";

const create = payload => axios.post(`/public/attempt_answers/`, payload);
const getAttempt = id => axios.get(`/public/attempts/${id}`);
const attemptList = () => axios.get(`/public/attempts`);
const attemptsApi = {
  create,
  getAttempt,
  attemptList,
};

export default attemptsApi;
