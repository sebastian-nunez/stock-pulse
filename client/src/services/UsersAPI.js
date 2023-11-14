import axios from "axios";
import { USERS_BASE_URL } from "../utils/constants.js";

class UsersAPI {
  static getAllUsers = async () => {
    const res = await axios.get(USERS_BASE_URL);
    const users = res.data;

    return users;
  };
}

export default UsersAPI;
