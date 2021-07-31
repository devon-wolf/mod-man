import { ErrorMessage, UserRequest } from '../../types';
import User from '../models/User';

export default class UserService {

    static async checkForUser(email: string): Promise<boolean> {
        const userCheck = await User.check(email);
        return userCheck;
    }

    static async createUser({ email, password }: UserRequest): Promise<User | ErrorMessage> {
        const userExists = await this.checkForUser(email);

        if (userExists) return ({ message: 'A user already exists with that email' });

        else {
            // TODO actually hash the password
            const hash = password.split('').reverse().join();
            try {
                const user = await User.create(email, hash);
                return user;
            }
            catch (error) {
                console.log(error);
                return ({ message: 'Could not create that user' });
            }
        }
    }

    static async login({ email, password }: UserRequest): Promise<User | ErrorMessage> {
        const hash = password.split('').reverse().join();

        try {
            const user = await User.getByCredentials(email, hash);
            return user;
        }
        catch (error) {
            console.log(error);
            return ({ message: 'Could not find that user' });
        }
    }
}
