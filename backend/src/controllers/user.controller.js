const { default: mongoose } = require("mongoose");
const { find } = require("../models/User");
const userService = require("../services/user.service");

const create = async (req, res) => {
  const { name, username, email, password, avatar, background } = req.body;

  if (!name || !username || !email || !password || !avatar || !background) {
    res.status(400).send({ message: "Submit all fields for registration" });
  }

  const user = await userService.create(req.body);

  if (!user) {
    return res.status(400).send({ message: "Error creating user" });
  }

  res
    .status(201)
    .send({
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
};

const findAll = async (req, res) => {
  const users = await userService.findAll();

  if (users.length === 0) {
    return res.status(400).send({ message: "There are no users" });
  }

  res.status(200).send({
    message: "Users found successfully",
    users,
  });
};

const findById = async (req, res) => {
  const user = req.user;

  res.status(200).send({
    message: "User found successfully",
    user,
  });
};

const update = async (req, res) => {
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
    background,
  );

  res
    .status(201)
    .send({
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
};

module.exports = { create, findAll, findById, update };