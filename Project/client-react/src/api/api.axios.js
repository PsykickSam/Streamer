import axios from "axios";

// Self
import Constants from "../Constants";

const api = axios.create({
  baseURL: Constants.Url.serverUrl,
  // timeout: 5000,
  // Authorization: "bearer ",
});

export default api;
