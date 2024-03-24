export function toUserResponse(user) {
  return {
    name: user.name,
    email: user.email,
  };
}
