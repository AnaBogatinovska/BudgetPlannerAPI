import { Request, Response } from "express";
export default class UserController {
    register(req: Request, res: Response): Promise<any>;
    login(req: Request, res: Response): Promise<any>;
}
