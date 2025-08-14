import { Signature, verifyToken } from "../utli/token.js";
import UserModel from "../DB/models/User.model.js";
export const authentication = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "unauthorized access, please login first!" });
    }
    
    const [bearer, token] = authHeader.split(" ");
    if (!bearer || !token) {
      return res.status(401).json({ message: "unauthorized access, please login first!" });
    }
    
    const signature = Signature({ signatureKey: bearer });
    const decode = verifyToken(token, signature.accessSignature);
    if (!decode.id) {
      return res.status(401).json({ message: "unauthorized access, please login first!" });
    }
    
    const user = await UserModel.findOne({ _id: decode.id, deletedAt: null });
    if (!user) {
      return res.status(401).json({ message: "unauthorized access, please login first!" });
    }
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorized access, please login first!" });
  }
};
