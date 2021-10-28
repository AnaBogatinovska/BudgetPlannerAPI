import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { CreateUserDtoModel } from "../../../core/models/user/create-user-dto.model";
import Encryptor from "../../../core/helpers/encryptor";
import UserDAL from "../../../data_access_layer/queries/user-dal";
import errorFeedback from "../../../core/helpers/error-feedback";

const encryptor = new Encryptor();
const userDAL = new UserDAL();

export default class UserController {
  public async register(req: Request, res: Response): Promise<any> {
    try {
      const newUser: CreateUserDtoModel = {
        name: req.body.name,
        email: req.body.email,
        password: await encryptor.encrypt(req.body.password),
      };
      await userDAL.createUser(newUser);

      return res.status(200).json({
        success: true,
        message:
          "You have successfully signed up! Now you should be able to log in.",
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
    }
  }

  public async login(req: Request, res: Response): Promise<any> {
    try {
      const user = await userDAL.getUserByEmail(req.body.email);

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid username or password",
        });
      }

      const isPasswordMatched = await encryptor.compare(
        user.password,
        req.body.password
      );

      if (isPasswordMatched) {
        const token = jwt.sign(
          {
            email: user.email,
            userId: user.id,
            username: user.name,
          },
          "mZlXfDsOqi3",
          { expiresIn: "24h" }
        );

        return res.status(200).json({
          success: true,
          message: "You have successfully logged in!",
          data: {
            name: user.name,
            token: token,
          },
        });
      }
    } catch (error) {
      console.log(error);
      const errFeedback = errorFeedback(error);
      res.status(500).json(errFeedback);
    }
  }
}
