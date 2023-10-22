import "../config/dotenv.js";
import User from "../models/user.js";

class UsersController {
  static getAllUsers = async (req, res) => {
    try {
      const results = await User.getAll();
      res.status(200).json(results);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static createUser = async (req, res) => {
    const { firstname, lastname, role, image } = req.body;

    try {
      const results = await User.createOne({
        firstname,
        lastname,
        role,
        image
      });

      res.status(200).json(results);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

export default UsersController;
