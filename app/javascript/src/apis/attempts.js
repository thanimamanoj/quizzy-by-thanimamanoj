import axios from "axios";

const create = payload => axios.post(`/public/attempt_answers/`, payload);
const getAttempt = id => axios.get(`/public/attempts/${id}`);
//const getDetails = () => axios.get(`/public/attempts`)

const attemptsApi = {
  create,
  getAttempt,
  // getDetails,
};

export default attemptsApi;
