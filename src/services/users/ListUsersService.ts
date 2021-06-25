import {getCustomRepository} from "typeorm";
import {UserRepository} from "../../repositories/UserRepository";
import {classToPlain} from "class-transformer";

export class ListUsersService {
    async execute() {
        const userRepository = getCustomRepository(UserRepository);

        const users = await userRepository.find();

        return classToPlain(users);
    }
}