const User = require("../models/user.js");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");

const test = (req, res) => {
  res.json("test is working");
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check si el nombre fue ingresado
    if (!name) {
      return res.json({
        error: "name is required",
      });
    }

    //Checkear si la contaseña esta ok
    if (!password || password.lenght < 6) {
      return res.json({
        error: "Password is required and should be at least 6 characters long",
      });
    }

    //Checkear el email 
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is taken already",
      });
    }

    const hashedPassword = await hashPassword(password);

    //Crear usuario en la DB
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No user find",
      });
    }

    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
    }
    if (!match) {
      res.json({
        error: "Password do not match",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No user find",
      });
    }

    const del_response = await User.deleteOne({ email });
    if (!del_response) {
      return res.json({
        error: "User couldn't be deleted!",
      });
    }
  } catch (error) {
    console.log(error);
  }
  return res.json({});
};
const updatePassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No user find",
      });
    }
    const hashedPassword = await hashPassword(password);
    const del_response = await User.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );
    if (!del_response) {
      return res.json({
        error: "User couldn't be deleted!",
      });
    }
  } catch (error) {
    console.log(error);
  }
  return res.json({});
};

const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

module.exports = {
  test,
  registerUser,
  loginUser,
  deleteUser,
  updatePassword,
  getProfile,
};
