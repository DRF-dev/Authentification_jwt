import { Router } from "express"
import { createUser, connectUser } from "../Controllers/userController"

const router = Router()

router.post('/create', createUser)
router.post('/login', connectUser)

export default router