import userService from '../services/user-service.js';

const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body);
    res.status(200).json({
      status: 'success',
      message: 'Register success',
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    res.status(200).json({
      status: 'success',
      message: 'Login success',
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const email = req.user.email;
    const result = await userService.get(email);
    res.status(200).json({
      status: 'success',
      message: 'Get user success',
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const request = req.body;
    const response = await userService.update(req.user, request);
    res.status(200).json({
      status: 'success',
      message: 'Update user success',
      data: response,
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    await userService.logout(req.user.email);
    res.status(200).json({
      status: 'success',
      message: 'Logout success',
      data: null,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  register,
  login,
  get,
  update,
  logout,
};
