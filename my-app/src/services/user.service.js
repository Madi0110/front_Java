import axios from "axios";

const API_URL = "http://195.2.67.225:8080/api/city/";

class UserService {
  getCities() {
    return axios.get(API_URL + "get");
  }
}

export default new UserService();
