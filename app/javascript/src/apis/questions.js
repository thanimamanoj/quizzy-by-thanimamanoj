import axios from "axios";

const create = payload => axios.post(`/questions/`, payload);

const show = id => axios.get(`/questions/${id}`);

const update = ({ id, payload }) => axios.put(`/questions/${id}`, payload);

const questionsApi = {
  show,
  create,
  update,
};

export default questionsApi;
