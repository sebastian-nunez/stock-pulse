import { requestJSON } from "../utils/api";

class UsersAPI {
  static getAllUsers = async () => {
    return await requestJSON("GET", "/api/users");
  };
}

export default UsersAPI;
