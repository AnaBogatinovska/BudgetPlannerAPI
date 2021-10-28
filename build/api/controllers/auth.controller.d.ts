import { Request, Response } from "express";
declare class AuthController {
    register(req: Request, res: Response): Promise<any>;
    login(req: Request, res: Response): Promise<any>;
}
declare const _default: AuthController;
export default _default;
