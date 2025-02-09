import express, {Router, Request, Response } from "express"

const router: Router = Router()

router.get("/", (req: Request, res:Response) =>{
    res.send("Server is ready")
})

export default router