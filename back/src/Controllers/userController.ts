import { Request, Response, NextFunction } from "express"
import { hash, compare } from "bcrypt"
import { userModel } from "../Models/userModel"
import { config } from "dotenv"
import { encode } from "jwt-simple"
config()

const encodeToken = (user:any) => {
    return encode({
        sub: user.pseudo,
        iat: user.id
    }, process.env.SECRET)
}

const createUser = async(req:Request, res:Response, next:NextFunction) => {
    const { password } = req.body

    //Protection du mot de passe
    const hashedPassword = await hash(password, 10)
    
    const newUser = new userModel({...req.body, password: hashedPassword})
    await newUser.save(err => {
        if(err) return res.status(400).json({ message: 'Echec de la sauvegarde'})
        return res.status(200).json({ message: 'Sauvegarde réussi' })
    })
}

const connectUser = async(req:Request, res:Response, next:NextFunction) => {
    const { pseudo, password } = req.body

    const user:any = await userModel.findOne({ pseudo })
    if(!user) return res.status(400).json({ message: 'Ce user n\'existe pas' })

    const validPassword = await compare(password, user.password)
    if(!validPassword) return res.status(400).json({ message: 'Mot de passe incorrect' })

    if(validPassword) {
        return res.status(200).json({ token: encodeToken(user) })
    }
}

export { createUser, connectUser }