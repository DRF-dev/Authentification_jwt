"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const userModel_1 = require("../Models/userModel");
const dotenv_1 = require("dotenv");
const jwt_simple_1 = require("jwt-simple");
dotenv_1.config();
const encodeToken = (user) => {
    return jwt_simple_1.encode({
        sub: user.pseudo,
        iat: user.id
    }, process.env.SECRET);
};
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = req.body;
    //Protection du mot de passe
    const hashedPassword = yield bcrypt_1.hash(password, 10);
    const newUser = new userModel_1.userModel(Object.assign(Object.assign({}, req.body), { password: hashedPassword }));
    yield newUser.save(err => {
        if (err)
            return res.status(400).json({ message: 'Echec de la sauvegarde' });
        return res.status(200).json({ message: 'Sauvegarde réussi' });
    });
});
exports.createUser = createUser;
const connectUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { pseudo, password } = req.body;
    const user = yield userModel_1.userModel.findOne({ pseudo });
    if (!user)
        return res.status(400).json({ message: 'Ce user n\'existe pas' });
    const validPassword = yield bcrypt_1.compare(password, user.password);
    if (!validPassword)
        return res.status(400).json({ message: 'Mot de passe incorrect' });
    if (validPassword) {
        return res.status(200).json({ token: encodeToken(user) });
    }
});
exports.connectUser = connectUser;
//# sourceMappingURL=userController.js.map