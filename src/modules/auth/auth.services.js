import { nanoid } from "nanoid";
import UserModel, { roleEnum } from "../../DB/models/User.model.js";
import { CompareHash, generateHash } from "../../utli/hash/hash.js";
import { generateToken, Signature, typesEnum } from "../../utli/token.js";

export const signUp = async (req, res, next) => {
  try {
    const { name, email, password, rePassword } = req.body;
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      throw new Error("User already Exists!", { cause: 409 });
    }
    const hashPassword = generateHash({ plaintext: password });

    const newUser = await UserModel.create({
      name,
      email,
      password: hashPassword,
    });
    res.status(201).json({ message: "User Created Successfully.", newUser });
  } catch (error) {
    throw new Error("fail to Register!", { cause: 400 });
  }
};
export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isMatch = CompareHash({ plaintext: password, hashValue: user.password });
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password!" });
    }

    const signature = Signature({ signatureKey: user.role != roleEnum.member ? typesEnum.admin : typesEnum.bearer })
    const jwtid = nanoid()
    const access_token = generateToken({
        payload: { id: user._id },
        secretKey: signature.accessSignature,
        options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRE || '1hr', jwtid }
    });
    const refresh_token = generateToken({
        payload: { id: user._id },
        secretKey: signature.refreshSignature,
        options: { expiresIn: process.env.REFRESH_TOKEN_EXPIRE || '7d' }
    });

    return res.status(200).json({ 
      message: "Login Successful.",
      access_token,
      refresh_token 
    });

  } catch (error) {
    return res.status(400).json({ message: "Login Failed!" });
  }
};
