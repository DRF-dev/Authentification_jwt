"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    pseudo: { type: String, required: true, unique: true },
    mail: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });
const userModel = mongoose_1.model('User', userSchema);
exports.userModel = userModel;
//# sourceMappingURL=userModel.js.map