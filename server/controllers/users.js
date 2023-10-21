import "../config/dotenv.js";
import User from "../models/user.js";

class UsersController {
  static getAllUsers = async (req, res) => {
    try {
      const results = await User.getAll();
      res.status(200).json(results);
    } catch (error) {
      res.status(409).json({ error: error.message });
    }
  };
}

export default UsersController;
