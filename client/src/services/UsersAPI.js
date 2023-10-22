const BASE_USERS_URL = "/api/users";

class UsersAPI {
  static getAllUsers = async () => {
    const res = await fetch(BASE_USERS_URL);
    const users = await res.json();

    return users;
  };

  static createUser = async (user) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    const res = await fetch(BASE_USERS_URL, options);
    const createdUser = await res.json();

    return createdUser;
  };
}

export default UsersAPI;
