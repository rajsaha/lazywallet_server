import { User } from "../../data/models/User";

const SignupService = (() => {
  const signup = async (input) => {
    return new Promise((resolve, reject) => {
      try {
        const newUser = new User({
          email: input.email,
          username: input.username,
          password: input.password,
        });

        newUser.save((err, doc) => {
          if (err) reject({ error: true, message: err.message });
          else resolve(doc);
        });
      } catch (err) {
        reject({ error: true, message: err.message });
      }
    });
  };

  return {
    signup,
  };
})();

export { SignupService };
