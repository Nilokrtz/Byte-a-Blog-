import userService from "../services/user.service.js";

const createController = async (req, res) => {
  try {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name || !username || !email || !password || !avatar || !background) {
      res.status(400).send({ message: "Submit all fields for registration" });
    }

    const user = await userService.createService(req.body);

    if (!user) {
      return res.status(400).send({ message: "Error creating user" });
    }

    res.status(201).send({
      message: "User created successfully",
      user: {
        id: user._id,
        name,
        username,
        email,
        password,
        avatar,
        background,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const findAllController = async (req, res) => {
  try {
    const users = await userService.findAllService();

    if (users.length === 0) {
      return res.status(400).send({ message: "There are no users" });
    }

    res.status(200).send({
      message: "Users found successfully",
      users,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const findByIdController = async (req, res) => {
  try {
    const user = req.user;

    user = await userService.findByIdService(req.id);

    res.status(200).send({user});
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateController = async (req, res) => {
  try {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name && !username && !email && !password && !avatar && !background) {
      res.status(400).send({ message: "Submit all fields for update" });
    }

    const { id, user } = req;

    await userService.update(
      id,
      name,
      username,
      email,
      password,
      avatar,
      background
    );

    res.status(201).send({
      message: "User updated successfully",
      user: {
        id: user._id,
        name,
        username,
        email,
        password,
        avatar,
        background,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export default { createController, findAllController, findByIdController, updateController };
