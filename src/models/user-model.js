const UserResponse = {
  email: '',
  name: '',
  token: undefined,
};

const CreateUserRequest = {
  email: '',
  name: '',
  password: '',
};

const LoginUserRequest = {
  email: '',
  password: '',
};

const UpdateUserRequest = {
  name: undefined,
  password: undefined,
};

function toUserResponse(user) {
  return {
    name: user.name,
    email: user.email,
  };
}
