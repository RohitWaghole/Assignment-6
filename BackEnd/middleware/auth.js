const jwt = require("jsonwebtoken");
const fs = require("fs");
var privateKey = fs.readFileSync("private.key");

const tokenGeneration = async (username, password) => {
  token = await jwt.sign({ username: password }, privateKey, {
    algorithm: "RS512",
  });
  return token;
};

const verifyToken = async (request) => {
  try {
    await jwt.verify(request.headers.authorization.split(" ")[1], privateKey);
  } catch (err) {
    return false;
  }
  return true;
};

module.exports = {
  tokenGeneration,
  verifyToken,
};
