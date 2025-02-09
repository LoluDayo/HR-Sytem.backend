import express, {Router, } from "express"
import { createUser, loginUser } from "../controller/controller"

const router: Router = express.Router()

router.post("/adduser", createUser)
router.post("/login", loginUser)

export default router