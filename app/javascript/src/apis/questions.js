import axios from "axios";

//const list = () => axios.get("/questions");
const create = payload => axios.post(`/questions`, payload);

const questionsApi = {
  //  list,
  create,
};

export default questionsApi;
