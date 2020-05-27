"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../Controllers/userController");
const router = express_1.Router();
router.post('/create', userController_1.createUser);
router.post('/login', userController_1.connectUser);
exports.default = router;
//# sourceMappingURL=users.js.map