import { Schema, model } from "mongoose"

const userSchema = new Schema({
    pseudo: { type: String, required:true, unique:true },
    mail: { type: String, required:true, unique:true },
    password: { type: String, required: true }
},{timestamps: true})

const userModel = model('User', userSchema)
export { userModel }