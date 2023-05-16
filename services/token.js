import jwt from "jsonwebtoken";

const generateJWTToken = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.PRIVATE_KEY, {
    expiresIn: "15d",
  });

  return accessToken;
};

export { generateJWTToken };
