import { ErrorMessage, UserRequest, UserWithToken } from '../../types';
import User from '../models/User';
import { sign } from '../utils/jwt';
import bcrypt from 'bcrypt';
export default class UserService {

    static async checkForUser(email: string): Promise<User | false> {
        try {
            const userCheck = await User.check(email);
            return userCheck;
        }
        catch (error) {
            return false;
        }
    }

    static getProfileWithToken({ id, email }: User): UserWithToken {
        return ({
            email,
            id,
            token: sign({ id })
        });
    }

    static async createUser({ email, password }: UserRequest): Promise<User | ErrorMessage> {
        const userExists = await this.checkForUser(email);

        if (userExists) return ({ message: 'A user already exists with that email' });

        else {
            const hash = bcrypt.hashSync(password, 8);
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

    static async login({ email, password }: UserRequest): Promise<UserWithToken | ErrorMessage> {
        const existingUser = await this.checkForUser(email);

        if (!existingUser) return ({ message: 'No user with that email exists in the database' });
        
        else {
            return bcrypt.compareSync(password, existingUser.hash)
                ? this.getProfileWithToken(existingUser)
                : { message: 'Incorrect password' };
        }
    }
}
