import { Request, Response } from "express";

const home = (req: Request, res: Response) => res.json({ running: true });

export default home;