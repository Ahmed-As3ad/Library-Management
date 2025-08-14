import jwt from "jsonwebtoken";

export const typesEnum = {
  bearer: "bearer",
  admin: "admin",
};

export const generateToken = ({ payload, secretKey, options = {} }) => {
  return jwt.sign(payload, secretKey, options);
};

export const verifyToken = (token, secretKey) => {
  return jwt.verify(token, secretKey);
};

export const Signature = ({ signatureKey = typesEnum.bearer } = {}) => {
  let signatures = {
    accessSignature: undefined,
    refreshSignature: undefined,
  };
  switch (signatureKey) {
    case typesEnum.admin:
      signatures.accessSignature = process.env.ACCESS_TOKEN_SECRET;
      signatures.refreshSignature = process.env.REFRESH_TOKEN_SECRET;
      break;

    default:
      signatures.accessSignature = process.env.ACCESS_TOKEN_SECRET;
      signatures.refreshSignature = process.env.REFRESH_TOKEN_SECRET;
      break;
  }
  return signatures;
};
