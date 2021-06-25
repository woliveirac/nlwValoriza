import {UserRepository} from "../../repositories/UserRepository";
import {getCustomRepository} from "typeorm";
import {compare} from "bcryptjs";
import {sign} from "jsonwebtoken";

interface IAuthenticateRequest {
    email: string;
    password: string;
}

export class AuthenticateUserService {
    async execute({email, password}: IAuthenticateRequest) {
        const userRepository = getCustomRepository(UserRepository);

        const user = await userRepository.findOne({
           email
        });

        if(!user) {
            throw new Error("Email/Password incorrect")
        }

        const passwordMatch = await compare(password,user.password);

        if(!passwordMatch) {
            throw new Error("Email/Password incorrect")
        }

        const token = sign({
            email: user.email,

        }, "kxCbHZTgxV2RUEZqxS5mCaDu39tVju3v", {
            subject: user.id,
            expiresIn: "1d"
        });

        return token
    }
}