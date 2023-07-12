import service from "./index.js";

const AuthService = {
  login: (data) => {
    try {
      return new Promise((resolve, reject) => {
        service
          .post("/api/auth/user/login", data)
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    } catch (error) {
      throw error;
    }
  },
};

export default AuthService;
