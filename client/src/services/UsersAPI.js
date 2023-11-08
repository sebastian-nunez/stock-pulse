import axios from "axios";
import { USERS_BASE_URL } from "../utils/constants.js";

class UsersAPI {
  static getAllUsers = async () => {
    const res = await axios.get(USERS_BASE_URL);
    const users = res.data;

    return users;
  };

  static createUser = async (user) => {
    const body = JSON.stringify(user);
    const headers = {
      "Content-Type": "application/json",
    };

    const res = await axios.post(USERS_BASE_URL, body, { headers });
    const createdUser = res.data;

    return createdUser;
  };
}

export default UsersAPI;
