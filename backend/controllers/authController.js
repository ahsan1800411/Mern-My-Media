const User = require('../db/User');
const Plan = require('../db/plan');
const tokenService = require('../utils/token_service');
const sendEmail = require('../utils/email_service');

exports.registerUser = async (req, response) => {
  const { name, email, password, videosLeft, storageLeft, planId, otherId } =
    req.body;

  const plan = await Plan.findOne({ _id: planId });

  const unixTimeStamps = new Date().getTime();

  let user = await User.create({
    email,
    lastName: name,
    password,
    videosLeft,
    storageLeft,
    planId: `Plan-${plan.name}-${unixTimeStamps}`,
    otherId,
  });

  delete user.password;
  response.send(user);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.send({ result: 'no users found' });

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) return res.send({ result: 'Invalid Credentails' });

  user.token = tokenService.generateAccessToken(user, 'KaianNUywgNu26735@!');

  await user.save();

  if (user) {
    res.status(200).send({ result: user });
  } else {
    res.send({ result: 'no users found' });
  }
};

exports.sendReset = async (req, res) => {
  try {
    const { email } = req.body;
    console.log('email', email);
    const token = tokenService.generateResetPasswordToken(email);
    console.log('token', token);
    const mailInfo = await sendEmail(email, token);
    return res.status(200).send({ message: 'email sent' });
  } catch (error) {
    return res.status(400).send({ message: 'failed to send email' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    console.log('Her I am');
    const { email, newPassword } = req.body;
    // const salt = await bcrypt.genSalt(10);
    // let updatedPassword = await bcrypt.hash(newPassword, salt);
    let user = await User.findOne({ email });
    user.password = newPassword;
    let newUser = new User(user);
    await newUser.save();
    return res.status(200).send({ message: 'Password reset' });
  } catch (err) {
    return res.status(400).send({ message: 'failed to send email' });
  }
};

exports.getUsers = async (req, res) => {
  try {
    let user = await User.find({});
    console.log('user', user);
    return res.status(200).send({ user });
  } catch (err) {
    return res.status(400).send({ message: 'failed to send email' });
  }
};
