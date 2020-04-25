export default (req) => {
  if (!req.user) {
    return null;
  }

  const { name, email, bio, profilePicture, emailVerified } = req.user;

  return {
    bio,
    email,
    emailVerified,
    name,
    profilePicture,
  };
};
