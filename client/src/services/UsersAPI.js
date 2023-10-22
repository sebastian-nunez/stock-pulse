import axios from "axios";

const BASE_USERS_URL = "/api/users";

class UsersAPI {
  static getAllUsers = async () => {
    const res = await axios.get(BASE_USERS_URL);
    const users = res.data;

    return users;
  };

  static createUser = async (user) => {
    const body = JSON.stringify(user);
    const headers = {
      "Content-Type": "application/json",
    };

    const res = await axios.post(BASE_USERS_URL, body, { headers });
    const userCreated = res.data;

    return userCreated;
  };
}

export default UsersAPI;
