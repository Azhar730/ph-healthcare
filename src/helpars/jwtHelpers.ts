import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";

type TExpiresIn = SignOptions["expiresIn"];

const generateToken = (
  payload: string | object | Buffer,
  secret: Secret,
  expiresIn: TExpiresIn
): string => {
  const options: SignOptions = {
    algorithm: "HS256",
    expiresIn,
  };

  const token = jwt.sign(payload, secret, options);
  return token;
};

const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const JWTHelpers = {
  generateToken,
  verifyToken,
};
