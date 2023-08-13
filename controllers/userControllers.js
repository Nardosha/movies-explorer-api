import User from '../models/user.js';

export const signup = async (req, res, next) => {
  const { name = undefined, email, password } = req.body;

  const user = await User.create({ name, email, password });
  console.log(user);

  res.status(201).send({ data: user });
};

export const getUserInfo = (req, res, next) => {
  res.send('kek');
};
